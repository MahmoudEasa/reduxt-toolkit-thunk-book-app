import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../store/bookSlice";
import BookInfo from "./BookInfo";
import BooksList from "./BooksList";

import "./book.css";

const PostContainer = () => {
  const { isLoading, books, isError } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  return (
    <Fragment>
      <hr className="my-5" />
      <div className="row">
        <div className="col">
          <BooksList books={books} isLoading={isLoading} />
        </div>
        <div className="col side-line">
          <BookInfo />
        </div>
      </div>
    </Fragment>
  );
};

export default PostContainer;
