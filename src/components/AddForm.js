import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { insertBook } from "../store/bookSlice";

const Addform = () => {
  // refs
  const title = useRef(null);
  const price = useRef(null);
  const description = useRef(null);

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: title.current.value,
      price: price.current.value,
      description: description.current.value,
    };

    dispatch(insertBook(data));

    title.current.value = null;
    price.current.value = null;
    description.current.value = null;
  };

  return (
    <div className="row">
      <div className="col-6 offset-3 mt-3">
        <h2>Insert Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              ref={title}
              id="title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              ref={price}
              id="price"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Description">Description</label>
            <textarea
              className="form-control"
              ref={description}
              id="Description"
              rows="3"
              required
            ></textarea>
          </div>
          <button
            disabled={!isLoggedIn}
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addform;
