import { FileObject } from "../../types/Video";

export function onHandleRemoveFile(
    callBack: (name: string) => void,
    name: string,
){
    callBack(name);
}