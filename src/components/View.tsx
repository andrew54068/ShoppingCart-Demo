import React, { useEffect, useState } from 'react';
import { AccordionPanel, AccordionIcon, Accordion, AccordionItem, AccordionButton, Flex, Box, VStack, Text } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import Button from 'src/components/Button'
import queryString from 'query-string';
import { bloctoSDK } from 'src/services/evm';
import strip0x from 'src/utils/strip0x';
import toHex from 'src/utils/toHex';
import { useEthereum } from "src/services/evm";
import WalletIcon from 'src/assets/wallet.svg?react';

import { ADDR_PLACEHOLDER } from 'src/constants';

interface TxParameter {
  name: string;
  value: string;
}

interface TransactionInfo {
  data: string;
  to: string;
  value: string;
  name: string;
  methodData: {
    name: string;
    parameters: {
      name: string;
      value: string;
    }[];
  }
  parameters: TxParameter[];
}

const ViewTransaction: React.FC = () => {
  const location = useLocation();
  const { account, connect } = useEthereum();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [displayTxInfo, setDisplayTxInfo] = useState<TransactionInfo[]>([]);


  useEffect(() => {
    const parsed = queryString.parse(location.search);
    const txInfo: TransactionInfo[] = JSON.parse(parsed.txInfo as string || '[]');
    if (!account) return
    // replace all ADDR_PLACEHOLDER with the address of the user
    const transformedTxInfo = txInfo.map((tx) => {
      const tempTx = tx.data.replace(new RegExp(`${ADDR_PLACEHOLDER}`, 'g'), strip0x(account));
      return {
        ...tx,
        data: tempTx
      }
    })
    setDisplayTxInfo(transformedTxInfo)
  }, [account, location.search])



  const onClickSendTx = async () => {

    setIsLoading(true)

    const batchTransactions = displayTxInfo.map((tx) => {
      return {
        from: account,
        to: tx.to,
        data: tx.data,
        value: tx.value ? `0x${toHex(Number(tx.value))}` : '0x0'
      }
    })

    try {
      await bloctoSDK.ethereum.request({
        method: "blocto_sendBatchTransaction",
        params: batchTransactions,
      });

    } catch (err) {
      console.error(err)
    }
    setIsLoading(false)
  }

  return (
    <Box p="20px" mt="75px" mb="75px">
      <Text fontSize="xl" mb={5}>View Your Transaction</Text>

      {
        account ? <Accordion defaultIndex={[0]} allowMultiple>
          {
            displayTxInfo.map((tx, index) => (
              <VStack key={index} align="start" spacing={3} mb={4}
                borderRadius="12px"
                boxShadow="0px 0px 20px 0px rgba(35, 37, 40, 0.05);"
              >

                <AccordionItem border={0} width="100%">
                  <h2>
                    <AccordionButton p="space.l" >
                      <Box as="span" flex='1' textAlign='left' fontSize="size.heading.5" fontWeight="600" >
                        {tx?.methodData.name ? `Possible Intent: ${tx?.methodData.name}` : 'Transaction - ' + index}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Text wordBreak="break-all" textAlign="start" mb="space.s">
                      <Box as="span" fontWeight="bold"> Data: </Box>
                      {tx.data}
                    </Text>
                    <Flex>
                      <Text fontWeight="bold">
                        To:
                      </Text>
                      <Box as="span" ml="4px" wordBreak="break-all">
                        {tx.to}
                      </Box>
                    </Flex>

                    {tx?.methodData.parameters && tx?.methodData?.parameters?.map((param, pIndex) => (
                      <Flex key={pIndex}>
                        <Text fontWeight="bold">
                          {param.name}
                        </Text>
                        <Box as="span"> : </Box>
                        <Text ml="4px"> {param.value}</Text>
                      </Flex>
                    ))}
                  </AccordionPanel>
                </AccordionItem>
              </VStack>

            ))
          }
        </Accordion> : <Flex direction="column" alignItems="center" h="calc(100vh - 75px)" mt="80px">
          <WalletIcon width="72px" height="72px" />
          <Text mt="space.s" mb="space.3xl" textAlign="center">You need to connect your wallet to view your transaction.</Text>
          <Button w="100%" onClick={connect} variant="support">Connect Wallet</Button>
        </Flex>
      }

      <Box pos="fixed" bottom="0" left="0" right="0" bg="white" p="20px" boxShadow="2xl">
        <Button onClick={onClickSendTx} isDisabled={!account} isLoading={isLoading}>Send Tx</Button>
      </Box>
    </Box >
  );
};

export default ViewTransaction;
