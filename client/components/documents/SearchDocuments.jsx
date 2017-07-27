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
    this.onSubmit = this.onSubmit.bind(this);
    this.clearField = this.clearField.bind(this);
  }

  /**
   * @param {object} event
   * @returns {void}
   * @memberOf SearchDocuments
   */
  onChange(event) {
    this.setState({
      searchQuery: event.target.value
    });
  }

  /**
   * @param {object} event
   * @returns {void}
   * @memberOf SearchDocuments
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.searchDocuments(this.state.searchQuery);
  }

  clearField() {
    this.setState({
      searchQuery: ''
    });
  }


  /**
   * @returns {String} The HTML markup for the SearchBar
   * @memberOf CreateDocument
   */
  render() {
    return (
      <span>
        <SearchBar
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          clearField={this.clearField}
        />
      </span>
    );
  }
}

SearchDocuments.propTypes = {
  searchDocuments: PropTypes.func.isRequired
};

export default connect(null, {
  searchDocuments
})(SearchDocuments);
