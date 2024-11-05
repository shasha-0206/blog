import React from 'react';

const Editor = () => {
  return (
    <div className="col-8 offset-2 mt-3">
      <h3>Upload a New Post</h3>
      <form 
        method="POST"
        action="/posts"
        noValidate
        encType="multipart/form-data"
        className="needs-validation"
      >
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            name="post[title]"
            placeholder="Add a catchy title"
            className="form-control"
            required
          />
          <div className="valid-feedback">Title Looks good!</div>
          <div className="invalid-feedback">Title should be valid.</div>
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea 
            name="post[content]" 
            className="form-control" 
            rows="8" 
            required
          ></textarea>
          <div className="invalid-feedback">Please input some content to post</div>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Upload Image</label>
          <input 
            type="file" 
            name="post[image]" 
            className="form-control" 
            required 
          />
        </div>
        
        <button className="btn btn-dark add-btn" type="submit">Add</button>
      </form>
    </div>
  );
}

export default Editor;
