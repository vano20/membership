import { Store } from '@reduxjs/toolkit';
import { Api } from '@reduxjs/toolkit/query';

interface RootState {
  // Define your root state structure here if needed
}

declare const store: Store<RootState>;

// Re-export the hooks
export {
  useFetchProvincesQuery,
  useFetchCitiesQuery
} from './api/provinceApi';
export {
  useAddRegistrationsMutation,
  useUpdateRegistrationsStatusMutation,
  useUpdateRegistrationsMutation,
  useFetchSummaryQuery,
  useFetchSummaryCityQuery,
  useFetchRegistrationDetailQuery,
  useFetchListRegistrationQuery,
  useFetchRegistrationQuery,
  useDeleteRegistrationMutation,
} from './api/registrationApi';
export {
  useLoginMutation,
  useLogoutMutation
} from './api/userApi';

export { store };
export type { RootState };