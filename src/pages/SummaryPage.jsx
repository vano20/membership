import { useEffect, useState } from 'react'
import {
  MdOutlineEmail,
  MdPermContactCalendar,
  MdPhoneAndroid
} from 'react-icons/md'
import toast from 'react-hot-toast'
// import LogoutButton from '/src/components/LogoutButton'
import StatusBadge from '/src/components/StatusBadge'
import Table from '/src/components/Table'
import Modal from '/src/components/Modal'
import { useAuth } from '/src/context/useAuth'
import { useFetchListRegistrationQuery } from '/src/store/api/registrationApi'
import { useUpdateRegistrationsStatusMutation } from '/src/store'
import { useFetchRegistrationQuery } from '/src/store/api/registrationApi'
// import { Link } from 'react-router-dom'
import FilterAdminTable from '../components/FilterAdminTable'
import { capitalizeWord } from '../helper/string'

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
  const [showModal, setShowModal] =
    useState(false)
  const [item, setItem] = useState({})
  const [detail, setDetail] = useState({})
  const [membershipId, setMembershipId] =
    useState('')
  const [npwp, setNpwp] = useState('')
  const [filter, setFilter] = useState({ period: null, prov: null })

  const {
    data: { data, meta: respMeta } = {},
    isFetching
  } = useFetchListRegistrationQuery({ ...meta, ...filter, npwp, status: 1 })
  const [updateStatus, { isLoading }] =
    useUpdateRegistrationsStatusMutation()
  const { data: detailRegistration, isError } =
    useFetchRegistrationQuery(item, {
      skip:
        !Object.keys(item).length && !showModal
    })
  const headers = [
    {
      key: 'index',
      label: 'No',
      style: 'max-w-12',
      render: (_, index) => (
        <div className="font-semibold">
          {index + 1}
        </div>
      )
    },
    {
      key: 'company_name',
      label: 'Nama badan usaha'
    },
    {
      key: 'qualification',
      label: 'Kualifikasi',
      render: item => (
        <>
          {capitalizeWord(item.qualification)}
        </>
      )
    },
    {
      key: 'province',
      label: 'Provinsi',
      render: item => (
        <>
          {capitalizeWord(item.province.name)}
        </>
      )
    },
    {
      key: 'period',
      label: 'Periode'
    },
    {
      key: 'npwp',
      label: 'NPWP'
    },
    // {
    //   key: 'status',
    //   label: 'Status',
    //   render: item => (
    //     <>
    //       <StatusBadge status={item.status} />
    //     </>
    //   )
    // },
    // {
    //   key: 'actions',
    //   label: '',
    //   render: item => (
    //     <div className="flex items-center justify-end gap-4">
    //       <Link
    //         as="a"
    //         to={`/admin/form/${item.id}`}
    //         className="text-blue-600 hover:text-blue-500/30"
    //       >
    //         Edit
    //       </Link>
    //       <button
    //         className="py-1 px-3 text-white rounded-lg active:bg-blue-500/50 bg-blue-500 shadow-md shadow-slate-500/30 focus:outline-none focus:ring-0 focus:border-blue-500 focus:shadow-lg focus:shadow-slate-500/30 hover:bg-blue-500/10 hover:text-blue-500"
    //         onClick={() => handleShowModal(item)}
    //       >
    //         Approve
    //       </button>
    //     </div>
    //   )
    // }
  ]
  useEffect(() => {
    if (detailRegistration && !isError) {
      setMembershipId(
        detailRegistration?.membership_id || ''
      )
      setDetail(detailRegistration)
    }
  }, [detailRegistration])

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

  const handleShowModal = item => {
    setItem(item)
    setShowModal(true)
  }
  const handleUpdateMeta = ({ page }) => {
    setMeta({
      ...meta,
      page
    })
  }
  const handleApproval = async () => {
    try {
      await updateStatus({
        token: isLoggedIn,
        body: {
          ...detail,
          status: 1,
          membership_id: membershipId
        }
      })
      toast.success('Approval berhasil!')
      handleClose()
    } catch (error) {
      toast.error(
        error.message ||
        'Terjadi kesalahan saat approval.'
      )
    }
  }

  const handleClose = () => {
    if (isLoading) return
    setShowModal(false)
  }

  const updateNpwp = value => {
    setNpwp(value)
  }

  const handleUpdateNpwp = (val) => {
    updateNpwp(val)
  }

  const handleUpdateFilter = ({ term, prov, period }) => {
    handleUpdateNpwp(term)
    setFilter({
      period: period?.value,
      prov: prov?.value ?? ''
    })
  }

  return (
    <>
      <div className="flex flex-col w-screen min-h-screen items-center overflow-auto bg-white pb-8">
        <div className="flex flex-col w-full h-full bg-slate-200 border-2 rounded-md shadow-lg shadow-slate-300 mx-auto p-8 border-transparent">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">
              List Rekapitulasi
            </h2>

            <div className="flex items-center gap-4">
              <FilterAdminTable onClickSearch={handleUpdateFilter} onPressEnter={handleUpdateFilter} />
            </div>
          </div>
          <section>
            <Table
              meta={meta}
              metaData={metaData}
              isLoading={isFetching}
              headers={headers}
              data={data || []}
              onChangePage={handleUpdateMeta}
            />
          </section>
        </div>
      </div>
      {showModal && modal}
    </>
  )
}
