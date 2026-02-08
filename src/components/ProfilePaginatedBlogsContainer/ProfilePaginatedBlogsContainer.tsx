import { Box, Chip, Pagination, Stack, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BLOGS_PER_PAGE } from '../../app/constants';
import { useUserIdFromRoute } from '../../app/hooks/useUserId';
import { BlogActions } from '../../redux/blog/blogActions';
import { selectAllUserBlogs, selectAllUserBlogsTotalCount } from '../../redux/blog/blogSelectors';
import { selectUserId } from '../../redux/user/userSelectors';
import { BlogTile } from '../BlogTile/BlogTile';

export const ProfilePaginatedBlogsContainer = () => {
  const theme = useTheme();
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const userIdParam = useUserIdFromRoute(); //if some other user's profile

  const blogs = useSelector(selectAllUserBlogs);
  const totalBlogs = useSelector(selectAllUserBlogsTotalCount);
  const totalPages = Math.ceil(totalBlogs / BLOGS_PER_PAGE);
  const emptyText = userIdParam ? 'No blogs yet.' : 'Such empty...write today!';

  const [showDrafts, setShowDrafts] = useState(true);
  const [showPublished, setShowPublished] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(
      BlogActions.getAllUserBlogs({
        userId: userIdParam ? userIdParam : userId,
        getDrafts: userIdParam ? false : showDrafts,
        getPublished: userIdParam ? true : showPublished,
        page,
        limit: BLOGS_PER_PAGE,
      })
    );
  }, [dispatch, userId, showDrafts, showPublished, page]);

  useEffect(() => {
    setPage(1);
  }, [showDrafts, showPublished]);

  console.log(blogs);

  return (
    <>
      {!userIdParam && (
        <Stack direction="row" spacing={2} mb={2} justifyContent="center">
          <Chip
            label="Drafts"
            clickable
            color={showDrafts ? 'primary' : 'default'}
            onClick={() => setShowDrafts((prev) => !prev)}
          />
          <Chip
            label="Published"
            clickable
            color={showPublished ? 'primary' : 'default'}
            onClick={() => setShowPublished((prev) => !prev)}
          />
        </Stack>
      )}
      {blogs?.length != 0 ? (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            padding: 4,
          }}
        >
          {blogs?.map((blog) => (
            <BlogTile
              key={blog.id}
              id={blog.id}
              title={blog.title}
              hashtags={blog.hashtags}
              content={blog.content}
              coverImageUrl={blog.coverImage || ''}
              author={blog.authorName}
              datePublished={blog.createdAt}
              isDraft={blog.isDraft}
              isProfilePage
              userId={userId}
              userAvatar={blog.authorAvatar}
            />
          ))}
        </Box>
      ) : (
        <Box sx={{ pt: 5, pb: 10 }}>
          <Typography
            sx={{ color: theme.palette.grey[500], letterSpacing: '0.05em', fontSize: 14 }}
          >
            {emptyText}
          </Typography>
        </Box>
      )}
      {totalPages > 1 && (
        <Stack alignItems="center" my={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            shape="rounded"
          />
        </Stack>
      )}
    </>
  );
};
