import { Badge } from '../components/Badge'
import LogoutButton from '../components/LogoutButton'
import StatusBadge from '../components/StatusBadge'
import Table from '../components/Table'
import { useAuth } from '../context/useAuth'
import { useFetchListRegistrationQuery } from '../store/api/registrationApi'

const INITIAL_META = {
  page: 1,
  last_page: 1,
  per_page: 10,
  total: 1,
  from: 1,
  to: 1
}

export default function AdminPage() {
  const { isLoggedIn } = useAuth()
  const {
    data: {
      data,
      meta = { ...INITIAL_META }
    } = {},
    isFetching
  } = useFetchListRegistrationQuery(isLoggedIn)
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

  const handleApproval = item => {
    console.log(data)
    alert(JSON.stringify(item))
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
          />
        </section>
      </div>
    </>
  )
}
