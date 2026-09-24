import { RootState } from '../../app/store';

export const selectOrgMembers = (state: RootState) => state.orgMembers.members;
export const selectOrgMembersLoading = (state: RootState) => state.orgMembers.isLoading;
export const selectOrgMembersErrorMessage = (state: RootState) => state.orgMembers.errorMessage;
export const selectOrgMembersSuccessMessage = (state: RootState) => state.orgMembers.successMessage;
