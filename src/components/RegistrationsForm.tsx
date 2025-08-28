import Input from "@/components/Input";
import { useEffect, useMemo, useState } from "react";
import Select from "react-tailwindcss-select";
import {
  ErrorMessage,
  Field,
  FieldInputProps,
  Form,
  Formik,
  FormikHelpers,
} from "formik";
import toast from "react-hot-toast";
import ModalSuccess from "@/components/ModalSuccess";
import { useParams } from "react-router-dom";
import { capitalize } from "@/helper/string";
import { registrationSchema } from "@/validation/registration";
import {
  useAddRegistrationsMutation,
  useUpdateRegistrationsMutation,
  useFetchCitiesQuery,
  useFetchProvincesQuery,
  useFetchRegistrationDetailQuery,
} from "@/store";
import { useAuth } from "@/context/useAuth";
import { Button } from "@/components/Base/Button";
import {
  Option,
  SelectValue,
} from "react-tailwindcss-select/dist/components/type";
import {
  AddRegistrationBody,
  RegistrationFormValues,
} from "@/types/registration";

const dataQualifications = ["kecil", "menengah", "besar", "spesialis"];
const dataPositions = ["direktur", "direktur utama", "wakil direktur"];
const dataType = ["PT", "CV", "Koperasi"];

const initialValue: RegistrationFormValues = {
  company_type: null,
  company_name: "",
  contact_person: "",
  email: "",
  phone_number: "",
  position: null,
  company_address: "",
  npwp: "",
  qualification: null,
  province: null,
  city: null,
};

const selectClass = (field: FieldInputProps<string>) => ({
  menuButton: () =>
    `${
      field.value ? "text-gray-500" : "text-gray-400"
    } flex text-sm border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20`,
});

const mapSelectOptions = (
  arr: string[],
  callback: (item: string) => Option = (item) => ({
    label: capitalize(item),
    value: item.toUpperCase(),
  })
): Option[] => arr.map(callback);

const qualifications = mapSelectOptions(dataQualifications);
const positions = mapSelectOptions(dataPositions);
const types = mapSelectOptions(dataType, (i) => ({
  label: i,
  value: i,
}));

const RegistrationsForm = () => {
  const { id } = useParams<{ id?: string }>();
  const { accessToken } = useAuth();

  const [prov, setProv] = useState<Option | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [registeredNpwp, setRegisteredNpwp] = useState("");
  const [initValue, setInitValue] =
    useState<RegistrationFormValues>(initialValue);

  const { data: provinces, isFetching } = useFetchProvincesQuery();

  const { data: cities, isFetching: isFetchingCities } = useFetchCitiesQuery(
    prov?.value,
    {
      skip: !prov,
    }
  );

  const [addRegistration, { isError, isLoading, isSuccess, error, status }] =
    useAddRegistrationsMutation();

  const { data: detail, isFetching: isFetchingDetail } =
    useFetchRegistrationDetailQuery(
      { id },
      {
        skip: !id,
      }
    );

  const [
    updateRegistration,
    {
      isError: isErrorUpdate,
      isLoading: isLoadingUpdate,
      isSuccess: isSuccessUpdate,
    },
  ] = useUpdateRegistrationsMutation();

  const [isPageLoading] = useMemo(
    () => [
      isLoading ||
        isFetching ||
        isFetchingDetail ||
        isLoadingUpdate ||
        status === "pending",
    ],
    [isLoading, isLoadingUpdate, isFetching, isFetchingDetail, status]
  );

  useEffect(() => {
    if (id && detail) {
      const province = detail.province
        ? {
            ...detail.province,
            value: detail.province.code,
            label: capitalize(detail.province.name),
          }
        : null;

      setInitValue({
        ...initialValue,
        company_name: detail.company_name,
        contact_person: detail.contact_person,
        email: detail.email,
        phone_number: detail.phone_number,
        position:
          positions.find(
            ({ value }) => value.toUpperCase() === detail.position.toUpperCase()
          ) || null,
        company_address: detail.company_address,
        npwp: detail.npwp,
        qualification:
          qualifications.find(
            ({ value }) =>
              value.toUpperCase() === detail.qualification.toUpperCase()
          ) || null,
        province,
        city: detail.city
          ? {
              ...detail.city,
              value: detail.city.code,
              label: capitalize(detail.city.name),
            }
          : null,
        company_type:
          types.find(({ value }) => value === detail.company_type) || null,
      });

      setProv(province);
    }
  }, [detail, id]);

  useEffect(() => {
    let message = "";
    if (isError) {
      const [firstError] = (error as any)?.data?.npwp ?? [];
      toast.error(firstError || "Terjadi kesalahan, silahkan coba lagi");
    } else if (isSuccess) {
      message =
        "Registrasi berhasil, data akan di validasi oleh admin terlebih dahulu";
    } else if (isSuccessUpdate) {
      message = "Update data berhasil";
    }

    if (message) toast.success(message);
  }, [isError, isErrorUpdate, isSuccess, isSuccessUpdate, error]);

  useEffect(() => {
    if (registeredNpwp) setShowModal(true);
  }, [registeredNpwp]);

  const handleSelectProv = (
    value: Option | null,
    form: {
      setFieldValue: (name: string, value: any) => void;
      setFieldTouched: (name: string, touched: boolean) => void;
    }
  ) => {
    const name = "province";
    form.setFieldValue(name, value);

    setProv(value);
    if (!value) {
      form.setFieldValue("city", value);
      form.setFieldTouched(name, true);
    }
  };

  const handleFormSubmit = async (
    values: RegistrationFormValues,
    action: FormikHelpers<RegistrationFormValues>
  ) => {
    const { province, city, qualification, position, company_type, ...rest } =
      values;

    const body: AddRegistrationBody = {
      ...rest,
      ...(id && { id, token: accessToken }),
      province_id: city?.value ? parseInt(city.value) : 0,
      qualification: qualification?.value || "",
      position: position?.value || "",
      company_type: company_type?.value || "",
      province_code: province?.value || "",
    };
    const submitFunc = id ? updateRegistration : addRegistration;

    const result: any = await submitFunc(body);

    setRegisteredNpwp(result?.data?.data?.npwp || "");

    if (!result?.error) {
      action.setSubmitting(false);
      action.resetForm();
    }
  };

  return (
    <>
      <Formik
        initialValues={initValue}
        validationSchema={registrationSchema}
        onSubmit={handleFormSubmit}
        enableReinitialize
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col">
                <label className="md:block hidden font-semibold mb-1">
                  Perusahaan
                </label>
                <div className="flex md:justify-between md:flex-row flex-col justify-start items-center gap-4">
                  <div className="md:w-1/3 w-full">
                    <label className="block md:hidden font-semibold mb-1">
                      Bentuk
                    </label>
                    <Field name="company_type">
                      {({
                        field,
                        form,
                      }: {
                        field: FieldInputProps<string>;
                        form: any;
                      }) => (
                        <Select
                          {...field}
                          value={field.value as unknown as Option}
                          options={types}
                          placeholder="Bentuk"
                          noOptionsMessage="Data tidak ditemukan"
                          isClearable
                          classNames={selectClass(field)}
                          primaryColor="blue"
                          onChange={(e: SelectValue) =>
                            form.setFieldValue("company_type", e)
                          }
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      component="a"
                      name="company_type"
                      className="text-sm text-red-600"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block md:hidden font-semibold mb-1">
                      Perusahaan
                    </label>
                    <Input
                      name="company_name"
                      placeholder="Nama perusahaan"
                      isInvalid={
                        !!(touched.company_name && errors.company_name)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex md:justify-between md:flex-row flex-col justify-start items-center gap-4">
                <div className="w-full">
                  <Input
                    name="contact_person"
                    label="Penanggung jawab"
                    placeholder="Nama penanggung jawab"
                    isInvalid={
                      !!(touched.contact_person && errors.contact_person)
                    }
                  />
                </div>
                {/* <div>
                <Input
                  name="position"
                  label="Jabatan"
                  placeholder="Jabatan"
                  isInvalid={
                    touched.position &&
                    errors.position
                  }
                />
              </div> */}
                <div className="w-full">
                  <label className="block font-semibold mb-1">Jabatan</label>
                  <Field name="position">
                    {({
                      field,
                      form,
                    }: {
                      field: FieldInputProps<string>;
                      form: any;
                    }) => (
                      <Select
                        {...field}
                        value={field.value as unknown as SelectValue}
                        options={positions}
                        placeholder="Pilih jabatan"
                        noOptionsMessage="Data tidak ditemukan"
                        isClearable
                        classNames={selectClass(field)}
                        primaryColor="blue"
                        onChange={(e: SelectValue) =>
                          form.setFieldValue("position", e)
                        }
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    component="a"
                    name="position"
                    className="text-sm text-red-600"
                  />
                </div>
              </div>
              <div className="w-full">
                <label className="block font-semibold mb-1">Kualifikasi</label>
                <Field name="qualification">
                  {({
                    field,
                    form,
                  }: {
                    field: FieldInputProps<string>;
                    form: any;
                  }) => (
                    <Select
                      {...field}
                      value={field.value as unknown as SelectValue}
                      options={qualifications}
                      placeholder="Pilih kualifikasi"
                      noOptionsMessage="Data tidak ditemukan"
                      isClearable
                      isSearchable
                      classNames={selectClass(field)}
                      primaryColor="blue"
                      onChange={(e: SelectValue) =>
                        form.setFieldValue("qualification", e)
                      }
                    />
                  )}
                </Field>
                <ErrorMessage
                  component="a"
                  name="qualification"
                  className="text-sm text-red-600"
                />
              </div>
              <div>
                <Input
                  name="phone_number"
                  label="Nomor telepon"
                  placeholder="Nomor telepon"
                  isInvalid={!!(touched.phone_number && errors.phone_number)}
                />
              </div>
              <div>
                <Input
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="Alamat email"
                  isInvalid={!!(touched.email && errors.email)}
                />
              </div>
              <div>
                <Input
                  label="NPWP"
                  name="npwp"
                  placeholder="NPWP perusahaan"
                  isInvalid={!!(touched.npwp && errors.npwp)}
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Alamat</label>
                <div className="w-full mb-4">
                  <Field name="province">
                    {({
                      field,
                      form,
                    }: {
                      field: FieldInputProps<string>;
                      form: any;
                    }) => (
                      <Select
                        {...field}
                        value={field.value as unknown as SelectValue}
                        options={provinces || []}
                        placeholder="Pilih provinsi"
                        noOptionsMessage="Data tidak ditemukan"
                        loading={isFetching}
                        isDisabled={isFetching}
                        isClearable
                        isSearchable
                        classNames={selectClass(field)}
                        primaryColor="blue"
                        onChange={(e: SelectValue) =>
                          handleSelectProv(e as Option, form)
                        }
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    component="a"
                    name="province"
                    className="text-sm text-red-600"
                  />
                </div>
                <div className="w-full">
                  <Field name="city">
                    {({
                      field,
                      form,
                    }: {
                      field: FieldInputProps<string>;
                      form: any;
                    }) => (
                      <Select
                        {...field}
                        value={field.value as unknown as SelectValue}
                        options={(prov && cities) || []}
                        placeholder="Pilih kota/kabupaten"
                        noOptionsMessage="Data tidak ditemukan"
                        loading={isFetchingCities}
                        isDisabled={isFetchingCities}
                        classNames={selectClass(field)}
                        isClearable
                        isSearchable
                        primaryColor="blue"
                        onChange={(e: SelectValue) =>
                          form.setFieldValue("city", e)
                        }
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    component="a"
                    name="city"
                    className="text-sm text-red-600"
                  />
                </div>
              </div>
              <div className="w-full">
                <Field name="company_address">
                  {({ field }: { field: FieldInputProps<string> }) => (
                    <textarea
                      {...field}
                      className={`focus:outline-none focus:ring-0 focus:border-blue-200/75 border rounded-md p-1 min-w-full focus:shadow-md focus:shadow-blue-500/30 ${
                        touched.company_address && errors.company_address
                          ? "border-red-600/50 shadow-md shadow-red-600/30"
                          : "border-slate-300 "
                      }`}
                      placeholder="Masukkan alamat"
                    />
                  )}
                </Field>
                <ErrorMessage
                  component="a"
                  name="company_address"
                  className="text-sm text-red-600"
                />
              </div>
              {/* TODO: Upload photo */}
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
              <Button
                type="submit"
                rounded
                isDisabled={isPageLoading || isSubmitting}
                isLoading={isPageLoading}
              >
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>

      <ModalSuccess
        npwp={registeredNpwp}
        showModal={showModal}
        handleChange={(val: boolean) => setShowModal(val)}
      />
    </>
  );
};

export default RegistrationsForm;
