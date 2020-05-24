import React from "react";
import TextInput from './common/TextInput';

function CourseForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        label="Title"
        id="title"
        name="title"
        onChange={props.onChange}
        value={props.course.title}
        error={props.errors.title}
      />

      <div className="form-group">
        <label htmlFor="author">Author</label>
        <div className="field">
          <select
            id="author"
            name="authorId"
            onChange={props.onChange}
            value={props.course.authorId || ""}
            className="form-control"
          >
            <option value="" />
            {props.authors.map(author => {
              return (
                <option value={author.id} key={author.id} >
                  {author.name}
                </option>
              )
            })}
            {/* <option value="" />
            <option value="1">Cory House</option>
            <option value="2">Scott Allen</option> */}
          </select>
          {props.errors.authorId && (
            <div className="alert alert-danger">{props.errors.authorId}
            </div>
          )}
        </div>
      </div>

      <TextInput
        id="category"
        name="category"
        label="Category"
        onChange={props.onChange}
        error={props.errors.category}
        value={props.course.category}
      />

      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

export default CourseForm;