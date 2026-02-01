import { Box } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BLOGS_PER_PAGE } from '../../app/constants';
import { BlogActions } from '../../redux/blog/blogActions';
import { selectAllBlogs, selectTotalBlogs } from '../../redux/blog/blogSelectors';
import { selectUserId } from '../../redux/user/userSelectors';
import { BlogTile } from '../BlogTile/BlogTile';
import { BlogTileSkeleton } from '../BlogTileSkeleton/BlogTileSkeleton';

export const BlogTileContainer = () => {
  const userId = useSelector(selectUserId);
  const blogs = useSelector(selectAllBlogs);
  const totalBlogs = useSelector(selectTotalBlogs);

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);

  const hasMore = blogs && blogs.length < totalBlogs;

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      await dispatch(
        BlogActions.getAllBlogs({
          page,
          limit: BLOGS_PER_PAGE,
        })
      );
      setLoading(false);
    };

    fetchBlogs();
  }, [dispatch, page]);

  const lastBlogRef = useCallback(
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
        flexWrap: 'wrap',
        gap: 4,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 4,
      }}
    >
      {blogs?.map((blog, index) => {
        const isLast = index === blogs.length - 1;

        return (
          <div key={blog.id} ref={isLast ? lastBlogRef : null}>
            <BlogTile
              id={blog.id}
              title={blog.title}
              hashtags={blog.hashtags}
              content={blog.content}
              coverImageUrl={blog.coverImage || ''}
              author={blog.authorName}
              datePublished={blog.createdAt}
              isDraft={blog.isDraft}
              isProfilePage={false}
              userId={userId}
              userAvatar={blog.authorAvatar}
            />
          </div>
        );
      })}
      {loading && Array.from({ length: 3 }).map((_, i) => <BlogTileSkeleton key={i} />)}
    </Box>
  );
};
