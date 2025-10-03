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
import { CastMemberList } from './features/cast/CastMemberList';
import { CastMemberCreate } from './features/cast/CastMemberCreate';
import { CastMemberEdit } from './features/cast/CastMemberEdit';
import { GenreList } from './features/genre/GenreList';
import { GenreEdit } from './features/genre/GenreEdit';
import { GenreCreate } from './features/genre/GenreCreate';

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

            {/*categories */}
            <Route path='/' element={<CategoryList />}></Route>
            <Route path='categories' element={<CategoryList />}></Route>
            <Route path='categories/create' element={<CategoryCreate />}></Route>
            <Route path='categories/edit/:id' element={<CategoryEdit />}></Route>

            {/*cast members */}
            <Route path='cast-members' element={<CastMemberList />}></Route>
            <Route path='cast-members/create' element={<CastMemberCreate />}></Route>
            <Route path='cast-members/edit/:id' element={<CastMemberEdit />}></Route>
            
            {/* Genres */}
            <Route path='genres' element={<GenreList/>}></Route>
            <Route path='genres/create' element={<GenreCreate/>}></Route>
            <Route path='genres/edit/:id' element={<GenreEdit/>}></Route>

            {/* 404 */}
            <Route path='*'
              element={
                <Box sx={{ color: 'white' }}>
                  <Typography variant='h1'>404</Typography>
                  <Typography variant='h1'>not found</Typography>
                </Box>
              }
            ></Route>

          </Routes>
        </Layout>
      </Box>
    </SnackbarProvider>
  </ThemeProvider>
  )
}

export default App;
