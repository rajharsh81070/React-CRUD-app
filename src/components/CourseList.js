import React from 'react';
import { Link } from 'react-router-dom';

function CourseList(props) {
  const authorName = { ...props.courses };
  console.log(authorName);
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author Name</th>
          <th>Category</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {props.courses.map(course => {
          return (
            <tr key={course.id}>
              <td>
                <Link to={"/course/" + course.slug}>{course.title}</Link>
              </td>
              {/* {console.log(authorName)} */}
              <td>{}</td>
              <td>{course.category}</td>
              <td>
                <button className="btn btn-outline-danger" onClick={() => {
                  // debugger;
                  props.deleteCourse(course.id)
                }}
                >
                  Delete
                  </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  )
}

export default CourseList;