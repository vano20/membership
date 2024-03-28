import Table from '../components/Table'
import { useFetchSummaryQuery } from '../store/'

export default function SummaryPage() {
  const { data, isFetching } =
    useFetchSummaryQuery()
  const headers = [
    {
      key: 'name',
      label: 'Provinsi'
    },
    {
      key: 'KECIL',
      label: 'Kecil'
    },
    {
      key: 'MENENGAH',
      label: 'Menengah'
    },
    {
      key: 'BESAR',
      label: 'Besar'
    },
    {
      key: 'SPESIALIS',
      label: 'Spesialis'
    },
    {
      key: 'total',
      label: 'Jumlah'
    }
  ]

  return (
    <div className="flex flex-col w-screen h-fit">
      <header className="p-8">
        <h1 className="text-3xl text-slate-800 font-semibold">
          Rekapitulasi
        </h1>
        <h3 className="text-slate-500 text-md">
          Rekapitulasi anggota
        </h3>
      </header>
      <main className="border border-transparent bg-neutral-200 rounded-lg shadow-lg shadow-white-500 h-full w-full p-8">
        <Table
          headers={headers}
          data={data || []}
        ></Table>
      </main>
    </div>
  )
}
