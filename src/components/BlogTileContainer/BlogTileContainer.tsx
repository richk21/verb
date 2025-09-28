import { Box } from '@mui/material';
import { BlogTile } from '../BlogTile/BlogTile';

const image =
  'https://images.unsplash.com/photo-1758132123976-6730692335f7?q=80&w=1229&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const blogs = [
  {
    title: 'Exploring React Hooks',
    hashtags: ['react', 'javascript', 'webdev'],
    content:
      'React hooks are functions that let you use state and other React features without writing a class. They provide a more concise and functional way to write React components. React hooks are functions that let you use state and other React features without writing a class. They provide a more concise and functional way to write React components...',
    coverImageUrl: image,
    author: 'John Doe',
    datePublished: 'Sep 28, 2025',
  },
  {
    title: 'Understanding Redux Toolkit',
    hashtags: ['redux', 'state-management', 'reactjs'],
    content:
      'Redux Toolkit simplifies Redux development by providing opinionated utilities and abstractions. It reduces boilerplate and streamlines complex state logic in React apps...',
    coverImageUrl: image,
    author: 'Jane Smith',
    datePublished: 'Sep 15, 2025',
  },
  {
    title: 'Next.js for Server-side Rendering',
    hashtags: ['nextjs', 'ssr', 'react'],
    content:
      'Next.js offers an easy way to implement server-side rendering and static site generation for React apps. This improves page speed, SEO, and user experience...',
    coverImageUrl: image,
    author: 'Alice Johnson',
    datePublished: 'Aug 20, 2025',
  },
  {
    title: 'Mastering React Query',
    hashtags: ['react-query', 'data-fetching', 'react'],
    content:
      'React Query provides hooks to efficiently fetch, cache, and update asynchronous data in React apps. It improves performance and simplifies data management...',
    coverImageUrl: image,
    author: 'Bob Martinez',
    datePublished: 'Sep 10, 2025',
  },
  {
    title: 'TypeScript and React Integration',
    hashtags: ['typescript', 'react', 'static-typing'],
    content:
      'Using TypeScript with React enhances developer productivity by catching errors early and providing type safety. This article explores best practices and common patterns...',
    coverImageUrl: image,
    author: 'Emily Nguyen',
    datePublished: 'Sep 05, 2025',
  },
];

export const BlogTileContainer = () => {
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
      {blogs.map((blog, index) => (
        <div key={index}>
          <BlogTile
            title={blog.title}
            hashtags={blog.hashtags}
            content={blog.content}
            coverImageUrl={blog.coverImageUrl}
            author={blog.author}
            datePublished={blog.datePublished}
          />
        </div>
      ))}
    </Box>
  );
};
