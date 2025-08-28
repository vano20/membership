import { Option } from "react-tailwindcss-select/dist/components/type";

export interface RegistrationFormValues {
  company_type: Option | null;
  company_name: string;
  contact_person: string;
  email: string;
  phone_number: string;
  position: Option | null;
  company_address: string;
  npwp: string;
  qualification: Option | null;
  province: Option | null;
  city: Option | null;
}

export interface AddRegistrationBody {
  company_name: string;
  contact_person: string;
  email: string;
  phone_number: string;
  position: string;
  company_address: string;
  npwp: string;
  qualification: string;
  company_type: string;
  province_code: string;
  province_id: number;
  id?: string;
  token?: string | null;
}