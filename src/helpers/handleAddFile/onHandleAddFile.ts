import { FileObject } from "../../types/Video";


export function onHandleAddFile(
    callBack: ({name, file}: FileObject) => void, 
    file: File, 
    name: string
){
    callBack({name: name, file});
}
