
import { web3 } from 'src/services/evm';

export default async function getTxInfo(txHashes: string[]):
  Promise<{ data: string | undefined; to: string | null | undefined; value: string; }[]> {
  const results = await Promise.all(
    txHashes.map(async txHash => {
      const txResult = await web3.eth.getTransaction(txHash);
      console.log('txResult :', txResult);
      return {
        data: txResult.data,
        to: txResult.to,
        value: `${Number(txResult.value)}`
      };
    })
  );

  return results;
}