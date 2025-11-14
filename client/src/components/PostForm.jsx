import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const initialState = {
  title: '',
  content: '',
  category: '',
};

function PostForm({ onSubmit }) {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
    setFormData(initialState);
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Create Post">
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          aria-invalid={Boolean(errors.title)}
          aria-describedby="title-error"
        />
        {errors.title && (
          <span id="title-error" role="alert">
            {errors.title}
          </span>
        )}
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          aria-invalid={Boolean(errors.content)}
          aria-describedby="content-error"
        />
        {errors.content && (
          <span id="content-error" role="alert">
            {errors.content}
          </span>
        )}
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <input
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          aria-invalid={Boolean(errors.category)}
          aria-describedby="category-error"
        />
        {errors.category && (
          <span id="category-error" role="alert">
            {errors.category}
          </span>
        )}
      </div>
      <Button type="submit">Create Post</Button>
    </form>
  );
}

PostForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default PostForm;

