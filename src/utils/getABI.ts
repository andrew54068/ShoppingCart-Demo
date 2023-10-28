// import { web3 } from 'src/services/evm';
import axios from 'axios';

async function getABI(contractAddress?: string | null) {
  if (!contractAddress) return ''
  const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHER_SCAN_API_KEY;
  const url = `https://api-optimistic.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${ETHERSCAN_API_KEY}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.status === '1' && data.message === 'OK') {
      const abi = JSON.parse(data.result);
      return abi;
    } else {
      throw new Error(data.result);
    }
  } catch (error) {
    console.error('Error fetching ABI:', error);
    return null;
  }
}


export default getABI;