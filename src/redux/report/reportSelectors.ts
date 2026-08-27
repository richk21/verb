import { RootState } from '../../app/store';

export const selectCurrentReport = (state: RootState) => state.report.currentReport;
export const selectReport = (state: RootState) => state.report.report;
export const selectTotalReports = (state: RootState) => state.report.allReportstotalCount;
export const selectReportErrorMessage = (state: RootState) => state.report.errorMessage;
export const selectIsLoading = (state: RootState) => state.report.isLoading;
export const selectAllReports = (state: RootState) => state.report.allReports;
export const selectAllUserReportsTotalCount = (state: RootState) =>
  state.report.allUserReportsTotalCount;
export const selectAllUserReports = (state: RootState) => state.report.allUserReports;
export const selectReportSuccessMessage = (state: RootState) => state.report.successMessage;
export const selectUnsplashCoverImages = (state: RootState) => state.report.unsplashImages;
export const selectIsUnsplashImagesLoading = (state: RootState) =>
  state.report.isUnsplashImagesLoadingState;
export const selectReportUnsplashErrorMessage = (state: RootState) =>
  state.report.unsplashErrorMessage;
export const selectReportUnsplashSuccessMessage = (state: RootState) =>
  state.report.unsplashSuccessMessage;
