import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import theme from "./theme";
import { ChakraProvider, Box } from '@chakra-ui/react';
import './App.css';
import { web3 } from './services/evm'
import Navbar from './components/Navbar'
import View from './components/View'
import BuildLink from './components/BuildLink'
import NotFound from './components/NotFound'
import { GlobalProvider } from './context/globalContextProvider'


function App() {
  // const [count, setCount] = useState(0)

  useEffect(() => {
    async function getReceipt() {
      const txHash = '0xde462c6abadbb97f5fd94a84725380d8109ea92498a314290ff92824d00bfd38'
      const txResult = await web3.eth.getTransaction(txHash);
      console.log('txResult :', txResult);
    }

    getReceipt()

  }, [])
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
