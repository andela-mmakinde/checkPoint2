import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import { connect } from 'react-redux';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import { EditorState } from 'draft-js';
import { updateDocument, searchDocumentById, fetchAllUserDocument } from '../../actions/documentActions';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class EditDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      error: {},
      content: '',
      access: '',
      title: '',
      editorState: '',
      success: false
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.updateAccessState = this.updateAccessState.bind(this);
  }

  componentDidMount() {
    $('.modal').modal({ dismissible: false });
    $('select').material_select();
    $('select').on('change', event =>
      this.updateAccessState(event.target.value)
    );
    this.props.searchDocumentById(this.props.match.params.id).then(() => {
      this.setState({
        id: this.props.documentsFromReducer.id,
        access: this.props.documentsFromReducer.access,
        title: this.props.documentsFromReducer.title,
        editorState: EditorState.createWithContent(convertFromHTML(this.props.documentsFromReducer.content)),
      });
    });
  }

  onTitleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      error: {}
    });
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState,
      content: convertToHTML(editorState.getCurrentContent())
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({ error: {} });
    const documentToUpdate = {
      content: this.state.content,
      access: this.state.access,
      title: this.state.title,
    };
    this.props
      .updateDocument(this.state.id, documentToUpdate)
      .then(() => {
        $('.modal').modal('close');
        this.setState({ success: true });
      })
      .catch((errorData) => {
        this.setState({
          error: errorData.response.data
        });
      });
  }

  updateAccessState(selectedValue) {
    this.setState({
      access: selectedValue,
      error: {}
    });
  }

  render() {
    // const { editorState } = this.state;
    const { error } = this.state;
    const { success } = this.state;
    const { title } = this.state;

    if (success) {
      return <Redirect to="/docs" />;
    }
    return (
      <div>
        <div className="documentForm">
          <div className="row">
            <div className="input-field col s12">
              <input
                id="title"
                name="title"
                onChange={this.onTitleChange}
                value={title}
                type="text"
                className="validate"
                style={{ margin: '0px' }}
              />
              <label htmlFor="title">Enter document title</label>
            </div>
            {error.message && Materialize.toast(error.message, 2000)}

            <div
              className="input-field col s12"
              style={{ margin: '0px' }}
            >
              <br />
              <select name="access" onChange={this.updateAccessState} defaultvalue={this.state.access}>
                <option value="" disabled>Select document access</option>
                <option name="public">Public</option>
                <option name="private">Private</option>
                <option name="role">Role</option>
              </select>
            </div>
          </div>
          <Editor
            editorState={this.state.editorState}
            onEditorStateChange={this.onEditorStateChange}
          />
          <button
            className="waves-effect waves-light btn right indigo"
            onClick={this.onSubmit}
          >
            Save
          </button>
          <Link
            className="waves-effect cancel waves-light btn right indigo"
            to="/docs"
          >
            Cancel
          </Link>
        </div>
      </div>
    );
  }
}

EditDocument.propTypes = {
  documentsFromReducer: PropTypes.array.isRequired,
  updateDocument: PropTypes.func.isRequired,
  searchDocumentById: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    documentsFromReducer: state.documents,
    currentUser: state.auth.user
  };
}

export default connect(mapStateToProps, {
  updateDocument, searchDocumentById, fetchAllUserDocument
})(EditDocument);
