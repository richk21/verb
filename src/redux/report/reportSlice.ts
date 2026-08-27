import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IReport } from '../../app/interface/report';
import { IUnsplashImages } from '../../app/interface/response/unsplashImagesResponse';

interface ReportState {
  currentReport: IReport | null; //FOR PREVIEW AND EDIT
  report: IReport | null; //FOR VIEWING
  allReports: IReport[] | null;
  allUserReports: IReport[] | null;
  allUserReportsTotalCount: number;
  allReportstotalCount: number;
  isLoading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
  unsplashImages: IUnsplashImages[] | null;
  unsplashErrorMessage: string | null;
  unsplashSuccessMessage: string | null;
  isUnsplashImagesLoadingState: boolean;
}

const initialState: ReportState = {
  currentReport: null,
  report: null,
  allReports: null,
  allUserReports: null,
  isLoading: false,
  errorMessage: null,
  successMessage: null,
  unsplashImages: null,
  allReportstotalCount: 0,
  allUserReportsTotalCount: 0,
  unsplashErrorMessage: null,
  unsplashSuccessMessage: null,
  isUnsplashImagesLoadingState: false,
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setCurrentReport: (state, action: PayloadAction<IReport>) => {
      state.currentReport = action.payload;
    },
    setReport: (state, action: PayloadAction<IReport>) => {
      state.report = action.payload;
    },
    setAllReports: (state, action: PayloadAction<{ reports: IReport[]; page: number }>) => {
      const { reports, page } = action.payload;

      if (page === 1) {
        state.allReports = reports;
      } else {
        state.allReports = [...(state.allReports || []), ...reports];
      }
    },
    setAllUserReports: (state, action: PayloadAction<IReport[]>) => {
      state.allUserReports = action.payload;
    },
    resetCurrentReport: (state) => {
      state.currentReport = initialState.currentReport;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload;
    },
    setAllReportstotalCount: (state, action: PayloadAction<number>) => {
      state.allReportstotalCount = action.payload;
    },
    setAllUserReportsTotalCount: (state, action: PayloadAction<number>) => {
      state.allUserReportsTotalCount = action.payload;
    },
    setReportSuccessMessage: (state, action: PayloadAction<string | null>) => {
      state.successMessage = action.payload;
    },
    setUnsplashImages: (state, action: PayloadAction<IUnsplashImages[] | null>) => {
      state.unsplashImages = action.payload;
    },
    setUnsplashImagesLoadingState: (state, action: PayloadAction<boolean>) => {
      state.isUnsplashImagesLoadingState = action.payload;
    },
    setUnsplashErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.unsplashErrorMessage = action.payload;
    },
    setUnsplashSuccessMessage: (state, action: PayloadAction<string | null>) => {
      state.unsplashSuccessMessage = action.payload;
    },
  },
});

export const {
  setCurrentReport,
  setReport,
  setAllReports,
  resetCurrentReport,
  setUnsplashImages,
  setUnsplashSuccessMessage,
  setUnsplashErrorMessage,
  setUnsplashImagesLoadingState,
  setLoading,
  setErrorMessage,
  setAllReportstotalCount,
  setReportSuccessMessage,
  setAllUserReports,
  setAllUserReportsTotalCount,
} = reportSlice.actions;
export const reportReducer = reportSlice.reducer;
