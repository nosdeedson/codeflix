import { IconButton, TextField } from "@mui/material";
import { useRef, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import FileIcon from "@mui/icons-material/FileCopy";

interface Props {
    onAdd: (files: File) => void;
    onRemove: (files: File) => void;
    placeholder?: string;
    "data-testid"?: string; 
}

export const InputFile: React.FC<Props> = ({
    onAdd,
    onRemove,
    placeholder,
    "data-testid": dataTestId= "input-file"
}: Props) => {
    const [selectedFiles, setSelectedFiles] = useState<File>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    return(
        <>
        <TextField
            sx={{pb: 1}}
            type='text'
            placeholder={placeholder || "Select file"}
            value={""}
            InputProps={{
                readOnly: true,
                endAdornment: selectedFiles ? (
                    <IconButton>
                        <DeleteIcon/>
                    </IconButton>
                ) : (
                    <IconButton>
                        <FileIcon/>
                    </IconButton>
                )
            }}
        />
        <input
            accept="*"
            type="file"
            ref={fileInputRef}
            multiple={false}
            style={{display: 'none'}}
        />
        </>
    )
}