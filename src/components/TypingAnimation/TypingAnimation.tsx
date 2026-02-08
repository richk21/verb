import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export const VerbTyping = () => {
  const titleText = 'Welcome to Verb';
  const subtitleText = 'Write. Build. Iterate.';

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  useEffect(() => {
    let i = 0;
    const titleInterval = setInterval(() => {
      setTitle(titleText.slice(0, i + 1));
      i++;
      if (i === titleText.length) {
        clearInterval(titleInterval);

        let j = 0;
        const subtitleInterval = setInterval(() => {
          setSubtitle(subtitleText.slice(0, j + 1));
          j++;
          if (j === subtitleText.length) {
            clearInterval(subtitleInterval);
          }
        }, 70);
      }
    }, 120);

    return () => clearInterval(titleInterval);
  }, []);

  return (
    <Box>
      <Typography
        sx={{
          fontFamily: 'monospace',
          fontSize: '3.5rem',
          fontWeight: 600,
          color: '#fff',
          lineHeight: 1.1,
          letterSpacing: '0.02em',
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          fontFamily: 'monospace',
          fontSize: '1.1rem',
          fontWeight: 400,
          color: '#ccc',
          marginTop: '0.4rem',
          letterSpacing: '0.08em',
          textTransform: 'lowercase',
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};
