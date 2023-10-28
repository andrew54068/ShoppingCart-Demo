import React from 'react';
import { Flex, Box, VStack, Text, Divider } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import Button from 'src/components/Button'
import queryString from 'query-string';

interface TxParameter {
  name: string;
  value: string;
}

interface TransactionInfo {
  data: string;
  to: string;
  value: string;
  name: string;
  parameters: TxParameter[];
}

const ViewTransaction: React.FC = () => {
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  const txInfo: TransactionInfo[] = JSON.parse(parsed.txInfo as string || '[]');
  console.log('txInfo :', txInfo);

  const onClickSendTx = () => { }
  return (
    <Box p="20px" mt="75px">
      <Text fontSize="xl" mb={5}>View Your Transaction</Text>
      {txInfo.map((tx, index) => (
        <VStack key={index} align="start" spacing={3} borderWidth="1px" borderRadius="md" p={4} mb={4} >
          <Text style={{ wordBreak: 'break-all' }} textAlign="start">
            <Box as="span" fontWeight="bold"> Data: </Box>
            {tx.data}
          </Text>

          <Flex>
            <Text fontWeight="bold">
              To:
            </Text>
            <Box as="span" ml="4px">
              {tx.to}
            </Box>
          </Flex>
          <Divider />
          <Flex>
            <Text fontWeight="bold">
              Method:
            </Text>
            <Box as="span" ml="4px">
              {tx.name}
            </Box>
          </Flex>

          {tx.parameters.map((param, pIndex) => (
            <Flex key={pIndex}>
              <Text fontWeight="bold">
                {param.name}
              </Text>
              <Box as="span"> : </Box>
              <Text ml="4px"> {param.value}</Text>
            </Flex>
          ))}
        </VStack>
      ))}

      <Box pos="fixed" bottom="0" left="0" right="0" bg="white" p="20px" boxShadow="2xl">
        <Button colorScheme="blue" onClick={onClickSendTx}>Send Tx</Button>
      </Box>
    </Box>
  );
};

export default ViewTransaction;
