import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { web3 } from './services/evm'
import { GlobalProvider } from './context/globalContextProvider'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    async function getReceipt() {
      const txHash = '0x0423964817241263999417cbbdd439d58907772b6c44a6e42115093757aa5545'
      const txResult = await web3.eth.getTransactionReceipt(txHash);
      console.log('txResult :', txResult);
    }

    getReceipt()

  }, [])
  return (
    <GlobalProvider>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </GlobalProvider>
  )
}

export default App
