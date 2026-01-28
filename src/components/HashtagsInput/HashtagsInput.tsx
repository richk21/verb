import { Box, Chip, InputBase, Stack, useTheme } from '@mui/material';
import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';

interface HashtagsInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  min?: number;
  max?: number;
}

export const HashtagsInput = ({ control, name, min = 2, max = 8 }: HashtagsInputProps) => {
  const theme = useTheme();
  const [input, setInput] = useState('');

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      rules={{
        validate: {
          minLen: (v) => v.length >= min || `At least ${min} hashtags required`,
          maxLen: (v) => v.length <= max || `Max ${max} hashtags allowed`,
        },
      }}
      render={({ field }) => {
        const { value, onChange } = field;

        const addTag = () => {
          const trimmed = input.trim();
          if (!trimmed) return;
          if (value.includes(trimmed)) return;
          if (value.length >= max) return;

          onChange([...value, trimmed]);
          setInput('');
        };

        const removeTag = (tag: string) => {
          onChange(value.filter((t: string) => t !== tag));
        };

        return (
          <Box sx={{ mb: 3 }}>
            <InputBase
              placeholder="Add hashtag and press Enter"
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag();
                }
              }}
              sx={{
                borderBottom: '1px solid',
                borderColor: theme.palette.divider,
              }}
            />
            <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
              {value.map((tag: string) => (
                <Chip key={tag} label={tag} onDelete={() => removeTag(tag)} sx={{ mb: 1 }} />
              ))}
            </Stack>
          </Box>
        );
      }}
    />
  );
};
