import { Box, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useHandleSnackbar } from '../../hooks/handleSnackbar/useHandleSnackBarStatus';
import { FileObject, Video } from '../../types/Video';
import { mapToVideoPayload } from '../genre/util';
import { VideoForm } from './components/VideoForm';
import { initialState as initialVideoState, useCreateVideoMutation, useGetAllCastMembersQuery, useGetAllCategoriesQuery, useGetAllGenresQuery } from './VideoSlice';

export const VideoCreate = () => {
  const [createVideo, videoCreateStatus] = useCreateVideoMutation();
  const {data: categories} = useGetAllCategoriesQuery();
  const {data: genres} = useGetAllGenresQuery();
  const {data: castMembers} = useGetAllCastMembersQuery();
  const [videoState, setVideoState] = useState<Video>(initialVideoState);
  const [selectedFiles, setSelectedFiles] = useState<FileObject[]>([]);

  console.log(selectedFiles)

  useHandleSnackbar(
    videoCreateStatus,
    {
      successMessage: 'Video created successfully',
      errorMessage: 'Error while creating video'
    }
  );

  async function handleSubimt(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const payload = mapToVideoPayload(videoState);
    await createVideo(payload);
    setVideoState(initialVideoState)
  }

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    const {name, value} = e.target;
    setVideoState({...videoState, [name]: value})
  }

  async function handleAddFile({name, file}: FileObject){
    setSelectedFiles([...selectedFiles, {name, file}]);
  }

  async function handleRemoveFile(name: string){
    setSelectedFiles(selectedFiles.filter(it => it.name !== name))
  }

  return (
    <Box >
      <Paper>
        <Box p={2}>
            <Typography variant='h5'>
              Create Video
            </Typography>
        </Box>
        <VideoForm
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
