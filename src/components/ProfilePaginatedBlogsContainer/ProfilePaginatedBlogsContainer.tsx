import { Box, Chip, Pagination, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BLOGS_PER_PAGE } from '../../app/constants';
import { BlogActions } from '../../redux/blog/blogActions';
import { selectAllBlogs, selectTotalBlogs } from '../../redux/blog/blogSelectors';
import { selectUserId } from '../../redux/user/userSelectors';
import { BlogTile } from '../BlogTile/BlogTile';

export const ProfilePaginatedBlogsContainer = () => {
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  const blogs = useSelector(selectAllBlogs);
  const totalBlogs = useSelector(selectTotalBlogs); // backend total count

  const [showDrafts, setShowDrafts] = useState(false);
  const [showPublished, setShowPublished] = useState(false);
  const [page, setPage] = useState(1);

  // 🔁 API CALL
  useEffect(() => {
    dispatch(
      BlogActions.getAllUserBlogs({
        userId,
        getDrafts: showDrafts,
        getPublished: showPublished,
        page,
        limit: BLOGS_PER_PAGE,
      })
    );
  }, [dispatch, userId, showDrafts, showPublished, page]);

  useEffect(() => {
    setPage(1);
  }, [showDrafts, showPublished]);

  const totalPages = Math.ceil(totalBlogs / BLOGS_PER_PAGE);

  return (
    <>
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
