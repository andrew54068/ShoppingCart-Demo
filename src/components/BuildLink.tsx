import { useState } from 'react';
import Button from './Button';
import getTxData from 'src/utils/getTxData';
import getABI from 'src/utils/getABI';
import copy from 'copy-text-to-clipboard';
import getMethodData from 'src/utils/getMethodData';
import { InputGroup, InputRightElement, useToast, Button as ChakraButton, Flex, Tag, Heading, Input, VStack, Box, Text, Card } from '@chakra-ui/react';

const App: React.FC = () => {
  const [txHashes, setTxHashes] = useState<string[]>([
    '',
  ]);

  const toast = useToast()
  const [txDataWithMethodInfo, setTxDataWithMethodInfo] = useState<{
    to: string,
    data: string,
    method: string,
    params: any[]
    value: number
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

    const txResult = await getTxData([...txHashes])

    await Promise.all(
      txResult.map(async (txData) => {
        let newTxDataWithMethodData = {}

        if (txData) {
          const callData = txData.data
          const contractABI = await getABI(txData?.to);
          const methodData = getMethodData(contractABI, callData)

          newTxDataWithMethodData = {
            ...txData,
            ...methodData
          }
        }

        txDataWithMethodData.push(newTxDataWithMethodData)

      })
    )

    setTxDataWithMethodInfo(txDataWithMethodData)
    console.log('txDataWithMethodData :', txDataWithMethodData);
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
      spacing={3}
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
        <Input
          key={index}
          value={hash}
          onChange={(e) => handleChangeLink(index, e.target.value)}
          placeholder="Enter transaction hash here"
        />
      ))}
      <Flex gap="4px">
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
