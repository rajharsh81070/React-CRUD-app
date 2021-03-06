import React, { useState, useEffect } from 'react';
import CourseForm from './CourseForm';
import courseStore from '../stores/courseStore';
import authorStore from '../stores/authorStore';
import { toast } from 'react-toastify';
import * as courseActions from '../actions/courseActions';
import { loadAuthors } from '../actions/authorActions';
import InvalidSlug from './InvalidSlug';

const ManageCoursePage = props => {
  const [checkValidSlug, setValidSlug] = useState(true);
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: ""
  });
  const [authors, setAuthors] = useState(authorStore.getAuthors());

  useEffect(() => {
    authorStore.addChangeListener(onAuthorChange);
    if (authorStore.getAuthors().length === 0)
      loadAuthors();
    return () => authorStore.removeChangeListener(onAuthorChange);
  }, []);

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    const slug = props.match.params.slug; // from the path /course/:slug
    if (courses.length === 0) {
      courseActions.loadCourses();
    } else if (slug) {
      // debugger;
      const courseContent = courseStore.getCourseBySlug(slug);
      if (courseContent === undefined)
        setValidSlug(false)
      else {
        setCourse(courseContent);
      }
    }
    return () => courseStore.removeChangeListener(onChange);
  }, [courses.length, props.match.params.slug]);

  function onAuthorChange() {
    // debugger;
    setAuthors(authorStore.getAuthors());
  }

  function onChange() {
    // console.log(props.match.params.slug);
    setCourses(courseStore.getCourses());
  }

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
    courseActions.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("Course Saved!");
    });
  }

  return (
    <>
      {checkValidSlug === true ?
        <>
          <h2>Manage Course</h2>
          <CourseForm
            errors={errors}
            course={course}
            authors={authors}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </>
        :
        <InvalidSlug name="slug" />
      }

    </>
  )
}

export default ManageCoursePage;