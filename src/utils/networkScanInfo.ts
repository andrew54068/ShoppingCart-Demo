export type NetworkScanInfo = {
    chainID: number,
    name: string,
    api: string
}

const networkScanInfo: NetworkScanInfo[] = [
    {
      chainID: 1,
      name: "Ethereum Mainnet",
      api: `https://api.etherscan.io/api?module=contract&action=getabi&apikey=${import.meta.env.VITE_ETHERSCAN_API_KEY}`,
    },
    {
      chainID: 42161,
      name: "Arbitrum One",
      api: `https://api.arbiscan.io/api?module=contract&action=getabi&apikey=${import.meta.env.VITE_ARBISCAN_API_KEY}`,
    },
    {
      chainID: 43114,
      name: "Avalanche",
      api: `https://api.snowtrace.io/api?module=contract&action=getabi&apikey=${import.meta.env.VITE_SNOWTRACE_API_KEY}`,
    },
    {
      chainID: 56,
      name: "Binance Smart Chain",
      api: `https://api.bscscan.com/api?module=contract&action=getabi&apikey=${import.meta.env.VITE_BSCSCAN_API_KEY}`,
    },
    {
      chainID: 250,
      name: "Fantom Opera",
      api: `https://api.ftmscan.com/api?module=contract&action=getabi&apikey=${import.meta.env.VITE_FTMSCAN_API_KEY}`,
    },
    {
      chainID: 10,
      name: "Optimism",
      api: `https://api-optimistic.etherscan.io/api?module=contract&action=getabi&apikey=${import.meta.env.VITE_OPTIMISM_API_KEY}`,
    },
    {
      chainID: 137,
      name: "Polygon",
      api: `https://api.polygonscan.com/api?module=contract&action=getabi&apikey=${import.meta.env.VITE_POLYGONSCAN_API_KEY}`,
    },
  
    {
      chainID: 42,
      name: "Kovan Testnet",
      api: `https://api.etherscan.io/api?module=contract&action=getabi&apikey=${import.meta.env.VITE_ETHERSCAN_API_KEY}`,
    },
    {
      chainID: 4,
      name: "Rinkeby Testnet",
      api: `https://api.etherscan.io/api?module=contract&action=getabi&apikey=${import.meta.env.VITE_ETHERSCAN_API_KEY}`,
    },
    {
      chainID: 5,
      name: "Goerli Testnet",
      api: `https://api.etherscan.io/api?module=contract&action=getabi&apikey=${import.meta.env.VITE_ETHERSCAN_API_KEY}`,
    },
  ];

  export const getNetworkScanInfo = (chainID: number): NetworkScanInfo | null => {
    return networkScanInfo.find(value => value.chainID === chainID) || null
  }
  
  export default networkScanInfo;
  