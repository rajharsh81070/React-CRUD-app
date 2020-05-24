import React from 'react';
import { Link } from 'react-router-dom';

function CourseList(props) {
  // console.log(props.courses);
  // console.log(props.authors);
  // console.log(authorNames);
  // const [courses] = [...props.courses];
  console.log(props.courses);
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
              <td>{props.authors.map((author) => {
                let result;
                if (author.id === course.authorId)
                  result = author.name;
                return result;
              })}
              </td>
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