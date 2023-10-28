import { useState } from 'react';
import { Button, Input, VStack, Box, Text } from '@chakra-ui/react';

const App: React.FC = () => {
  const [links, setLinks] = useState<string[]>([
    'https://arbiscan.io/tx/0x2ee9d4f3',
  ]);

  const handleAddLink = () => {
    setLinks((prev) => [...prev, '']);
  };

  const handleChangeLink = (index: number, value: string) => {
    setLinks((prev) => {
      const updatedLinks = [...prev];
      updatedLinks[index] = value;
      return updatedLinks;
    });
  };

  return (
    <VStack spacing={6} margin="auto" paddingTop="50px" px="40px">
      <Text fontSize="2xl" fontWeight="bold">
        Build Your Link
      </Text>
      <Text fontSize="lg" fontWeight="bold">
        Enter etherscan link
      </Text>
      {links.map((link, index) => (
        <Input
          key={index}
          value={link}
          onChange={(e) => handleChangeLink(index, e.target.value)}
          placeholder="Enter link here"
        />
      ))}
      <Button onClick={handleAddLink}>Add a tx link</Button>
      <Button colorScheme="blue">Generate Link</Button>
      <Box border="1px" borderColor="gray.300" padding="10px">
        <Input
          placeholder="https://cart.blocto.app/?cartid=012"
          isReadOnly
        />
      </Box>
      <Button colorScheme="twitter">post on Twitter</Button>
    </VStack>
  );
};

export default App;
