import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import './App.css';
// import { web3 } from './services/evm'
import Header from './components/Header'
import View from './components/View'
import BuildLink from './components/BuildLink'
import NotFound from './components/NotFound'
import { GlobalProvider } from './context/globalContextProvider'


function App() {
  // const [count, setCount] = useState(0)

  useEffect(() => {
    // async function getReceipt() {
    //   const txHash = '0x0423964817241263999417cbbdd439d58907772b6c44a6e42115093757aa5545'
    //   const txResult = await web3.eth.getTransaction(txHash);
    //   console.log('txResult :', txResult);
    // }

    // getReceipt()

  }, [])
  return (
    <GlobalProvider>
      <ChakraProvider>
        <BrowserRouter>
          <Box margin="0 auto" width="100%">
            <Header />
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
