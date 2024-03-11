import {
  useEffect,
  useMemo,
  useState
} from 'react'
import Table from '../components/Table'
import { Badge } from '../components/Badge'
import { useFetchRegistrationQuery } from '../store/api/registrationApi'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const ENTER_CODE = 13

export default function RegistryPage() {
  const [npwp, setNpwp] = useState('')
  const [term, setTerm] = useState('')
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
      key: 'status',
      label: 'Status'
    },
    {
      key: 'actions',
      label: ''
    }
  ]
  const { data, isFetching, isError, error } =
    useFetchRegistrationQuery(npwp, {
      skip: !npwp
    })

  const updateNpwp = value => {
    setNpwp(value)
  }

  const handleKeyDown = e => {
    if (e.keyCode === ENTER_CODE) {
      updateNpwp(term)
    }
  }

  const handleSearch = () => {
    updateNpwp(term)
  }

  useEffect(() => {
    if (isError) {
      const [firstError] = error.message
      toast.error(
        firstError ||
          'Terjadi kesalahan, silahkan coba lagi'
      )
    }
  }, [isError])

  const [isSearchedAndEmptyMessage] =
    useMemo(() => {
      const isSearchedAndEmptyMessage =
        !data && npwp
          ? 'NPWP tidak ditemukan'
          : 'Input NPWP terlebih dahulu'
      return [isSearchedAndEmptyMessage]
    }, [data, npwp])

  const mappingStatus = {
    pending: 0,
    approved: 1,
    rejected: 2
  }

  const mappingStatusText = {
    [mappingStatus.pending]: 'Pending',
    [mappingStatus.approved]: 'Approved',
    [mappingStatus.rejected]: 'Rejected'
  }

  const mappingStatusColor = {
    [mappingStatus.pending]: 'yellow',
    [mappingStatus.approved]: 'green',
    [mappingStatus.rejected]: 'red'
  }

  return (
    <div className="w-screen min-h-screen overflow-auto w-full bg-gradient-to-r from-teal-400 to-cyan-500">
      <div className="h-screen w-1/2 mx-auto bg-neutral-200 p-8 rounded-md border-slate-500 shadow-md shadow-cyan-500">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold capitalize mb-4 text-gray-700">
            Cek proses pendaftaran
          </h2>
          <Link
            as="a"
            to="/"
            className="text-md ml-1 text-blue-600 hover:text-blue-500/30"
          >
            Kembali
          </Link>
        </div>
        <div className="flex justify-between gap-2 mb-6">
          <input
            className="focus:outline-none focus:ring-0 focus:border-blue-200/75 focus:shadow-md focus:shadow-blue-500/30 border border-slate-100 rounded-md py-1 px-2 w-full h-12"
            placeholder="Masukkan NPWP"
            value={term}
            onKeyDown={handleKeyDown}
            onChange={e =>
              setTerm(e.target.value)
            }
          />
          <button
            className="py-1 px-3 text-white rounded active:bg-blue-500/50 bg-blue-500 shadow-md shadow-slate-500/30 focus:outline-none focus:ring-0 focus:border-blue-500 focus:shadow-lg focus:shadow-slate-500/30"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <div>
          <Table
            isLoading={isFetching}
            emptyMessage={
              isSearchedAndEmptyMessage
            }
            headers={headers}
            data={data ? [data] : []}
            actions={item =>
              item && (
                <>
                  <a
                    href={`${
                      import.meta.env
                        .VITE_API_BASE_URL
                    }/download-pdf/${item.npwp}`}
                    target="_blank"
                    className="text-blue-600 hover:text-blue-300 cursor-pointer"
                  >
                    Download
                  </a>
                </>
              )
            }
            body_status={item =>
              item && (
                <>
                  <Badge
                    variant={
                      mappingStatusColor[
                        item.status
                      ]
                    }
                  >
                    {
                      mappingStatusText[
                        item.status
                      ]
                    }
                  </Badge>
                </>
              )
            }
          ></Table>
        </div>
      </div>
    </div>
  )
}
