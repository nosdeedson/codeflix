import { Box, Button, colors, IconButton, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectCategories } from './categorySlice'
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, renderActionsCell } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';


export const CategoryList: any = () => {
    const categories = useAppSelector(selectCategories)
    const rows: GridRowsProp = categories.map((category) => ({
        id: category.id,
        name: category.name,
        description: category.description,
        isActive: category.is_active,
        createdAt: new Date(category.created_at).toLocaleDateString('pt-BR'),
    }))

    const columns: GridColDef[] = [
     
        { 
            field: 'name', 
            headerName: 'Name', 
            flex: 1 
        },
        { 
            field: 'description', 
            headerName: 'Description', 
            flex: 1 
        },
        { 
            field: 'isActive', 
            headerName: 'Active', 
            flex: 1,
            type: 'boolean',
            renderCell: renderIsActiveCel
        },
        { 
            field: 'createdAt', 
            headerName: 'Created', 
            flex: 1,
            type: 'date'
        },
        { 
            field: 'id', 
            headerName: 'Actions', 
            flex: 1,
            renderCell: renderActionsCell
        },
    ];

    function renderActionsCell(row: GridRenderCellParams){
        return(
            <IconButton
            color='secondary'
            onClick={() => console.log(row.id)}
        
            >
                <DeleteIcon/>
            </IconButton>
        );
    }

    function renderIsActiveCel(row: GridRenderCellParams){
        return (
            <Typography color={row.value ? "primary": 'secondary'}>
                {row.value ? "Active": "Inactive"}
            </Typography>
        );
    }

    return (
        <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box display='flex' justifyContent='flex-end'>
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/categories/create"
                    style={{ marginBottom: "1rem" }}
                >
                    New Category
                </Button>
            </Box>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid 
                rowsPerPageOptions={[2,10, 20, 25, 50, 100]}
                rows={rows} 
                columns={columns} />
            </div>

        </Box>
    )
}