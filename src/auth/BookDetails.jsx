import { useNavigate, useParams } from "react-router";
import useQuery from "../api/useQuery";
import { useAuth } from "./AuthContext";
import useMutation from "../api/useMutation";

export default function BookDetails() {
  const { token } = useAuth();

  const { id } = useParams();
  const navigate = useNavigate

  const { data: book, loading, error } = useQuery(`/book/${id}`, "book");

  const { mutate: reserve } = useMutation("POST", "/reservations", [
    "books",
    "book",
  ]);

  const reserveBook = () => {
    const success = await reserve({ bookId: id });
    if (success) navigate("account ")
  };

  if (loading || !book) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;

  return (
    <article>
      <h1>{book.title}</h1>
      <p>{book.author}</p>
      <p>{book.description}</p>
      <img src={book.coverimage} alt={book.title} />

      {token &&
        (book.available ? (
          <button onClick={reserveBook}>Reserve this book</button>
        ) : (
          <button disabled>This book is already reserved</button>
        ))}
    </article>
  );
}
