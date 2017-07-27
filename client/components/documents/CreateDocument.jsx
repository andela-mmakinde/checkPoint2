/* global $ */
import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { convertToHTML } from 'draft-convert';
import DocumentForm from './DocumentForm';
import { saveDocumentRequest } from '../../actions/documentActions';

/**
 * @export
 * @class CreateDocument
 * @extends {React.Component}
 */
export class CreateDocument extends React.Component {
  /**
   * Creates an instance of CreateDocument.
   * @param {any} props
   * @memberOf CreateDocument
   */
  constructor(props) {
    super(props);
    this.state = {
      error: {},
      content: '',
      access: '',
      title: '',
      success: false
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * Initialize select dropdown on component mount
   * @method ComponentDidMount
   * @return {void}
   * @memberOf CreateDocument
   */
  componentDidMount() {
    $('select').material_select();
  }

  /**
   * @param {object} event
   * @returns {void}
   * @memberOf CreateDocument
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
   * Makes an action call to create a new document
   *
   * @param {object} event
   * @returns {void}
   * @memberOf CreateDocument
   */
  onSubmit(event) {
    event.preventDefault();
    this.setState({ error: {} });
    const documentToSave = {
      content: this.state.content,
      access: this.state.access,
      title: this.state.title,
    };
    this.props
      .saveDocumentRequest(documentToSave)
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
    const docObj = {
      title,
      content,
      access,
      editorState
    };

    if (success) {
      return <Redirect to="/mydocuments" />;
    }
    return (
      <div>
        <DocumentForm
          error={error}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          updateAccessState={this.updateAccessState}
          onEditorStateChange={this.onEditorStateChange}
          docObj={docObj}
        />
      </div>
    );
  }
}

CreateDocument.propTypes = {
  saveDocumentRequest: PropTypes.func.isRequired,
};

export default connect(null, { saveDocumentRequest })(CreateDocument);
