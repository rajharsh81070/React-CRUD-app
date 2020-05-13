import React, { useState, useEffect } from 'react';
import CourseForm from './CourseForm';
import * as courseApi from '../api/courseApi'
import { toast } from 'react-toastify';

const ManageCoursePage = props => {
  const [errors, setErrors] = useState({});
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: ""
  });

  useEffect(() => {
    const slug = props.match.params.slug; // from the path /courses/:slug
    if (slug) {
      courseApi.getCourseBySlug(slug).then(_course => setCourse(_course));
    }

  }, [props.match.params.slug]);

  function handleChange(event) {
    // debugger;
    // This is Destructuring.
    const { target } = event;
    const updatedCourse = { ...course, [target.name]: target.value };
    setCourse(updatedCourse);
    // updatedCourse.title = event.target.value;
  }

  function formIsValid() {
    const _errors = {};
    if (!course.title) _errors.title = "Title is Required";
    if (!course.authorId) _errors.authorId = "Title is Required";
    if (!course.category) _errors.category = "Category is Required";
    setErrors(_errors);
    // Forms is valid if the errors object has no properties.
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    courseApi.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("Course Saved!");
    });

  }

  return (
    <>
      <h2>Manage Course</h2>
      {/* {props.match.params.slug} */}
      <CourseForm
        errors={errors}
        course={course}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  )
}

export default ManageCoursePage;