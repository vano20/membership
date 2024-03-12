import { useEffect, useState } from 'react'
import LogoutButton from '/src/components/LogoutButton'
import StatusBadge from '/src/components/StatusBadge'
import Table from '/src/components/Table'
import { useAuth } from '/src/context/useAuth'
import { useFetchListRegistrationQuery } from '/src/store/api/registrationApi'

const INITIAL_META = {
  page: 1,
  per_page: 10,
  token: null
}
const INITIAL_META_DATA = {
  total: 1,
  from: 1,
  to: 1,
  last_page: 1
}

export default function AdminPage() {
  const { isLoggedIn } = useAuth()
  const [metaData, setMetaData] = useState({
    ...INITIAL_META_DATA
  })
  const [meta, setMeta] = useState({
    ...INITIAL_META,
    token: isLoggedIn
  })
  const {
    data: { data, meta: respMeta } = {},
    isFetching
  } = useFetchListRegistrationQuery(meta)
  const headers = [
    {
      key: 'company_name',
      label: 'Nama'
    },
    {
      key: 'npwp',
      label: 'NPWP'
    },
    {
      key: 'contact_person',
      label: 'Kontak'
    },
    {
      key: 'period',
      label: 'Periode'
    },
    {
      key: 'status',
      label: 'Status'
    },
    {
      key: 'actions',
      label: ''
    }
  ]

  useEffect(() => {
    setMetaData({
      ...metaData,
      last_page:
        respMeta?.last_page || meta.last_page,
      total: respMeta?.total || meta.total,
      from: respMeta?.from || meta.from,
      to: respMeta?.to || meta.to
    })
  }, [respMeta])

  const handleApproval = item => {
    console.log(data)
    alert(JSON.stringify(item))
  }
  const handleUpdateMeta = ({ page }) => {
    setMeta({
      ...meta,
      page
    })
  }

  return (
    <>
      <div className="flex flex-col md:w-1/2 w-full h-full bg-slate-50 border-2 rounded-md border-slate-100 shadow-lg mx-auto p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">
            Approval
          </h2>
          {/* <LogoutButton /> */}
        </div>
        <section>
          <Table
            meta={meta}
            metaData={metaData}
            isLoading={isFetching}
            headers={headers}
            data={data || []}
            body_status={item =>
              item && (
                <>
                  <StatusBadge
                    status={item.status}
                  />
                </>
              )
            }
            actions={item =>
              item && (
                <>
                  <a
                    onClick={() =>
                      handleApproval(item)
                    }
                  >
                    Approve
                  </a>
                </>
              )
            }
            onChangePage={handleUpdateMeta}
          />
        </section>
      </div>
    </>
  )
}
