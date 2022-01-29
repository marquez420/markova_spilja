import { Box, Button, Flex, Grid, Input, SimpleGrid } from "@chakra-ui/react";
import { readFile } from "fs/promises";
import { GetStaticProps, NextPage } from "next";
import { useState } from "react";
import { Book } from "../components/Book";
import { Book as BookType } from "../types";

const Home: NextPage<{
  initialBooks: BookType[];
}> = ({ initialBooks }) => {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState(initialBooks);

  const searchBooks = () => {
    const regex = new RegExp(search, "gi");
    setBooks(initialBooks.filter((book) => regex.test(book.title)));
  };

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <Box>
      <Flex padding={5}>
        <Flex maxWidth={350} marginX="auto">
          <Input
            value={search}
            placeholder="Search books by title"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
          <Button
            onClick={searchBooks}
            marginLeft={5}
            color="white"
            backgroundColor="red.500"
            _hover={{
              color: "black",
              background: "white",
            }}
          >
            search
          </Button>
          {search.length > 0 && (
            <Button onClick={clearSearch} marginLeft={5}>
              clear
            </Button>
          )}
        </Flex>
      </Flex>
      <SimpleGrid columns={3} spacing={10} placeItems="center">
        {books.map((book) => {
          return <Book key={book.id} book={book} />;
        })}
      </SimpleGrid>
    </Box>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const file = await readFile("books.json", "utf8");
  const books: BookType[] = JSON.parse(file);

  return { props: { initialBooks: books } };
};
