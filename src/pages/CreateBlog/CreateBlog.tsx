import ImageIcon from '@mui/icons-material/Image';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  InputBase,
  Stack,
  useTheme,
} from '@mui/material';
import axios from 'axios';
import { ClipboardEvent, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IUnsplashResponse } from '../../app/interface/unsplashResponse';
import { validateWordCount } from '../../app/utils/validateWordCount';
import { HashtagsInput } from '../../components/HashtagsInput/HashtagsInput';
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';
import { Notification } from '../../components/Notification/Notification';
import { BlogActions } from '../../redux/blog/blogActions';
import {
  selectBlogErrorMessage,
  selectBlogSuccessMessage,
  selectCurrentBlog,
  selectIsLoading,
} from '../../redux/blog/blogSelectors';
import {
  resetCurrentBlog,
  setBlogSuccessMessage,
  setCurrentBlog,
  setErrorMessage,
} from '../../redux/blog/blogSlice';
import { UNSPLASH_API_URL } from '../../redux/endpoints';
import { selectUser } from '../../redux/user/userSelectors';
import { PreviewBlog } from '../PreviewBlog/PreviewBlog';

export interface BlogFormInputs {
  title: string;
  hashtags: string[];
  contents: string;
}

interface ICreateOrEditBlogProps {
  isEditMode?: boolean;
}

export const CreateOrEditBlog = ({ isEditMode = false }: ICreateOrEditBlogProps) => {
  const blogId = useParams().id || '';
  const dispatch = useDispatch();
  const theme = useTheme();
  const blogDraft = useSelector(selectCurrentBlog);
  const user = useSelector(selectUser);
  const blogSuccessMessage = useSelector(selectBlogSuccessMessage);
  const blogErrorMessage = useSelector(selectBlogErrorMessage);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const isLoading = useSelector(selectIsLoading);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    control,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<BlogFormInputs>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      hashtags: [],
      contents: '',
    },
  });

  const watchedTitle = watch('title');
  const watchedHashtags = watch('hashtags');
  const watchedContents = watch('contents');

  const [coverImage, setCoverImage] = useState<string | null>(blogDraft?.coverImage || null);
  const [openDialog, setOpenDialog] = useState(false);
  const [unsplashImages, setUnsplashImages] = useState<IUnsplashResponse[]>([]);
  const [unsplashError, setUnsplashError] = useState<string | null>(null);
  const [switchToPreview, setSwitchToPreview] = useState(false);

  useEffect(() => {
    if (isEditMode || blogDraft) {
      reset({
        title: blogDraft?.title || '',
        hashtags: blogDraft?.hashtags || [],
        contents: blogDraft?.content || '',
      });
      setCoverImage(blogDraft?.coverImage || null);
    } else {
      //todo: change this as this is not reseting when nvigating to create blog from edit blog
      dispatch(resetCurrentBlog());
      reset({
        title: '',
        hashtags: [],
        contents: '',
      });
      setCoverImage(null);
    }
  }, [isEditMode, blogDraft, reset]);

  //todo: move to service layer
  const fetchRandomImages = async (count: number = 52) => {
    try {
      const res = await axios.get(UNSPLASH_API_URL(count, watchedTitle));
      return res.data;
    } catch (err) {
      setUnsplashError('Failed to fetch images from Unsplash');
    }
  };

  useEffect(() => {
    if (openDialog) {
      fetchRandomImages().then((images) => setUnsplashImages(images));
    }
  }, [openDialog]);

  useEffect(() => {
    if (blogId) {
      dispatch(BlogActions.getCurrentBlogById({ blogId }));
    }
  }, [dispatch, blogId]);

  const selectCoverImage = (url: string) => {
    setCoverImage(url);
    setOpenDialog(false);
  };

  const handlePreviewClick = () => {
    dispatch(
      setCurrentBlog({
        id: '0',
        title: watchedTitle,
        hashtags: watchedHashtags,
        coverImage,
        content: watchedContents,
        authorId: user?.id || '',
        authorName: user?.name || '',
        createdAt: new Date().toISOString(),
        isDraft: true,
        authorAvatar: user?.profileImage || '',
      })
    );
    setSwitchToPreview(true);
  };

  const onPublish = () => {
    dispatch(
      BlogActions.blogSave({
        id: blogDraft?.id || null,
        authorId: user?.id || '',
        authorName: user?.name || '',
        content: watchedContents,
        coverImage: coverImage || '',
        createdAt: new Date().toISOString(),
        hashtags: watchedHashtags,
        isDraft: false,
        title: watchedTitle,
      })
    );
  };

  const onSaveDraft = () => {
    if (!watchedContents || watchedContents.trim().length < 2) {
      setError('contents', {
        type: 'manual',
        message: 'Content must be at least 100 words',
      });
      dispatch(setErrorMessage('Content must be at least 100 words for publishing'));
      return;
    }

    dispatch(
      BlogActions.blogSave({
        id: blogDraft?.id || null,
        authorId: user?.id || '',
        authorName: user?.name || '',
        content: watchedContents,
        coverImage: coverImage || '',
        createdAt: new Date().toISOString(),
        hashtags: watchedHashtags,
        isDraft: true,
        title: watchedTitle,
      })
    );
  };

  const uploadImageToImgur = async (file: File): Promise<string | null> => {
    const apiKey = process.env.REACT_APP_IMGBB_API_KEY;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.success) return data.data.display_url;
      return null;
    } catch {
      return null;
    }
  };

  const onImagePaste = async (e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (const i in items) {
      const item = items[i];
      if (item.kind === 'file' && item.type.startsWith('image/')) {
        e.preventDefault();
        const file = item.getAsFile();
        if (!file) return;

        const url = await uploadImageToImgur(file);
        if (url) insertImageAtCursor(url);
      }
    }
  };

  const insertImageAtCursor = (url: string) => {
    const el = editorRef.current;
    const current = watchedContents || '';

    if (el) {
      const start = el.selectionStart ?? current.length;
      const end = el.selectionEnd ?? current.length;

      const markdown = `\n![image](${url})\n`;
      const updated = current.slice(0, start) + markdown + current.slice(end);

      setValue('contents', updated, { shouldValidate: true });

      requestAnimationFrame(() => {
        el.focus();
        const caret = start + markdown.length;
        el.setSelectionRange(caret, caret);
      });
    } else {
      setValue('contents', current + `\n![image](${url})\n`, {
        shouldValidate: true,
      });
    }
  };
  console.log('avatar in draft: ', blogDraft?.authorAvatar);

  return (
    <div>
      {switchToPreview ? (
        <PreviewBlog
          title={watchedTitle}
          content={watchedContents}
          hashtags={watchedHashtags}
          coverImage={coverImage}
          authorName={blogId ? blogDraft?.authorName || '' : user?.name || ''}
          createdAt={new Date()}
          onBackButtonClick={() => setSwitchToPreview(false)}
          userAvatar={blogId ? blogDraft?.authorAvatar || '' : user?.profileImage || ''}
        />
      ) : (
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: theme.palette.background.default,
            m: 3,
          }}
        >
          <>
            {isLoading && <LoadingOverlay />}
            <Box sx={{ width: '100%', maxWidth: 900, m: 3 }}>
              <Box
                tabIndex={0}
                role="button"
                sx={{
                  border: '1px dashed',
                  borderColor: theme.palette.grey[400],
                  borderRadius: 2,
                  height: 400,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  bgcolor: coverImage ? 'none' : theme.palette.background.paper,
                  backgroundImage: coverImage ? `url(${coverImage})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  color: coverImage ? 'transparent' : theme.palette.text.secondary,
                  mb: 3,
                }}
                onClick={() => setOpenDialog(true)}
              >
                {!coverImage && (
                  <div style={{ color: '#C4C4C4', display: 'flex' }}>
                    <ImageIcon /> Cover Image
                  </div>
                )}
              </Box>

              <InputBase
                placeholder="Blog Title"
                fullWidth
                {...register('title', { required: 'Title is required' })}
                sx={{
                  borderBottom: '1px solid',
                  borderColor: theme.palette.divider,
                  fontSize: 24,
                  fontWeight: 600,
                  mb: 3,
                }}
              />
              {errors.title && <span style={{ color: 'red' }}>{errors.title.message}</span>}

              <HashtagsInput control={control} name="hashtags" min={2} max={8} />

              <InputBase
                placeholder="Write your blog content in markdown..."
                multiline
                minRows={10}
                {...register('contents', {
                  validate: validateWordCount,
                })}
                onPaste={(e: ClipboardEvent) => onImagePaste(e)}
                inputRef={editorRef}
                fullWidth
                sx={{
                  fontFamily: 'monospace',
                  fontSize: 16,
                  p: 2,
                  mb: 3,
                  border: '1px solid',
                }}
              />
              {errors.contents && <span style={{ color: 'red' }}>{errors.contents.message}</span>}

              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button
                  variant="contained"
                  onClick={handlePreviewClick}
                  disabled={!watchedContents}
                >
                  Preview
                </Button>

                <Button
                  variant="contained"
                  onClick={onSaveDraft}
                  disabled={!(watchedTitle && watchedContents) || !isDirty}
                >
                  Save as Draft
                </Button>

                <Button
                  variant="contained"
                  onClick={handleSubmit(onPublish)}
                  disabled={!isValid || isDirty || !blogDraft?.isDraft}
                >
                  Publish
                </Button>
              </Stack>

              {/* TODO: SEPARATE COMPONENT FOR IMAGE PICKER */}
              <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                fullWidth
                maxWidth="lg"
              >
                <DialogTitle>Select Cover Image</DialogTitle>
                <DialogContent>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: 1,
                    }}
                  >
                    {unsplashImages?.map((img) => (
                      <Box
                        key={img.id}
                        component="img"
                        src={img.urls.small}
                        onClick={() => selectCoverImage(img.urls.regular)}
                        sx={{ width: '100%', height: 120, objectFit: 'cover', cursor: 'pointer' }}
                      />
                    ))}
                  </Box>
                </DialogContent>
              </Dialog>
            </Box>
          </>
          {unsplashError && (
            <Notification
              onClear={() => setUnsplashError(null)}
              alertMessage={unsplashError}
              type="error"
            />
          )}
          {blogSuccessMessage && (
            <Notification
              onClear={() => dispatch(setBlogSuccessMessage(null))}
              alertMessage={blogSuccessMessage}
              type="success"
            />
          )}
          {blogErrorMessage && (
            <Notification
              onClear={() => dispatch(setErrorMessage(null))}
              alertMessage={blogErrorMessage}
              type="error"
            />
          )}
        </Box>
      )}
    </div>
  );
};
