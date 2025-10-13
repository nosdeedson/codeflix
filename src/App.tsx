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

function App() {

  return (
    <Layout>
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
        <Route path='genres' element={<GenreList />}></Route>
        <Route path='genres/create' element={<GenreCreate />}></Route>
        <Route path='genres/edit/:id' element={<GenreEdit />}></Route>

        {/* Videos */}
        <Route path='videos' element={<VideoList />}></Route>
        <Route path='videos/create' element={<VideoCreate />}></Route>
        <Route path='Videos/edit/:id' element={<VideoEdit />}></Route>


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

  )
}

    export default App;
