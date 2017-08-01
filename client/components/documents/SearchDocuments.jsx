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
      searchQuery: ''
    };
    this.onChange = this.onChange.bind(this);
    this.clearField = this.clearField.bind(this);
  }

  /**
   * @param {object} event
   * @returns {void}
   * @memberOf SearchDocuments
   */
  onChange(event) {
    const searchQuery = event.target.value;
    this.setState({
      searchQuery
    });
    this.props.searchDocuments(searchQuery);
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
    this.props.searchDocuments(searchQuery);
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
        />
      </span>
    );
  }
}

SearchDocuments.propTypes = {
  searchDocuments: PropTypes.func.isRequired,
};

export default connect(null, {
  searchDocuments
})(SearchDocuments);
