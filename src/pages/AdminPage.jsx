import Table from '../components/Table'

export default function AdminPage() {
  return (
    <>
      <div>Admin Page</div>
      <div>
        <Table headers={headers} data={tableData}>
          {{
            actions: (
              <>
                <div>Approve</div>
              </>
            )
          }}
        </Table>
      </div>
    </>
  )
}
