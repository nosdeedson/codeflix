import { IconButton, TextField } from "@mui/material";
import { useRef, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import FileIcon from "@mui/icons-material/FileCopy";

interface Props {
    onAdd: (files: File) => void;
    onRemove: (files: File) => void;
    placeholder?: string;
    label: string;
    "data-testid"?: string;
}

export const InputFile: React.FC<Props> = ({
    onAdd,
    onRemove,
    placeholder,
    label,
    "data-testid": dataTestId = "input-file"
}: Props) => {
    const [selectedFiles, setSelectedFiles] = useState<File>();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : undefined;
        if(!file) return;
        setSelectedFiles(file);
        onAdd(file)
    };

    const handleClear = () => {
        setSelectedFiles(undefined);
        if(selectedFiles){
            onRemove(selectedFiles);
        }
    }

    const handleFileInput = () => {
        fileInputRef?.current?.click();
    }

    return (
        <>
            <TextField
                sx={{ pb: 1 }}
                type='text'
                placeholder={placeholder || "Select file"}
                label={label}
                value={selectedFiles?.name || ""}
                onChange={handleChange}
                InputProps={{
                    readOnly: true,
                    endAdornment: selectedFiles ? (
                        <IconButton
                            onClick={handleClear}
                        >
                            <DeleteIcon />
                        </IconButton>
                    ) : (
                        <IconButton
                            onClick={handleFileInput}
                        >
                            <FileIcon />
                        </IconButton>
                    )
                }}
            />
            <input
                accept="*"
                type="file"
                ref={fileInputRef}
                multiple={true}
                onChange={handleChange}
                style={{ display: 'none' }}
            />
        </>
    )
}