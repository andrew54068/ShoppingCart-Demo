import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import theme from "./theme";
import { ChakraProvider, Box } from '@chakra-ui/react';
import './App.css';
import Navbar from './components/Navbar'
import View from './components/View'
import BuildLink from './components/BuildLink'
import NotFound from './components/NotFound'
import { GlobalProvider } from './context/globalContextProvider'


function App() {
  return (
    <GlobalProvider>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Box margin="0 auto" width="100%">
            <Navbar />
            <Box margin="0 auto" maxW="560px" minH="100vh">

              <Routes>
                <Route path="/build-link" element={<BuildLink />} />
                <Route path="/view" element={<View />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Box>
          </Box>
        </BrowserRouter>
      </ChakraProvider>
    </GlobalProvider >
  )
}

export default App
