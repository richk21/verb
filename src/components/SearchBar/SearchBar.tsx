import SearchIcon from '@mui/icons-material/Search';
import { alpha, Box, InputBase, useTheme } from '@mui/material';

export const SearchBar = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: 2,
        width: '450px',
        display: 'flex',
        alignItems: 'center',
        px: 1,
        border: `2px solid ${theme.palette.divider}`,
        '&:focus-within': {
          border: `2px solid ${theme.palette.primary.contrastText}`,
        },
      }}
    >
      <SearchIcon sx={{ color: 'primary', mr: 1 }} />
      <InputBase
        placeholder="Search blogs"
        inputProps={{ 'aria-label': 'search' }}
        sx={{ color: 'inherit', width: '100%' }}
      />
    </Box>
  );
};
