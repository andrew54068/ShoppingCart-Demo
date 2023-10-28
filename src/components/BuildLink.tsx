import { useState } from 'react';
import Button from './Button';
import getTxInfo from 'src/utils/getTxInfo';
import getABI from 'src/utils/getABI';
import strip0x from 'src/utils/strip0x';
import copy from 'copy-text-to-clipboard';
import { ADDR_PLACEHOLDER } from 'src/constants';
import getMethodData from 'src/utils/getMethodData';
import { InputGroup, InputRightElement, useToast, Button as ChakraButton, Flex, Tag, Heading, Input, VStack, Box, Text, Card } from '@chakra-ui/react';

const generateReadableCallData = (methodData: any) => {
  return methodData.name
}

const App: React.FC = () => {
  const [txHashes, setTxHashes] = useState<string[]>([
    '',
  ]);

  const toast = useToast()
  const [txDataWithMethodInfo, setTxDataWithMethodInfo] = useState<{
    to: string,
    data: string,
    value: number,
    methodData: any,
    readableCallData: string,
  }[]>([])

  const handleAddLink = () => {
    setTxHashes((prev) => [...prev, '']);
  };

  const handleRemoveLastLink = () => {
    setTxHashes((prev) => {
      const updatedTxHashes = [...prev];
      updatedTxHashes.pop();
      return updatedTxHashes;
    });
  }

  const handleChangeLink = (index: number, value: string) => {
    setTxHashes((prev) => {
      const updatedHashes = [...prev];
      updatedHashes[index] = value;
      return updatedHashes;
    });
  };

  const onClickGenerate = async () => {
    const hasEmptyLink = txHashes.some((link) => link === '');
    if (hasEmptyLink) {
      // @todo show error
      return undefined
    }


    const txDataWithMethodData: any[] = []

    const txResult = await getTxInfo([...txHashes])

    console.log(`💥 txResult: ${JSON.stringify(txResult, null, '  ')}`);

    const chainId = 10

    const requests: any[] = []
    for (const txInfo of txResult) {
      const request = async (txInfo) => {
        let newTxDataWithMethodData = {}

        console.log(`💥 txInfo: ${JSON.stringify(txInfo, null, '  ')}`);

        const contract = txInfo?.to
        if (txInfo && txInfo.data && txInfo.data !== '0x' && contract) {
          const callData = txInfo.data
          const contractABI = await getABI(chainId, contract);
          console.log(`💥 callData: ${JSON.stringify(callData, null, '  ')}`);
          const methodData = await getMethodData(contractABI, chainId, contract, callData)

          console.log(`💥 methodData: ${JSON.stringify(methodData, null, '  ')}`);

          const readableCallData = generateReadableCallData(methodData)

          newTxDataWithMethodData = {
            ...txInfo,
            methodData,
            readableCallData
          }
        }

        txDataWithMethodData.push(newTxDataWithMethodData)
      }
      requests.push(request(txInfo))
    }
    await Promise.all(requests)

    const replacedTxAndMethodData = txDataWithMethodData.map(methodData => {
      const { data, from } = methodData
      let tempData = data

      if (tempData.includes(strip0x(from))) {
        // replace all from with ADDR_PLACEHOLDER
        tempData = tempData.replace(new RegExp(strip0x(from), 'g'), ADDR_PLACEHOLDER)
      }
      return { ...methodData, data: tempData }
    })

    setTxDataWithMethodInfo(replacedTxAndMethodData)
  }

  const handleCopy = () => {
    const shareUrl = window.location.host + "/view?txInfo=" + JSON.stringify(txDataWithMethodInfo)
    copy(shareUrl)
    toast({
      description: "Your link has been copied to clipboard.",
      status: 'success',
      duration: 3000,
      position: 'top'
    })
  }
  return (
    <VStack
      spacing="2"
      alignItems="flex-start"
      margin="0 auto"
      mt="75px"
      pt="50px"
      px="20px"
    >
      <Heading as="h2"  >
        Build Your Link
      </Heading>
      <Text fontSize="lg"  >
        Enter Transaction Hash
      </Text>
      {txHashes.map((hash, index) => (
        <>
          <Flex key={`flex ${index}`} alignItems='center' columnGap='10px' w="100%">
            <Input
              key={`input ${index}`}
              value={hash}
              onChange={(e) => handleChangeLink(index, e.target.value)}
              placeholder="Enter transaction hash here"
            />

          </Flex>
          {
            txDataWithMethodInfo.length > index &&
            <Tag key={`Text ${index}`} variant='outline' colorScheme="blue">
              {txDataWithMethodInfo[index].readableCallData}
            </Tag>
          }
        </>
      ))}
      <Flex gap="4px" w="100%" justifyContent="center">
        <Tag onClick={handleAddLink} cursor="pointer">+</Tag>
        <Tag onClick={handleRemoveLastLink} cursor="pointer">-</Tag>
      </Flex>
      <Card
        boxShadow='2xl'
        p="20px"
        w="100%"
        pos="fixed"
        bottom="0"
        left="0"
        right="0">
        <Text fontSize="size.heading.3" mb="20px">
          Your Link For Sharing
        </Text>


        <Box mb="20px">
          <InputGroup >
            <Input
              pr='4.5rem'

              value={txDataWithMethodInfo.length ? window.location.host + "/view?txInfo=" + JSON.stringify(txDataWithMethodInfo) : 'Your link will be shown here'}
              isReadOnly
            />
            <InputRightElement w="4.5rem">
              <ChakraButton h='1.75rem' size='sm' onClick={handleCopy}>
                Copy
              </ChakraButton>
            </InputRightElement>
          </InputGroup>
        </Box>
        <Button onClick={onClickGenerate}>Generate Link</Button>
        <Button colorScheme="twitter" variant="plain">post on Twitter</Button>
      </Card>
    </VStack>
  );
};

export default App;
