import React, { useState, useEffect } from "react";
import authorStore from '../stores/authorStore';
import { loadAuthors, deleteAuthor } from '../actions/authorActions';
import { Link } from "react-router-dom";
import AuthorList from "./AuthorList";
import { toast } from "react-toastify";

function AuthorPage() {
  const [authors, setAuthors] = useState(authorStore.getAuthors());
  // console.log(authors);

  useEffect(() => {
    authorStore.addChangeListener(onChange);
    if (authorStore.getAuthors().length === 0)
      loadAuthors();
    return () => authorStore.removeChangeListener(onChange);
  }, [])

  function onChange() {
    // debugger;
    setAuthors(authorStore.getAuthors());
  }

  function onDelete(id) {
    // debugger;
    deleteAuthor(id);
    toast.success("Author Deleted!");
  }

  return (
    <>
      <h2>Authors</h2>
      <Link to="/author" className="btn btn-primary">
        Add Author
      </Link>
      <AuthorList authors={authors} deleteAuthor={onDelete} />
    </>
  )
}

export default AuthorPage;
