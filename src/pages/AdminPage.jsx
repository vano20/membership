import { useEffect, useState } from 'react'
import LogoutButton from '/src/components/LogoutButton'
import StatusBadge from '/src/components/StatusBadge'
import Table from '/src/components/Table'
import { useAuth } from '/src/context/useAuth'
import { useFetchListRegistrationQuery } from '/src/store/api/registrationApi'
import Modal from '/src/components/Modal'
import {
  MdOutlineEmail,
  MdPermContactCalendar,
  MdPhoneAndroid
} from 'react-icons/md'

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
  const [detail, setDetail] = useState({})
  const [term, setTerm] = useState('')
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
      label: 'Kontak',
      style: 'max-w-24'
    },
    {
      key: 'period',
      label: 'Periode'
    },
    {
      key: 'status',
      label: 'Status',
      render: item => (
        <>
          <StatusBadge status={item.status} />
        </>
      )
    },
    {
      key: 'actions',
      label: '',
      render: item => (
        <>
          <button
            className="py-1 px-3 text-white rounded-lg active:bg-blue-500/50 bg-blue-500 shadow-md shadow-slate-500/30 focus:outline-none focus:ring-0 focus:border-blue-500 focus:shadow-lg focus:shadow-slate-500/30 hover:bg-blue-500/10 hover:text-blue-500"
            onClick={() => handleShowModal(item)}
          >
            Approve
          </button>
        </>
      )
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

  const handleShowModal = item => {
    setDetail(item)
    setShowModal(true)
  }
  const handleUpdateMeta = ({ page }) => {
    setMeta({
      ...meta,
      page
    })
  }
  const handleApproval = () => {
    alert('approved')
  }
  const handleClose = () => {
    setDetail({})
    setShowModal(false)
  }
  const footer = (
    <div className="flex gap-4">
      <button
        onClick={handleClose}
        className="py-1 px-3 text-slate rounded-lg active:bg-slate-500/50 shadow-md shadow-slate-500/30 focus:outline-none focus:ring-0 focus:border-blue-500 focus:shadow-lg focus:shadow-slate-500/30 hover:bg-slate-500/10 hover:text-slate-500"
      >
        Cancel
      </button>
      <button
        onClick={handleApproval}
        className="py-1 px-3 text-white rounded-lg active:bg-blue-500/50 bg-blue-500 shadow-md shadow-slate-500/30 focus:outline-none focus:ring-0 focus:border-blue-500 focus:shadow-lg focus:shadow-slate-500/30 hover:bg-blue-500/20 hover:text-blue-500"
      >
        Approve
      </button>
    </div>
  )
  const modal = (
    <Modal onClose={handleClose} footer={footer}>
      <div className="text-wrap break-words">
        <h1 className="text-3xl font-semibold flex items-center gap-4">
          {detail?.company_name}{' '}
          <div className="inline-block text-sm">
            <StatusBadge
              status={detail?.status}
            />
          </div>
        </h1>
        <h3 className="text-sm text-slate-500 capitalize mb-4">
          {`${
            detail?.company_address
          }, ${detail?.provinces?.name.toLowerCase()}`}
        </h3>
        <div className="text-xl mb-4 font-semibold">
          Periode {detail?.period}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 rounded-lg bg-sky-300/20 p-2 w-fit">
            <MdPermContactCalendar size={24} />
            {detail?.contact_person},{' '}
            {detail?.position}
          </div>
          <div className="flex gap-2 rounded-lg bg-sky-300/20 p-2 w-fit">
            <MdOutlineEmail size={24} />
            {detail?.email}
          </div>
          <div className="flex gap-2 rounded-lg bg-sky-300/20 p-2 w-fit">
            <MdPhoneAndroid size={24} />
            {detail?.phone_number}
          </div>
          <div className="flex gap-2 rounded-lg bg-sky-300/20 p-2 w-fit">
            <span className="font-semibold">
              NPWP
            </span>
            {detail?.phone_number}
          </div>
        </div>
        <div className="p-2 text-lg my-4">
          <span className="font-semibold">
            Kualifikasi&nbsp;
          </span>
          sebagai perusahaan&nbsp;
          <span className="font-semibold">
            {detail.qualification}
          </span>
        </div>
        <input
          className="focus:outline-none focus:ring-0 focus:border-blue-200/75 focus:shadow-md focus:shadow-blue-500/30 border border-slate-100 rounded-lg py-1 px-2 w-full h-12 shadow-md shadow-slate-500/30"
          placeholder="Membership ID"
          value={term}
          onChange={e => setTerm(e.target.value)}
        />
      </div>
    </Modal>
  )

  return (
    <>
      <div className="flex flex-col md:w-1/2 w-full h-full bg-slate-50 border-2 rounded-md border-slate-100 shadow-lg mx-auto p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">
            Approval
          </h2>
          <LogoutButton />
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
      {showModal && modal}
    </>
  )
}
