import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrgMember } from '../../app/interface/notification';
import { UserRole } from '../../app/interface/user';

interface OrgMembersState {
  members: IOrgMember[];
  isLoading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
}

const initialState: OrgMembersState = {
  members: [],
  isLoading: false,
  errorMessage: null,
  successMessage: null,
};

const orgMembersSlice = createSlice({
  name: 'orgMembers',
  initialState,
  reducers: {
    setMembers: (state, action: PayloadAction<IOrgMember[]>) => {
      state.members = action.payload;
    },
    setMemberRoleInPlace: (state, action: PayloadAction<{ userId: string; role: UserRole }>) => {
      const member = state.members.find((m) => m.id === action.payload.userId);
      if (member) member.role = action.payload.role;
    },
    setOrgMembersLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setOrgMembersErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload;
    },
    setOrgMembersSuccessMessage: (state, action: PayloadAction<string | null>) => {
      state.successMessage = action.payload;
    },
  },
});

export const {
  setMembers,
  setMemberRoleInPlace,
  setOrgMembersLoading,
  setOrgMembersErrorMessage,
  setOrgMembersSuccessMessage,
} = orgMembersSlice.actions;

export const orgMembersReducer = orgMembersSlice.reducer;
