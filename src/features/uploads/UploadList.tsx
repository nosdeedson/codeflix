

import { Accordion, AccordionDetails, AccordionSummary, Box, List, ListItem, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import zIndex from '@mui/material/styles/zIndex';
import LinearWithValueLabel from '../../components/ProgressBar';
import { useAppSelector } from '../../app/hooks';
import { selectUploads } from './UploadSlice';

type Upload = {
  name: string;
  progress: number;
};

type Props = {
  uploads?: Upload[];
};


export const UploadList = ({uploads}: Props) => {

    const uploadList = useAppSelector(selectUploads);

    if(!uploadList || uploadList?.length === 0){
        return null;
    }

    return (
        <Box
            right={1}
            bottom={1}
            position='fixed'
            zIndex={9}
            sx={{
                backgroundColor: 'whitesmoke',
                "@media (min-width: 600px)":{
                    width: 300
                }
            }}
        >
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="upload-content"
                >
                    Upload Progress
                </AccordionSummary>
                <AccordionDetails>
                    <List>
                        {
                            uploadList.map((upload, index) => (
                                <Box key={index}>
                                <ListItem key={index}>
                                    <Typography>
                                        {upload.field}
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <LinearWithValueLabel key={upload.id} value={upload.progress}></LinearWithValueLabel>
                                </ListItem>
                                </Box>
                            ))
                        }
                    </List>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}
