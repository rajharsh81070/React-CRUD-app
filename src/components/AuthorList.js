import React from "react";
import { Link } from "react-router-dom";

function AuthorList(props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Author Name</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {props.authors.map(author => {
          return (
            <tr key={author.id}>
              <td>
                <Link to={"/author/" + author.id}>
                  {author.name}
                </Link>
              </td>
              <td>
                <button className="btn btn-outline-danger" onClick={() => {
                  debugger;
                  props.deleteAuthor(author.id)
                }}>
                  Delete
                  </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default AuthorList;