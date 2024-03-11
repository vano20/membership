const Table = ({
  headers,
  data: tableData,
  emptyMessage,
  isSelectable = false,
  isLoading = false,
  children,
  ...props
}) => {
  const checkboxLength = isSelectable ? 1 : 0
  let tableHeaders
  if (headers) {
    tableHeaders = headers.map(
      ({ key, label }, index) => {
        if (key !== 'actions') {
          return (
            <th
              key={`header-${key}-${index}`}
              scope="col"
              className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase"
            >
              {label}
            </th>
          )
        } else {
          return (
            <th
              key={`header-${key}-${index}`}
              scope="col"
              className="p-4"
            >
              <span className="sr-only">
                Actions
              </span>
            </th>
          )
        }
      }
    )
  }

  let tableBody
  if (tableData?.length) {
    tableBody = tableData.map(
      (item, indexItem) => {
        let tds
        if (headers) {
          tds = headers.map(({ key }) => {
            if (key !== 'actions') {
              return (
                <td
                  key={`data-${key}-${indexItem}`}
                  className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap"
                >
                  {props?.[`body_${key}`]?.(
                    item
                  ) || item?.[key]}
                </td>
              )
            } else {
              return (
                <td
                  key={`data-${key}-${indexItem}`}
                  className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap"
                >
                  {props?.actions(item) || (
                    <>
                      <div>Default</div>
                    </>
                  )}
                </td>
              )
            }
          })
        }
        return (
          <tr
            key={`data-row-${indexItem}`}
            className="hover:bg-gray-100"
          >
            {isSelectable && (
              <td
                key={`data-checkbox-${indexItem}`}
                className="p-4 w-4"
              >
                <div className="flex items-center">
                  <input
                    id="checkbox-table-1"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
                  />
                  <label
                    htmlFor="checkbox-table-1"
                    className="sr-only"
                  >
                    checkbox
                  </label>
                </div>
              </td>
            )}
            {tds}
          </tr>
        )
      }
    )
  } else if (!isLoading) {
    tableBody = (
      <tr
        key={`data-row-empty`}
        className="hover:bg-gray-100"
      >
        <td
          key={`data-checkbox-empty`}
          className="p-4 w-4"
          colSpan={
            headers.length + checkboxLength
          }
        >
          <div className="flex justify-center items-center text-slate-500">
            {emptyMessage || 'No Data'}
          </div>
        </td>
      </tr>
    )
  } else if (isLoading) {
    tableBody = (
      <tr
        key={`data-row-empty`}
        className="hover:bg-gray-100"
      >
        <td
          key={`data-checkbox-empty`}
          className="p-4 w-4"
          colSpan={
            headers.length + checkboxLength
          }
        >
          <div className="flex justify-center items-center text-slate-500">
            Loading..
          </div>
        </td>
      </tr>
    )
  }

  return (
    <>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
              <thead className="bg-gray-100">
                <tr>
                  {isSelectable && (
                    <th
                      scope="col"
                      className="p-4"
                    >
                      <div className="flex items-center">
                        <input
                          id="checkbox-all"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
                        />
                        <label
                          htmlFor="checkbox-all"
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </th>
                  )}
                  {tableHeaders}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tableBody}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
export default Table
