import { web3 } from 'src/services/evm';

export default function getMethodData(contractABI, callData?: string) {
  if (!callData) return ''
  // const contract = new web3.eth.Contract(contractABI);

  const functionSelector = callData.slice(0, 10);
  let functionAbi;
  for (const item of contractABI) {
    if (item.type === 'function' && functionSelector === web3.eth.abi.encodeFunctionSignature(item)) {
      functionAbi = item;
      break;
    }
  }


  if (functionAbi) {
    const decoded = web3.eth.abi.decodeParameters(functionAbi.inputs, callData.slice(10));

    const parameterNameValues: Array<object> = []

    for (const [index, input] of functionAbi.inputs.entries()) {
      // parameterNameValues.push(`${input.name}: ${decoded[index.toString()]}`)
      parameterNameValues.push(
        {
          name: input.name,
          value: `${decoded[index.toString()]}`
        }
      )
    }

    return {
      name: functionAbi.name,
      parameters: parameterNameValues
    }


  } else {
    console.error("Function ABI not found for selector:", functionSelector);
    return
  }
} 