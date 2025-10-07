import { useSnackbar } from "notistack";
import { useEffect } from "react";

interface MutationStatus {
    isSuccess: boolean,
    isError: boolean
}

interface SnackbarStatusOption {
    successMessage: string;
    errorMessage: string;
}

/**
 * custom hook to show snackbar message
 * using useEffect
 * @param status 
 * @param param1 
 */
export function useHandleSnackbar(
    status: MutationStatus,
    {successMessage, errorMessage}: SnackbarStatusOption
){

    const {enqueueSnackbar} = useSnackbar();
    useEffect(() => {
        if(status.isSuccess){
            enqueueSnackbar(successMessage, {variant: 'success'})
        }else if(status.isError){
            enqueueSnackbar(errorMessage, {variant: 'error'})
        }
    }, [status, enqueueSnackbar, successMessage, errorMessage])
}