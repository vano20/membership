import { useEffect, useState } from 'react'
import {
  MdOutlineEmail,
  MdOutlineWhatsapp,
  MdPermContactCalendar,
  MdPhoneAndroid
} from 'react-icons/md'
import toast from 'react-hot-toast'
import LogoutButton from '/src/components/LogoutButton'
import StatusBadge from '/src/components/StatusBadge'
import Table from '/src/components/Table'
import ModalConfirm from '/src/components/ModalConfirm'
import { useAuth } from '/src/context/useAuth'
import Modal from '/src/components/Modal'
import { useUpdateRegistrationsStatusMutation, useDeleteRegistrationMutation, useFetchListRegistrationQuery, useFetchRegistrationQuery } from '/src/store'
import { Link } from 'react-router-dom'
import FilterAdminTable from '../components/FilterAdminTable'
import { mappingStatus } from './constant'

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
  const [showModalConfirm, setShowModalConfirm] =
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
  } = useFetchListRegistrationQuery({ ...meta, ...filter, npwp })
  const [updateStatus, { isLoading }] =
    useUpdateRegistrationsStatusMutation()
  const { data: detailRegistration, isError } =
    useFetchRegistrationQuery(item, {
      skip:
        !Object.keys(item).length && !showModal
    })
  const [deleteRegistrations, { isLoading: isLoadingDelete }] =
    useDeleteRegistrationMutation()

  const encodePhone = val => {
    const isLeadingZero = val.charAt(0) == 0
    const isLeadingPlus = val.charAt(0) === '+'
    let formattedPhone = val

    if (!isLeadingPlus) formattedPhone = `+62${formattedPhone.slice(isLeadingZero ? 1 : 0)}`

    return encodeURI(`https://wa.me/${formattedPhone}`);
  }

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
      key: 'phone_number',
      label: 'Nomor kontak',
      style: 'flex items-center justify-start',
      render: item => (
        <a href={encodePhone(item.phone_number)} target="_blank" className="text-blue-600 hover:text-blue-500/30 flex justify-center items-center">
          <MdOutlineWhatsapp size={16} className="inline mr-1" />
          {item.phone_number}
        </a>
      )
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
        <div className="flex items-center justify-end gap-4">
          <Link
            as="a"
            to={`/admin/form/${item.id}`}
            className="text-blue-600 hover:text-blue-500/30"
          >
            Edit
          </Link>
          <button
            className="py-1 px-3 text-white rounded-lg active:bg-blue-500/50 bg-blue-500 shadow-md shadow-slate-500/30 focus:outline-none focus:ring-0 focus:border-blue-500 focus:shadow-lg focus:shadow-slate-500/30 hover:bg-blue-500/10 hover:text-blue-500"
            onClick={() => handleShowModal(item)}
          >
            Approve
          </button>
          <button
            className="py-1 px-3 text-white rounded-lg active:bg-red-500/50 bg-red-500 shadow-md shadow-slate-500/30 focus:outline-none focus:ring-0 focus:border-red-500 focus:shadow-lg focus:shadow-slate-500/30 hover:bg-red-500/10 hover:text-red-500 disabled:bg-red-500/20 disabled:text-slate-400"
            disabled={isLoadingDelete}
            onClick={() => handleShowModalConfirm(item)}
          >
            Delete
          </button>
        </div>
      )
    }
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
  const handleShowModalConfirm = item => {
    setItem(item)
    setShowModalConfirm(true)
  }

  const handleUpdateMeta = ({ page }) => {
    setMeta({
      ...meta,
      page
    })
  }

  const handleSubmit = async (status) => {
    try {
      await updateStatus({
        token: isLoggedIn,
        body: {
          ...detail,
          status,
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

  const handleDelete = async ({ done }) => {
    try {
      await deleteRegistrations({
        id: item.id,
        token: isLoggedIn,
      })

      toast.success('Registrasi berhasil dihapus!')
    } catch (error) {
      toast.error(
        error.message ||
        'Terjadi kesalahan saat menghapus data.'
      )
    } finally {
      done()
      setShowModalConfirm(false)
    }
  }


  const footer = (
    <div className="flex gap-4">
      <button
        onClick={handleClose}
        className="py-1 px-3 text-slate rounded-lg active:bg-slate-500/50 shadow-md shadow-slate-500/30 focus:outline-none focus:ring-0 focus:border-blue-500 focus:shadow-lg focus:shadow-slate-500/30 hover:bg-slate-500/10 hover:text-slate-500 disabled:bg-blue-500/20 disabled:text-slate-400"
        disabled={isLoading}
      >
        Cancel
      </button>

      <button
        onClick={() => handleSubmit()}
        className="py-1 px-3 text-white rounded-lg active:bg-blue-500/50 bg-blue-500 shadow-md shadow-slate-500/30 focus:outline-none focus:ring-0 focus:border-blue-500 focus:shadow-lg focus:shadow-slate-500/30 hover:bg-blue-500/20 hover:text-blue-500 disabled:bg-blue-500/20 disabled:text-slate-400"
        disabled={isLoading}
      >
        Save
      </button>

      {detail?.status === mappingStatus.pending && <button
        onClick={() => handleSubmit(mappingStatus.approved)}
        className="py-1 px-3 text-white rounded-lg active:bg-blue-500/50 bg-blue-500 shadow-md shadow-slate-500/30 focus:outline-none focus:ring-0 focus:border-blue-500 focus:shadow-lg focus:shadow-slate-500/30 hover:bg-blue-500/20 hover:text-blue-500 disabled:bg-blue-500/20 disabled:text-slate-400"
        disabled={isLoading}
      >
        Approve
      </button>}
    </div>
  )

  const modal = (
    <Modal onClose={handleClose} footer={footer}>
      <div className="text-wrap break-words">
        <h1 className="text-3xl font-semibold flex items-start gap-4 mb-2">
          {detail?.company_name}{' '}
          <div className="inline-block text-sm ml-auto">
            <StatusBadge
              status={detail?.status}
            />
          </div>
        </h1>

        <h3 className="text-sm text-slate-500 capitalize mb-4">
          {`${detail?.company_address
            }, ${detail?.city?.name?.toLowerCase()}, ${detail?.province?.name?.toLowerCase()}`}
        </h3>

        <div className="text-xl mb-4 font-semibold">
          Periode {detail?.period}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 p-2 w-fit">
            <MdPermContactCalendar size={24} />
            {detail?.contact_person},{' '}
            {detail?.position}
          </div>
          <div className="flex gap-2 p-2 w-fit">
            <MdOutlineEmail size={24} />
            {detail?.email}
          </div>
          <div className="flex gap-2 p-2 w-fit">
            <MdPhoneAndroid size={24} />
            {detail?.phone_number}
          </div>
          <div className="flex gap-2 p-2 w-fit">
            <span className="font-semibold">
              NPWP
            </span>
            {detail?.npwp}
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
          placeholder="Nomor anggota"
          value={membershipId}
          onChange={e =>
            setMembershipId(e.target.value)
          }
        />
      </div>
    </Modal>
  )

  return (
    <>
      <div className="flex flex-col w-full h-full bg-slate-200 border-2 rounded-md shadow-lg shadow-slate-300 mx-auto p-8 border-transparent">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">
            Approval
          </h2>

          <div className="flex items-center gap-4">
            <FilterAdminTable onClickSearch={handleUpdateFilter} onPressEnter={handleUpdateFilter} />

            <LogoutButton />
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

      {showModal && modal}

      <ModalConfirm showModal={showModalConfirm} title={`Hapus registrasi?`} desc={`Hapus registrasi dari ${item.npwp} - ${item.company_name}`} handleChange={(val) => setShowModalConfirm(val)} onSubmit={handleDelete} />
    </>
  )
}
