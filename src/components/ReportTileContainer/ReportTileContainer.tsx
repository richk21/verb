import { Box } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { REPORTS_PER_PAGE } from '../../app/constants';
import { ReportActions } from '../../redux/report/reportActions';
import { selectAllReports, selectTotalReports } from '../../redux/report/reportSelectors';
import { selectUserId } from '../../redux/user/userSelectors';
import { ReportTile } from '../ReportTile/ReportTile';
import { ReportTileSkeleton } from '../ReportTileSkeleton/ReportTileSkeleton';

export const ReportTileContainer = () => {
  const userId = useSelector(selectUserId);
  const reports = useSelector(selectAllReports);
  const totalReports = useSelector(selectTotalReports);

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);

  const hasMore = reports && reports.length < totalReports;

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      await dispatch(
        ReportActions.getAllReports({
          page,
          limit: REPORTS_PER_PAGE,
        })
      );
      setLoading(false);
    };

    fetchReports();
  }, [dispatch, page]);

  const lastReportRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 900,
        mx: 'auto',
        padding: '54px 16px',
      }}
    >
      {reports?.map((report, index) => {
        const isLast = index === reports.length - 1;

        return (
          <div key={report.id} ref={isLast ? lastReportRef : null}>
            <ReportTile
              id={report.id}
              title={report.title}
              hashtags={report.hashtags}
              content={report.content}
              coverImageUrl={report.coverImage || ''}
              author={report.authorName}
              datePublished={report.createdAt}
              status={report.status}
              isProfilePage={false}
              userId={userId}
              userAvatar={report.authorAvatar}
            />
          </div>
        );
      })}
      {loading && Array.from({ length: 3 }).map((_, i) => <ReportTileSkeleton key={i} />)}
    </Box>
  );
};
