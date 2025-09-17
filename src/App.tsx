import './App.css';
import { Box, ThemeProvider, Typography } from '@mui/material';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { appTheme } from './app/config/theme';
import { Route, Routes } from "react-router-dom"
import { CategoryList } from './features/categories/CategoryList';
import { CategoryCreate } from './features/categories/CategoryCreate';
import { CategoryEdit } from './features/categories/CategoryEdit';
import { SnackbarProvider } from 'notistack'
import CastMemberList from './features/cast/CastMemberList';
import CastMemberCreate from './features/cast/CastMemberCreate';
import CastMemberEdit from './features/cast/CastMemberEdit';

function App() {
  return (<ThemeProvider theme={appTheme}>
    <SnackbarProvider 
    maxSnack={3}
    anchorOrigin={{
      horizontal: 'right',
      vertical: 'top'
    }}>
      <Box
        component="main"
        sx={{
          height: "100vh",
          backgroundColor: (theme) => theme.palette.grey[900]
        }}
      >
        <Header ></Header>
        <Layout >
          <Routes>
            <Route path='/' element={<CategoryList />}></Route>
            <Route path='categories' element={<CategoryList />}></Route>
            <Route path='categories/create' element={<CategoryCreate />}></Route>
            <Route path='categories/edit/:id' element={<CategoryEdit />}></Route>
            <Route path='cast-members' element={<CastMemberList />}></Route>
            <Route path='cast-members/create' element={<CastMemberCreate />}></Route>
            <Route path='cast-members/edit/:id' element={<CastMemberEdit />}></Route>
            <Route path='*'
              element={
                <Box sx={{ color: 'white' }}>
                  <Typography variant='h1'>404</Typography>
                  <Typography variant='h1'>not found</Typography>
                </Box>
              }
            ></Route>
            <Route></Route>
          </Routes>
        </Layout>
      </Box>
    </SnackbarProvider>
  </ThemeProvider>
  )
}

export default App;
