import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteBook, getBook } from "../../store/bookSlice";

const BooksList = ({ isLoading, books }) => {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.auth);

  const bookList =
    books.length > 0
      ? books.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex  justify-content-between align-items-center"
          >
            <div>{item.title}</div>
            <div className="btn-group" role="group">
              <button
                onClick={() => dispatch(getBook(item))}
                type="button"
                className="btn btn-primary"
              >
                Read
              </button>
              <button
                onClick={() =>
                  dispatch(deleteBook(item))
                    .unwrap()
                    .then((originalPromiseResult) => {
                      console.log(originalPromiseResult);
                    })
                    .catch((rejectedValueOrSerializedError) => {
                      console.log(rejectedValueOrSerializedError);
                    })
                }
                disabled={!isLoggedIn}
                type="button"
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </li>
        ))
      : "There is no books available!";
  return (
    <div>
      <h2>Books List</h2>
      {isLoading ? "loading..." : <ul className="list-group">{bookList}</ul>}
    </div>
  );
};

export default BooksList;
