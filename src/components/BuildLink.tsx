import { useState } from 'react';
import Button from './Button';
import { Flex, Tag, Heading, Input, VStack, Box, Text, Card } from '@chakra-ui/react';

const App: React.FC = () => {
  const [links, setLinks] = useState<string[]>([
    '',
  ]);

  const handleAddLink = () => {
    setLinks((prev) => [...prev, '']);
  };

  const handleRemoveLastLink = () => {
    setLinks((prev) => {
      const updatedLinks = [...prev];
      updatedLinks.pop();
      return updatedLinks;
    });
  }

  const handleChangeLink = (index: number, value: string) => {
    setLinks((prev) => {
      const updatedLinks = [...prev];
      updatedLinks[index] = value;
      return updatedLinks;
    });
  };

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
          <Input
            placeholder='Your link will be shown here'
            isReadOnly
          />
        </Box>
        <Button >Generate Link</Button>
        <Button colorScheme="twitter" variant="plain">post on Twitter</Button>
      </Card>
    </VStack>
  );
};

export default App;
