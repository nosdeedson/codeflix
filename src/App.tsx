import { Box, Typography } from '@mui/material';
import { Route, Routes } from "react-router-dom";
import './App.css';
import { Layout } from './components/Layout';
import { CastMemberCreate } from './features/cast/CastMemberCreate';
import { CastMemberEdit } from './features/cast/CastMemberEdit';
import { CastMemberList } from './features/cast/CastMemberList';
import { CategoryCreate } from './features/categories/CategoryCreate';
import { CategoryEdit } from './features/categories/CategoryEdit';
import { CategoryList } from './features/categories/CategoryList';
import { GenreCreate } from './features/genre/GenreCreate';
import { GenreEdit } from './features/genre/GenreEdit';
import { GenreList } from './features/genre/GenreList';
import { VideoCreate } from './features/video/VideoCreate';
import { VideoEdit } from './features/video/VideoEdit';
import { VideoList } from './features/video/VideoList';

import "./App.css";
import { UploadList } from './features/uploads/UploadList';
import { Login } from './components/Login';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {

  const uploads = [
          {name: 'upload 1', progress: 10},
          {name: 'upload 2', progress: 10},
          {name: 'upload 3', progress: 10},
          {name: 'upload 4', progress: 10}
        ];

  return (
    <Layout>
      <Routes>
        {/* Login */}
        <Route path='/login' element={<Login />}></Route>
        
        {/*categories */}
        <Route path='/' element={<ProtectedRoute> <CategoryList /> </ProtectedRoute>}></Route>
        <Route path='categories' element={ <ProtectedRoute> <CategoryList /> </ProtectedRoute>}></Route>
        <Route path='categories/create' element={ <ProtectedRoute> <CategoryCreate /> </ProtectedRoute>}></Route>
        <Route path='categories/edit/:id' element={ <ProtectedRoute> <CategoryEdit /> </ProtectedRoute>}></Route>

        {/*cast members */}
        <Route path='cast-members' element={ <ProtectedRoute> <CastMemberList /> </ProtectedRoute>}></Route>
        <Route path='cast-members/create' element={ <ProtectedRoute> <CastMemberCreate /> </ProtectedRoute>}></Route>
        <Route path='cast-members/edit/:id' element={ <ProtectedRoute> <CastMemberEdit /> </ProtectedRoute>}></Route>

        {/* Genres */}
        <Route path='genres' element={ <ProtectedRoute> <GenreList /> </ProtectedRoute>}></Route>
        <Route path='genres/create' element={ <ProtectedRoute> <GenreCreate /> </ProtectedRoute>}></Route>
        <Route path='genres/edit/:id' element={ <ProtectedRoute> <GenreEdit /> </ProtectedRoute>}></Route>

        {/* Videos */}
        <Route path='videos' element={ <ProtectedRoute> <VideoList /> </ProtectedRoute>}></Route>
        <Route path='videos/create' element={ <ProtectedRoute> <VideoCreate /> </ProtectedRoute>}></Route>
        <Route path='Videos/edit/:id' element={ <ProtectedRoute> <VideoEdit /> </ProtectedRoute>}></Route>


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
      <UploadList/>
    </Layout>

  )
}

    export default App;
