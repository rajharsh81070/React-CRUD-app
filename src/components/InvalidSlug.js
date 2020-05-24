import React from 'react';
import { Link } from "react-router-dom";

function NotFoundPage(props) {
  return (
    <div>
      <h2>
        Invalid {props.name}
      </h2>
      <p>
        <Link to="/">Back To Home</Link>
      </p>
    </div>
  );
}

export default NotFoundPage;