import { useState } from 'react'
import Select from 'react-tailwindcss-select'
import { ENTER_CODE } from '/src/helper/constant/key-code'
import {
  useFetchProvincesQuery,
} from '/src/store'
import { useMemo } from "react";
import { Button } from './Base/Button';

const currentYear = new Date().getFullYear()
const lengthPeriods = currentYear - 2024
const periods = Array.from({ length: lengthPeriods + 1 }).map((_, index) => {
  const firstYear = currentYear - lengthPeriods

  return {
    value: firstYear + index,
    label: (firstYear + index).toString(),
  }
})

export default function FilterAdminTable({ onClickSearch, onPressEnter }) {
  const { data: provinces, isFetching } =
    useFetchProvincesQuery()

  const [isLoadingAll, setIsLoadingAll] = useState('')
  const [term, setTerm] = useState('')
  const [prov, setProv] = useState(null)
  const [period, setPeriod] = useState()

  const handleKeyDown = e => {
    if (e.keyCode === ENTER_CODE) {
      onPressEnter({
        term,
        prov,
        period,
      })
    }
  }

  const handleSearch = () => {
    onClickSearch({
      term,
      prov,
      period,
    })
  }

  useMemo(() => {
    setIsLoadingAll(isFetching)
  }, [isFetching])


  return (
    <>
      <Select
        value={prov}
        options={provinces || []}
        placeholder="Pilih provinsi"
        noOptionsMessage="Data tidak ditemukan"
        loading={isLoadingAll}
        isDisabled={isLoadingAll}
        isClearable
        isSearchable
        onChange={(val) => setProv(val)}
      />

      <Select
        value={period}
        options={periods}
        placeholder="Pilih tahun"
        isClearable
        isSearchable
        onChange={(val) => setPeriod(val)}
      />

      <input
        className="focus:outline-none focus:ring-0 focus:border-blue-200/75 focus:shadow-md focus:shadow-blue-500/30 border border-slate-100 rounded-md py-1 px-2 w-full h-10"
        placeholder="Cari NPWP.."
        value={term}
        onKeyDown={handleKeyDown}
        onChange={e =>
          setTerm(e.target.value)
        }
      />

      <Button rounded onClick={handleSearch}>Search</Button>
    </>
  )
}