import {
  useEffect,
  useMemo,
  useState
} from 'react'
import Table from '/src/components/Table'
import { useFetchRegistrationQuery } from '/src/store/api/registrationApi'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import StatusBadge from '/src/components/StatusBadge'
import { mappingStatus } from '/src/helper/constant/status'
import { ENTER_CODE } from '/src/helper/constant/key-code'
import { Button } from '../components/Base/Button'

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
      render: item =>
        item?.status ===
          mappingStatus.approved ? (
          <>
            <a
              href={`${import.meta.env.VITE_API_BASE_URL
                }/download-pdf/${item.npwp}`}
              target="_blank"
              className="text-blue-600 hover:text-blue-300 cursor-pointer"
            >
              Download
            </a>
          </>
        ) : (
          <>-</>
        )
    }
  ]
  const { data, isFetching, isError, error } =
    useFetchRegistrationQuery(
      { npwp },
      {
        skip: !npwp
      }
    )

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
      const [firstError] = Array.isArray(
        error.message
      )
        ? error.message
        : []
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

  return (
    <div className="md:w-screen min-h-screen overflow-auto w-full bg-white p-8">
      <div className="w-full bg-slate-200 p-8 rounded-md border-slate-500 shadow-lg shadow-slate-300">
        <div className="flex md:flex-row md:justify-between md:items-center flex-col gap-4 mb-4">
          <h2 className="text-2xl font-semibold capitalize mb-4 text-gray-700">
            Cek proses pendaftaran
          </h2>
          <div>
            <Link
              as="a"
              to="/"
              className="text-md ml-1 text-blue-600 hover:text-blue-500/30"
            >
              Kembali
            </Link>
          </div>
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
          <Button
            onClick={handleSearch}
            rounded
          >
            Search
          </Button>
        </div>

        <div>
          <Table
            isLoading={isFetching}
            emptyMessage={
              isSearchedAndEmptyMessage
            }
            headers={headers}
            data={data ? [data] : []}
            noFooter
          ></Table>
        </div>
      </div>
    </div>
  )
}
