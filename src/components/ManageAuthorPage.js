import React, { useState, useEffect } from "react";
import authorStore from '../stores/authorStore';
import TextInput from './common/TextInput';
import * as authorActions from '../actions/authorActions';
import InvalidSlug from './InvalidSlug';
import { toast } from "react-toastify";

function ManageAuthorPage(props) {
  const [authors, setAuthors] = useState(authorStore.getAuthors());
  const [validId, setValidId] = useState(true);
  const [errors, setErrors] = useState({});
  const [author, setAuthor] = useState({
    id: null,
    name: ""
  });

  useEffect(() => {
    authorStore.addChangeListener(onChange);
    const id = props.match.params.id;
    console.log(id);
    if (authors.length === 0) {
      authorActions.loadAuthors();
    } else if (id) {
      debugger;
      const authorContent = authorStore.getAuthorById(id);
      if (authorContent === null)
        setValidId(false);
      else {
        setAuthor(authorContent)
      }
    }
    return () => authorStore.removeChangeListener(onChange);
  }, [authors.length, props.match.params.id])

  function onChange() {
    setAuthors(authorStore.getAuthors());
  }

  function handleChange(event) {
    event.preventDefault();
    const { target } = event;
    const updatedAuthor = { ...author, [target.name]: target.value };
    setAuthor(updatedAuthor);
  }

  function formIsValid() {
    const _errors = {};
    if (!author.name) _errors.name = "Name is Required";
    setErrors(_errors);
    // Forms is valid if the errors object has no properties.
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    authorActions.saveAuthor(author).then(() => {
      props.history.push("/authors");
      toast.success("Author Saved!");
    })
  }

  return (
    <>
      {validId === true ?
        <>
          <h2>Manage Author</h2>
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Name"
              id="name"
              name="name"
              onChange={handleChange}
              onSubmit={handleSubmit}
              value={author.name}
              error={errors.name}
            />
            <input type="submit" value="Save" className="btn btn-primary" />
          </form>
        </>
        :
        <InvalidSlug name="Id" />
      }
    </>
  )
}

export default ManageAuthorPage;