/* global */
import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import { EditorState } from 'draft-js';
import DocumentForm from './DocumentForm';
import {
updateDocument,
searchDocumentById,
fetchAllUserDocument } from '../../actions/documentActions';

export class EditDocument extends React.Component {
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
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    $('select').material_select();
    this.props.searchDocumentById(this.props.match.params.id).then(() => {
      this.setState({
        id: this.props.documentsFromReducer.id,
        access: this.props.documentsFromReducer.access,
        title: this.props.documentsFromReducer.title,
        editorState: EditorState.createWithContent(convertFromHTML(this.props.documentsFromReducer.content)),
      });
    });
  }

  onChange(event) {
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
        this.setState({ success: true });
      })
      .catch((errorData) => {
        this.setState({
          error: errorData.response.data
        });
      });
  }

  render() {
    const { error, success, title, content, access, editorState } = this.state;
    const docObj = { title, content, access, editorState };

    if (success) {
      return <Redirect to="/mydocuments" />;
    }
    return (
      <div>
        <DocumentForm
          error={error}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          onEditorStateChange={this.onEditorStateChange}
          editorState={this.state.editorState}
          docObj={docObj}
        />
      </div>
    );
  }
}


EditDocument.defaultProps = {
  documentsFromReducer: {},
};

EditDocument.propTypes = {
  documentsFromReducer: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  updateDocument: PropTypes.func.isRequired,
  searchDocumentById: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    documentsFromReducer: state.documents.documentList,
    currentUser: state.auth.user
  };
}

export default connect(mapStateToProps, {
  updateDocument, searchDocumentById, fetchAllUserDocument
})(EditDocument);
