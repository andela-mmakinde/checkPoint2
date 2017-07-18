/* global Materialize */
import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const DocumentForm = ({
  editorState,
  onSubmit,
  onTitleChange,
  updateAccessState,
  onEditorStateChange,
  error,
  title
}) => (
  <div className="documentForm">
    <div className="row">
      <div className="input-field col s12">
        <input
          id="title"
          name="title"
          onChange={onTitleChange}
          value={title}
          type="text"
          className="validate"
          style={{
            margin: '0px'
          }}
        />
        <label htmlFor="title">Enter document title</label>
      </div>
      {error.message && Materialize.toast(error.message, 2000)}

      <div
        className="input-field col s12"
        style={{
          margin: '0px'
        }}
      >
        <br />
        <select name="access" onChange={updateAccessState} defaultValue="">
          <option value="" disabled>Select document access</option>
          <option name="public">Public</option>
          <option name="private">Private</option>
          <option name="role">Role</option>
        </select>
      </div>
    </div>
    <Editor
      onEditorStateChange={onEditorStateChange}
      toolbarClassName="home-toolbar"
      wrapperClassName="home-wrapper"
      editorClassName="home-editor"
    />
    <button
      className="waves-effect waves-light btn right indigo"
      onClick={onSubmit}
    >
      Save
    </button>
    <Link
      className="waves-effect cancel waves-light btn right indigo"
      to="/document"
    >
      Cancel
    </Link>
  </div>
);

DocumentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  updateAccessState: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onEditorStateChange: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};
export default DocumentForm;
