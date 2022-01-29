import { Box, Flex, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Book as BookType } from "../types";

export const Book: FC<{
  book: BookType;
}> = ({ book }) => {
  const transformedYear = book.year.toString().includes("-")
    ? `${Math.abs(book.year)} BC`
    : `${book.year} AC`;

  return (
    <Box width={350} textAlign="center" p={5}>
      <Text fontSize="xl">{book.title}</Text>
      <Text color="gray.600" fontSize="sm" fontStyle="italic" mb={5}>
        {book.author}, {transformedYear}
      </Text>
      <Flex justify="space-around" mb={5}>
        <Box width={150}>
          <Text>Country: {book.country}</Text>
        </Box>
        <Box width={150}>
          <Text>Language: {book.language}</Text>
        </Box>
      </Flex>
      <Text>Number of pages: {book.pages}</Text>
    </Box>
  );
};
