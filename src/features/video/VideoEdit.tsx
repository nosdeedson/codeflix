import { Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHandleSnackbar } from '../../hooks/handleSnackbar/useHandleSnackBarStatus'
import { Video } from '../../types/Video'
import { mapToVideoPayload } from '../genre/util'
import { VideoForm } from './components/VideoForm'
import { initialState as initialVideoState, useGetAllCastMembersQuery, useGetAllCategoriesQuery, useGetAllGenresQuery, useGetVideoQuery, useUpdateVideoMutation } from './VideoSlice'

export const VideoEdit = ( ) => {

  const id = useParams().id || "";
  const {data: video} = useGetVideoQuery({id});
  const [updateVideo, videoUpdateStatus] = useUpdateVideoMutation();
  const {data: categories} = useGetAllCategoriesQuery();
  const {data: genres} = useGetAllGenresQuery();
  const {data: castMembers} = useGetAllCastMembersQuery();
  const [videoState, setVideoState] = useState<Video>(initialVideoState);

  useHandleSnackbar(
    videoUpdateStatus,
    {
      successMessage: 'Video updated successfully',
      errorMessage: 'Error while updating video'
    }
  );

  async function handleSubimt(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const payload = mapToVideoPayload(videoState);
    await updateVideo(payload);
    setVideoState(videoState);
  }

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    const {name, value} = e.target;
    setVideoState({...videoState, [name]: value})
  }

  useEffect(() =>{
    if(video){
      setVideoState(video.data);
    }
  }, [video]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Typography variant='h5'>
            Edit Video
          </Typography>
          <VideoForm
          categories={categories?.data || []}
          genres={genres?.data || []}
          castMembers={castMembers?.data || []}
          video={videoState}
          isDisabled={videoUpdateStatus.isLoading}
          isLoading={videoUpdateStatus.isLoading}
          handleSubmit={handleSubimt}
          handleChange={handleChange}
          />
        </Box>
      </Paper>
    </Box>
  )
}
