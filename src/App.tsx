import './App.css';
import { Box, createTheme, ThemeProvider, Typography } from '@mui/material';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { appTheme } from './app/config/theme';
import {Route, Routes, Link} from "react-router-dom"
import { CategoryList } from './features/categories/CategoryList';
import { CategoryCreate } from './features/categories/CategoryCreate';
import { CategoryEdit } from './features/categories/CategoryEdit';

function App() {
  return (<ThemeProvider theme={appTheme}>
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
          <Route path='/' element={<CategoryList/>}></Route>
          <Route path='categories' element={<CategoryList/>}></Route>
          <Route path='categories/create' element={<CategoryCreate/>}></Route>
          <Route path='categories/edit/:id' element={<CategoryEdit/>}></Route>
          <Route path='*'
            element={
              <Box sx={{color: 'white'}}>
                <Typography variant='h1'>404</Typography>
                <Typography variant='h1'>not found</Typography>
              </Box>
            }
          ></Route>
          <Route></Route>
        </Routes>
      </Layout>
    </Box>
  </ThemeProvider>
  )
}

export default App;
