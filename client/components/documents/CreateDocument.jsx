import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { convertToHTML } from 'draft-convert';
import DocumentForm from './DocumentForm';
import { saveDocumentRequest } from '../../actions/documentActions';

export class CreateDocument extends React.Component {
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
    this.onTitleChange = this.onTitleChange.bind(this);
    this.updateAccessState = this.updateAccessState.bind(this);
  }

  componentDidMount() {
    $('.modal').modal({ dismissible: false });
    $('select').material_select();
    $('select').on('change', event =>
      this.updateAccessState(event.target.value)
    );
  }

  onTitleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      error: {}
    });
  }

  onEditorStateChange(editorState) {
    this.setState({
      content: convertToHTML(editorState.getCurrentContent()),
      error: {}
    });
  }

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
        $('.modal').modal('close');
        // this.props.fetchAllUserDocument();
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
    const { error, success, title } = this.state;

    if (success) {
      return <Redirect to="/docs" />;
    }
    return (
      <div>
        <DocumentForm
          error={error}
          onSubmit={this.onSubmit}
          onTitleChange={this.onTitleChange}
          updateAccessState={this.updateAccessState}
          onEditorStateChange={this.onEditorStateChange}
          title={title}
        />
      </div>
    );
  }
}

CreateDocument.propTypes = {
  saveDocumentRequest: PropTypes.func.isRequired,
};

export default connect(null, { saveDocumentRequest })(CreateDocument);
