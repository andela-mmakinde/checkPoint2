/* global $ */
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

/**
 * @export
 * @class EditDocument
 * @extends {React.Component}
 */
export class EditDocument extends React.Component {
  /**
   * Creates an instance of EditDocument.
   * @param {object} props
   * @memberOf EditDocument
   */
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

  /**
   * Get all documents a user has access to on component mount
   * @memberOf EditDocument
   * @return {void}
   */
  componentDidMount() {
    $('select').material_select();
    this.props.searchDocumentById(this.props.match.params.id).then(() => {
      this.setState({
        id: this.props.document.id,
        access: this.props.document.access,
        title: this.props.document.title,
        editorState:
        EditorState.createWithContent(convertFromHTML(this
          .props.document.content)),
      });
    });
  }

  /**
   * @param {any} event
   * @returns {void}
   * @memberOf EditDocument
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      error: {}
    });
  }

  /**
   * @param {string} editorState
   * @returns {void}
   * @memberOf CreateDocument
   */
  onEditorStateChange(editorState) {
    this.setState({
      editorState,
      content: convertToHTML(editorState.getCurrentContent())
    });
  }
  /**
   * Makes an action call to edit a document
   *
   * @param {object} event
   * @returns {void}
   * @memberOf CreateDocument
   */
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

  /**
   * @returns {String} The HTML markup for the DocumentForm
   * @memberOf CreateDocument
   */
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


EditDocument.propTypes = {
  document:
  PropTypes.shape({ id: '', access: '', title: '', content: '' }).isRequired,
  updateDocument: PropTypes.func.isRequired,
  searchDocumentById: PropTypes.func.isRequired,
  match: PropTypes.shape({ params: '' }).isRequired
};

const mapStateToProps = state => ({
  document: state.documents.document,
  currentUser: state.auth.user
});

export default connect(mapStateToProps, {
  updateDocument, searchDocumentById, fetchAllUserDocument
})(EditDocument);
