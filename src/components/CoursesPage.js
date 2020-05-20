import React, { useState, useEffect } from 'react';
import courseStore from '../stores/courseStore';
import CourseList from './CourseList';
import { loadCourses, deleteCourse } from "../actions/courseActions";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import authorStore from '../stores/authorStore';
import { loadAuthors } from '../actions/authorActions';

function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState(authorStore.getAuthors());

  useEffect(() => {
    courseStore.addChangeListener(onCourseChange);
    if (courseStore.getCourses().length === 0)
      loadCourses();
    return () => courseStore.removeChangeListener(onCourseChange);
  }, []);

  useEffect(() => {
    authorStore.addChangeListener(onAuthorChange);
    if (authorStore.getAuthors().length === 0)
      loadAuthors();
    return () => authorStore.removeChangeListener(onAuthorChange);
  }, []);

  function onCourseChange() {
    // debugger;
    setCourses(courseStore.getCourses());
  }

  function onAuthorChange() {
    // debugger;
    setAuthors(authorStore.getAuthors());
  }

  function onDelete(id) {
    // debugger;
    deleteCourse(id);
    toast.success("Course Deleted!");
  }

  return (
    <>
      {/* {console.log(authors)} */}
      {/* {console.log(courses)} */}

      <h2>Courses</h2>
      <Link to="/course" className="btn btn-primary">
        Add Course
      </Link>
      <CourseList courses={courses} authors={authors} deleteCourse={onDelete} />
    </>
  );
}
// class CoursesPage extends React.Component {
//   state = {
//     courses: []
//   };

//   componentDidMount() {
//     getCourses().then(courses => {
//       this.setState({ courses: courses });
//     })
//   }

//   render() {
//     return (
//       <>
//         <h2>Courses</h2>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Author ID</th>
//               <th>Category</th>
//             </tr>
//           </thead>
//           <tbody>
//             {this.state.courses.map(course => {
//               console.log(course);
//               return (
//                 <tr key={course.id}>
//                   <td>{course.title}</td>
//                   <td>{course.authorId}</td>
//                   <td>{course.category}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </>
//     )
//   }
// }

export default CoursesPage;