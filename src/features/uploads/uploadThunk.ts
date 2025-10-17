import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUploadProgress, UploadState } from './UploadSlice';
import { AxiosProgressEvent } from "axios";
import { uploadProgress, uploadService } from "./uploadAPI";

export const updateVideo = createAsyncThunk(
    "uploads/uploadVideo",
    async({videoId, id, file, field}: UploadState, thunkApi) => {
        const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
            const progress = uploadProgress(progressEvent);
            thunkApi.dispatch(setUploadProgress({id, progress}));
        }

        try {
            const params = {videoId, id, file, field, onUploadProgress};
            const response = await uploadService(params);
            return response;
        } catch (error) {
            if(error instanceof Error){
                return thunkApi.rejectWithValue({message: error.message});
            }
            return thunkApi.rejectWithValue({message: "An unknown error occurred"});
        }
    }
)