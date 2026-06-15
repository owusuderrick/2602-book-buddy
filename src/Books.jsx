import { Link } from "react-router";
import { useState, useEffect } from "react";
import useQuery from "./api/useQuery";

export default function Books() {
  const { data: books, loading, error } = useQuery("/books", "books");

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  console.log(filteredBooks);
  const updateSearchTerm = (formData) => {
    const term = formData.get("search");

    setFilteredBooks(
      books.filter((book) =>
        (book.title + book.author).toLowerCase().includes(term.toLowerCase()),
      ),
    );
    setSearchTerm(term);
  };
  useEffect(() => {
    setFilteredBooks(
      books?.filter((book) =>
        (book.title + book.author)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      ),
    );
  }, [books]);
  if (loading || !books) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;

  return (
    <>
      <h1>Catalog</h1>
      <form action={updateSearchTerm}>
        <input type="text" name="search" aria-label="search" />
        <button>Search</button>
      </form>
      <ul>
        {filteredBooks?.map((book) => {
          return <Book book={book} key={book.id} />;
        })}
      </ul>
    </>
  );
}

function Book({ book }) {
  return (
    <li>
      <img src={book.coverimage} alt={book.title} />
      <Link to={`/books/${book.id}`}>
        <h2>{book.title}</h2>
      </Link>
      <p>{book.author}</p>
      <p>{book.description}</p>
    </li>
  );
}
