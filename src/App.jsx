import Input from './components/Input'
import { useEffect, useState } from 'react'
import Select from "react-tailwindcss-select";
import { useFetchCitiesQuery, useFetchProvincesQuery } from './store';

function App() {
  const [prov, setProv] = useState(null)
  const [city, setCity] = useState(null)
  const [optsCity, setOptsCity] = useState([])
  const { data: provinces, isFetching } = useFetchProvincesQuery()
  const { data: cities, isFetching: isFetchingCities } = useFetchCitiesQuery(prov, {
    skip: !prov
  })

  useEffect(() => {
    if (prov) setOptsCity(cities)
    else setOptsCity([])
  }, [cities, prov])

  const handleSelectProv = value => {
    setProv(value)
  }
  const handleChange = value => {
    setCity(value)
  }
  return (
    <>
      <div className="flex w-screen min-h-screen overflow-auto justify-center items-center bg-gradient-to-r from-rose-400 to-red-500">
        <div className="flex flex-col w-1/3 h-full bg-neutral-200 border-2 rounded-md border-slate-100 p-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl text-slate-700 font-semibold">
              Registrasi
            </h2>
            <img src="https://gakindo.org/wp-content/uploads/2021/07/Gabungan-Kontraktor-Indonesia.jpg" width="200px" className="rounded-md" />
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <Input label="Perusahaan" name="company" placeholder="Nama perusahaan" />
            </div>
            <div>
            <Input label="Penanggung jawab" name="contact_person" placeholder="Nama penanggung jawab" />
            </div>
            <div>
              <Input label="Jabatan" name="position" placeholder="Jabatan" />
            </div>
            <div>
              <Input label="Nomor Handphone" name="handphone" placeholder="Nomor handphone" />
            </div>
            <div>
              <Input label="NPWP" name="npwp" placeholder="NPWP perusahaan" />
            </div>
            <label className="block font-semibold"> Alamat </label>
            <div className="flex justify-between items-center gap-4">
              <div className="w-full">
                <Select
                    placeholder="Select provinsi"
                    value={prov}
                    onChange={handleSelectProv}
                    options={provinces || []}
                    loading={isFetching}
                    isClearable
                    isSearchable
                />
              </div>
              <div className="w-full">
                <Select
                    value={city}
                    onChange={handleChange}
                    options={optsCity}
                    loading={isFetchingCities}
                    isClearable
                    isSearchable
                />
              </div>
            </div>
            {/* <div className="w-full">
              <textarea className="focus:outline-none focus:ring-0 focus:border-blue-200/75 border border-slate-100 rounded-md p-1 min-w-full focus:shadow-md focus:shadow-blue-500/30" placeholder="Masukkan alamat" />
            </div> */}
            {/* <div>
              <label className="block font-semibold"> Foto </label>
              <div className="relative inline-block">
                <input type="file" className="
                  file:absolute file:right-0 
                  file:bg-blue-500 file:text-white file:border-0
                  file:py-1 file:px-3 file:rounded-md
                  file:shadow-md file:shadow-blue-500/30
                " />
              </div>
            </div> */}
          </div>
          <div className="mt-8 flex justify-end">
            <button className="py-1 px-3 bg-blue-500 text-white rounded active:bg-blue-500/50">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
