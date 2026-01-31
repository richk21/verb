import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BlogActions } from '../../redux/blog/blogActions';
import { selectAllBlogs } from '../../redux/blog/blogSelectors';
import { BlogTile } from '../BlogTile/BlogTile';

interface IBlogTileContainer {
  isProfilePage?: boolean;
}
export const BlogTileContainer = ({ isProfilePage }: IBlogTileContainer) => {
  const dispatch = useDispatch();
  const blogs = useSelector(selectAllBlogs);
  console.log('BlogTileContainer render');
  useEffect(() => {
    if (isProfilePage) {
      dispatch(BlogActions.getAllUserBlogs({ userId: 0 }));
    } else {
      dispatch(BlogActions.getAllBlogs());
    }
  }, [dispatch]);

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
      {blogs?.map((blog, index) => (
        <div key={index}>
          <BlogTile
            id={blog.id}
            title={blog.title}
            hashtags={blog.hashtags}
            content={blog.content}
            coverImageUrl={blog.coverImage || ''}
            author={blog.authorName}
            datePublished={blog.createdAt}
            isDraft={blog.isDraft}
            isProfilePage={isProfilePage}
          />
        </div>
      ))}
    </Box>
  );
};
