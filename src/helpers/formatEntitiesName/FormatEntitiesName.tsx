import { Chip, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { CastMember } from "../../types/CastMember";
import { Category } from "../../types/Category";
import { Genre } from "../../types/Genre";


export function FormatEntitiesName(
    row: GridRenderCellParams
){

    const list = row.value as Category[] | Genre[] | CastMember[]; 
    const twoFirstItems = list.slice(0, 2);
    const remainingItems = list.length - twoFirstItems.length;
    return (
        <Box
            sx={{
                    overflowX: 'hidden',
                    '&:hover': {
                        overflowX: 'auto'
                    },
                    scrollbarWidth: 'thin'
                }}
        >
            {
                twoFirstItems?.map((it, index) => (
                    <Chip
                        key={index}
                        label={it.name}
                        sx={{
                            fontSize: '0.6rem',
                            marginRight: 1
                        }}
                    />                  
                ) )
            }
            {
                remainingItems > 0 && (
                    <Tooltip title={list.map(it => it.name).join(', ')}>
                            <Chip
                                label={`+${remainingItems}`}
                                sx={{
                                    fontSize: '0.6rem',
                                    marginRight: 1
                                }}
                            />
                    </Tooltip>
                )
            }
        </Box>
    )
}