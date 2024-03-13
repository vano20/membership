import { useMemo, useState } from 'react'
import {
  MdChevronLeft,
  MdChevronRight
} from 'react-icons/md'

const Table = ({
  headers,
  metaData = {
    total: 1,
    from: 1,
    to: 1
  },
  meta = {
    page: 1,
    last_page: 1,
    per_page: 10
  },
  data: tableData = [],
  emptyMessage,
  isSelectable = false,
  isLoading = false,
  noFooter = false,
  children,
  ...props
}) => {
  const [isLastPage] = useMemo(() => {
    const isLastPage =
      meta.page === metaData.last_page
    return [isLastPage]
  }, [meta])
  const handlePage = page => {
    if (metaData.last_page < page) return
    const newPage = page < 1 ? 1 : +page
    props.onChangePage({
      ...meta,
      page: newPage
    })
  }

  const checkboxLength = isSelectable ? 1 : 0

  const renderedCheckbox = id => (
    <td className="p-4 w-4">
      <div className="flex items-center">
        <input
          id={`checkbox-table-${id}`}
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2 cursor-pointer"
        />
        <label
          htmlFor={`checkbox-${id}`}
          className="sr-only"
        >
          checkbox
        </label>
      </div>
    </td>
  )

  const renderedHeader = headers.map(
    (
      { label, key, header, style = '' },
      index
    ) => {
      if (key === 'actions') {
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
      return (
        <th
          key={`header-${key}-${index}`}
          scope="col"
          className={`py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase`}
        >
          {header?.() || label}
        </th>
      )
    }
  )

  const renderedBody = tableData.map(
    (row, rowIndex) => {
      const renderedCell = headers.map(col => {
        return (
          <td
            key={`data-${col.key}-${rowIndex}`}
            className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap"
          >
            <div
              className={`truncate ${col.style}`}
            >
              {col?.render?.(row) ||
                row?.[col.key]}
            </div>
          </td>
        )
      })
      return (
        <tr
          key={`data-row-${rowIndex}`}
          className="hover:bg-gray-100"
        >
          {isSelectable &&
            renderedCheckbox(`row-${rowIndex}`)}
          {renderedCell}
        </tr>
      )
    }
  )
  const renderedEmpty = (
    <tr
      key={`data-row-empty`}
      className="hover:bg-gray-100"
    >
      <td
        key={`data-checkbox-empty`}
        className="p-4 w-4"
        colSpan={headers.length + checkboxLength}
      >
        <div className="flex justify-center items-center text-slate-500">
          {isLoading
            ? 'Loading..'
            : emptyMessage || 'No Data'}
        </div>
      </td>
    </tr>
  )

  return (
    <>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
              <thead className="bg-gray-100">
                <tr>
                  {isSelectable &&
                    renderedCheckbox('all')}
                  {renderedHeader}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tableData.length
                  ? renderedBody
                  : renderedEmpty}
              </tbody>
            </table>
            {!noFooter && (
              <div className="flex justify-between items-center text-sm p-4">
                <div className="text-slate-500">
                  Showing {metaData.from} -{' '}
                  {metaData.to} of{' '}
                  {metaData.total}
                </div>
                <div className="text-slate-500 flex gap-2">
                  <div
                    className={`flex items-center min-h-full ${
                      meta.page === 1
                        ? 'cursor-not-allowed'
                        : 'cursor-pointer'
                    }`}
                    onClick={() =>
                      handlePage(meta.page - 1)
                    }
                  >
                    <MdChevronLeft size="24" />
                  </div>
                  <div>
                    <input
                      value={meta.page}
                      className="focus:outline-none focus:ring-0 focus:border-slate-900/75 focus:shadow-md border border-slate-100 rounded-md py-1 px-2 w-10 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none flex items-center"
                      onChange={e =>
                        handlePage(e.target.value)
                      }
                    />
                  </div>
                  <div
                    className={`flex items-center min-h-full ${
                      isLastPage
                        ? 'cursor-not-allowed'
                        : 'cursor-pointer'
                    }`}
                    onClick={() =>
                      handlePage(meta.page + 1)
                    }
                  >
                    <MdChevronRight size="24" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
export default Table
