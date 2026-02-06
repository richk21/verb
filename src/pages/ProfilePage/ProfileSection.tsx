import SaveIcon from '@mui/icons-material/Save';
import { Box, Button, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { IUser } from '../../app/interface/user';
import { setAllBlogs, setAllBlogstotalCount } from '../../redux/blog/blogSlice';
import { UserActions } from '../../redux/user/userActions';
import { CoverImage } from './CoverImage';
import { ProfileImage } from './ProfileImage';

interface IProfileSectionProps {
  user: IUser | null;
}

export const ProfileSection = ({ user }: IProfileSectionProps) => {
  const dispatch = useDispatch(); /* 
  const user = useSelector(selectUser); */

  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const {
    register,
    setValue,
    watch,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      userName: '',
      userBio: '',
    },
  });

  const watchName = watch('userName');
  const watchBio = watch('userBio');

  const isImageChanged = profileImage !== user?.profileImage || coverImage !== user?.coverImage;

  const isFieldUpdated = isDirty || isImageChanged;
  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    file && setCoverImage(URL.createObjectURL(file));
  };
  const handleCoverFileSelected = (file: File) => {
    setCoverFile(file);
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    file && setProfileImage(URL.createObjectURL(file));
  };
  const handleProfileFileSelected = (file: File) => {
    setProfileFile(file);
  };

  useEffect(() => {
    if (user) {
      setValue('userName', user.name || '');
      setValue('userBio', user.bio || '');
      setProfileImage(user.profileImage || null);
      setCoverImage(user.coverImage || null);
    }
  }, [user, setValue]);

  useEffect(() => {
    return () => {
      dispatch(setAllBlogs({ blogs: [], page: 1 }));
      dispatch(setAllBlogstotalCount(0));
    };
  }, [dispatch]);

  const updateUserInfo = () => {
    const formData = new FormData();
    formData.append('userId', user?.id || '');
    formData.append('userName', watchName);
    formData.append('userBio', watchBio);
    if (coverFile) formData.append('userCoverImage', coverFile);
    if (profileFile) formData.append('userProfileImage', profileFile);
    dispatch(UserActions.UpdateUserInfo(formData));
  };
  useEffect(() => {
    if (user) {
      reset({
        userName: user.name || '',
        userBio: user.bio || '',
      });

      // clear file objects
      setCoverFile(user.coverImage ? null : coverFile);
      setProfileFile(user.profileImage ? null : profileFile);
    }
  }, [user]);
  const coverSection = useMemo(
    () => (
      <CoverImage
        coverImage={coverImage}
        handleImageChange={handleCoverChange}
        onFileSelected={handleCoverFileSelected}
      />
    ),
    [coverImage]
  );

  const profileSection = useMemo(
    () => (
      <ProfileImage
        profileImage={profileImage}
        handleImageChange={handleProfileChange}
        onFileSelected={handleProfileFileSelected}
      />
    ),
    [profileImage]
  );

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 6, mb: 6 }}>
      {coverSection}
      {profileSection}

      <Box sx={{ px: 2, mb: 4 }}>
        <TextField
          label="Name"
          fullWidth
          value={watchName}
          sx={{ mb: 3 }}
          {...register('userName')}
        />
        <TextField
          label="Bio"
          fullWidth
          multiline
          minRows={4}
          value={watchBio}
          {...register('userBio')}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
        <Button
          variant="contained"
          onClick={updateUserInfo}
          startIcon={<SaveIcon />}
          disabled={!isFieldUpdated}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};
