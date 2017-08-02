import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchBar from '../documents/SearchBar';
import { searchDocuments } from '../../actions/documentActions';

/**
 * @export
 * @class SearchDocuments
 * @extends {React.Component}
 */
export class SearchDocuments extends React.Component {

  /**
   * Creates an instance of SearchDocuments.
   * @memberOf SearchDocuments
   */
  constructor() {
    super();
    this.state = {
      searchQuery: '',
      pageType: ''
    };
    this.onChange = this.onChange.bind(this);
    this.clearField = this.clearField.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @param {object} event
   * @returns {void}
   * @memberOf SearchDocuments
   */
  onChange(event) {
    event.preventDefault();
    const searchQuery = event.target.value;
    this.setState({
      searchQuery,
    });
    this.props.searchDocuments(searchQuery, this.props.pageType);
  }

  /**
   * @param {object} event
   * @returns {void}
   * @memberOf SearchDocuments
   */
  onSubmit(event) {
    event.preventDefault();
  }

  /**
   * @returns {void}
   * @memberOf SearchDocuments
   */
  clearField() {
    const searchQuery = '';
    this.setState({
      searchQuery
    });
    this.props.searchDocuments(searchQuery, this.props.pageType);
  }

  /**
   * @returns {String} The HTML markup for the SearchBar
   * @memberOf CreateDocument
   */
  render() {
    return (
      <span>
        <SearchBar
          onChange={this.onChange}
          clearField={this.clearField}
          searchQuery={this.state.searchQuery}
          onSubmit={this.onSubmit}
        />
      </span>
    );
  }
}

SearchDocuments.propTypes = {
  searchDocuments: PropTypes.func.isRequired,
  pageType: PropTypes.string.isRequired,
};

export default connect(null, {
  searchDocuments
})(SearchDocuments);
