import { Box, Paper, Typography } from '@mui/material';
import { nanoid } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useHandleSnackbar } from '../../hooks/handleSnackbar/useHandleSnackBarStatus';
import { FileObject, Video } from '../../types/Video';
import { mapToVideoPayload } from '../genre/util';
import { addUpload, cleanFinishedUploads, selectAllUploadsFinished } from '../uploads/UploadSlice';
import { VideoForm } from './components/VideoForm';
import { initialState as initialVideoState, useCreateVideoMutation, useGetAllCastMembersQuery, useGetAllCategoriesQuery, useGetAllGenresQuery } from './VideoSlice';

export const VideoCreate = () => {
  const [createVideo, videoCreateStatus] = useCreateVideoMutation();
  const { data: categories } = useGetAllCategoriesQuery();
  const { data: genres } = useGetAllGenresQuery();
  const { data: castMembers } = useGetAllCastMembersQuery();
  const [videoState, setVideoState] = useState<Video>(initialVideoState);
  const [selectedFiles, setSelectedFiles] = useState<FileObject[]>([]);
  const [resetKey, setResetKey] = useState(0);
  const allUploadsFinished = useAppSelector(selectAllUploadsFinished);

  const dispatch = useAppDispatch();

  useHandleSnackbar(
    videoCreateStatus,
    {
      successMessage: 'Video created successfully',
      errorMessage: 'Error while creating video'
    }
  );

  async function handleSubmitUploads(videoId: string) {
    selectedFiles.forEach(({ file, name }) => {
      const payload = { id: nanoid(), file, videoId, field: name };
      dispatch(addUpload(payload));
    });
  }

  async function handleSubimt(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload = mapToVideoPayload(videoState);
    try {
      const { data } = await createVideo(payload).unwrap();
      if(selectedFiles?.length > 0){
        await handleSubmitUploads(data.id);
      }
      setSelectedFiles([]);
      setVideoState(initialVideoState);
    } catch (error) {
      console.log(error);
    } finally {
      setResetKey(prev => prev + 1);
    }
  }

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setVideoState({ ...videoState, [name]: value })
  }

  async function handleAddFile({ name, file }: FileObject) {
    setSelectedFiles([...selectedFiles, { name, file }]);
  }

  async function handleRemoveFile(name: string) {
    setSelectedFiles(selectedFiles.filter(it => it.name !== name))
  }

  useEffect(() => {
    if(allUploadsFinished){
      dispatch(cleanFinishedUploads());
    }
  }, [allUploadsFinished, dispatch]);

  return (
    <Box >
      <Paper>
        <Box p={2}>
          <Typography variant='h5'>
            Create Video
          </Typography>
        </Box>
        <VideoForm
          key={resetKey}
          categories={categories?.data || []}
          genres={genres?.data || []}
          castMembers={castMembers?.data || []}
          video={videoState}
          isDisabled={videoCreateStatus.isLoading}
          isLoading={videoCreateStatus.isLoading}
          handleSubmit={handleSubimt}
          handleChange={handleChange}
          handleAddFile={handleAddFile}
          handleRemoveFile={handleRemoveFile}
        />
      </Paper>
    </Box>
  )
}
