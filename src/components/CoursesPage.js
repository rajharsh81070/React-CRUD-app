import React, { useState, useEffect } from 'react';
import courseStore from '../stores/courseStore';
import CourseList from './CourseList';
import { loadCourses, deleteCourse } from "../actions/courseActions";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses());

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    if (courseStore.getCourses().length === 0)
      loadCourses();
    return () => courseStore.removeChangeListener(onChange);
  }, []);

  function onChange() {
    // debugger;
    setCourses(courseStore.getCourses());
  }

  function onDelete(id) {
    deleteCourse(id);
    toast.success("Course Deleted!");
  }

  return (
    <>
      <h2>Courses</h2>
      <Link to="/course" className="btn btn-primary">
        Add Course
      </Link>
      <CourseList courses={courses} deleteCourse={onDelete} />
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