import { Box, Container } from '@mui/material'
import React from 'react'

export function Layout({children}: {children : React.ReactNode}) {
  return (
    <Box  >
        <Container maxWidth='lg' sx={{py: 2}} >
            {children}
        </Container>
    </Box>
  )
}


