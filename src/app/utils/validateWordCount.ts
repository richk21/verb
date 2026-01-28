export const validateWordCount = (value: string) => {
    const count = value.trim().split(/\s+/).length;
    return count >= 50;
  };