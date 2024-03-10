import Table from '../components/Table'

export default function RegistryPage() {
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
  const tableData = [
    {
      company_name: 'Asdf',
      npwp: '123456789012345',
      contact_person: 'John Doe',
      status: 'John Doe'
    }
  ]

  return (
    <div className="w-screen min-h-screen overflow-auto w-full bg-gradient-to-r from-teal-400 to-cyan-500">
      <div className="h-screen w-1/2 mx-auto bg-neutral-200 p-8 rounded-md border-slate-500 shadow-md shadow-cyan-500">
        <h2 className="text-2xl font-semibold capitalize mb-4 text-gray-700">
          Cek proses pendaftaran
        </h2>
        <div className="mb-6">
          <input
            className="focus:outline-none focus:ring-0 focus:border-blue-200/75 focus:shadow-md focus:shadow-blue-500/30 border border-slate-100 rounded-md py-1 px-2 w-full h-12"
            placeholder="Masukkan NPWP"
          />
        </div>
        <div>
          <Table
            headers={headers}
            data={tableData}
          >
            {{
              actions: (
                <>
                  <div>Edit</div>
                </>
              )
            }}
          </Table>
        </div>
      </div>
    </div>
  )
}
