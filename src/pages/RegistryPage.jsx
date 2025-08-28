import { useEffect, useMemo, useState } from "react";
import Table from "@/components/Table";
import { useFetchRegistrationQuery } from "@/store/api/registrationApi";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import StatusBadge from "@/components/StatusBadge";
import { mappingStatus } from "@/helper/constant/status";
import { ENTER_CODE } from "@/helper/constant/key-code";
import { Button } from "@/components/Base/Button";

export default function RegistryPage() {
  const [npwp, setNpwp] = useState("");
  const [term, setTerm] = useState("");
  const headers = [
    {
      key: "company_name",
      label: "Nama",
    },
    {
      key: "npwp",
      label: "NPWP",
    },
    {
      key: "contact_person",
      label: "Kontak",
    },
    {
      key: "period",
      label: "Periode",
    },
    {
      key: "status",
      label: "Status",
      render: (item) => (
        <>
          <StatusBadge status={item.status} />
        </>
      ),
    },
    {
      key: "actions",
      label: "",
      render: (item) =>
        item?.status === mappingStatus.approved ? (
          <>
            <a
              href={`${import.meta.env.VITE_API_BASE_URL}/download-pdf/${
                item.npwp
              }`}
              target="_blank"
              className="text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              Download
            </a>
          </>
        ) : (
          <>-</>
        ),
    },
  ];
  const { data, isFetching, isError, error } = useFetchRegistrationQuery(
    { npwp },
    {
      skip: !npwp,
    }
  );

  const updateNpwp = (value) => {
    setNpwp(value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === ENTER_CODE) {
      updateNpwp(term);
    }
  };

  const handleSearch = () => {
    updateNpwp(term);
  };

  useEffect(() => {
    if (isError) {
      const [firstError] = Array.isArray(error.message) ? error.message : [];
      toast.error(firstError || "Terjadi kesalahan, silahkan coba lagi");
    }
  }, [isError, error]);

  const [isSearchedAndEmptyMessage] = useMemo(() => {
    const isSearchedAndEmptyMessage =
      !data && npwp
        ? "NPWP tidak ditemukan"
        : "Silakan masukkan NPWP untuk melihat data pendaftaran";
    return [isSearchedAndEmptyMessage];
  }, [data, npwp]);

  return (
    <div className="md:w-screen min-h-screen overflow-auto w-full bg-slate-50 p-8">
      <div className="w-full bg-white p-8 rounded-md border-slate-500 shadow-lg shadow-slate-300">
        <div className="flex md:flex-row md:justify-between md:items-center flex-col gap-4 mb-4">
          <div className="mb-4">
            <h2 className="text-2xl font-bold capitalize text-slate-800">
              Cek proses pendaftaran
            </h2>
            <h3 className="text-md text-slate-600">
              Masukkan NPWP perusahaan Anda untuk melihat status pendaftaran.
            </h3>
          </div>
          <div>
            <Link
              as="a"
              to="/"
              className="text-md ml-1 text-blue-600 hover:text-blue-700 hover:underline underline-offset-2"
            >
              Kembali
            </Link>
          </div>
        </div>
        <div className="flex justify-between gap-2 mb-6">
          <input
            className="focus:outline-none focus:ring-0 focus:border-blue-200/75 focus:shadow-md focus:shadow-blue-500/30 border border-slate-300 rounded-md py-1 px-2 w-full h-12"
            placeholder="Masukkan NPWP"
            value={term}
            onKeyDown={handleKeyDown}
            onChange={(e) => setTerm(e.target.value)}
          />
          <Button onClick={handleSearch} rounded>
            Search
          </Button>
        </div>

        <div>
          <Table
            isLoading={isFetching}
            emptyMessage={isSearchedAndEmptyMessage}
            headers={headers}
            data={data ? [data] : []}
            noFooter
          />
        </div>
      </div>
    </div>
  );
}
