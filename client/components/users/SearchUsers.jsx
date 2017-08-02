import React from 'react';
import PropTypes from 'prop-types';
import preventSubmit from '../../utilities/preventSubmit';

/**
 * @export
 * @class SearchUsers
 * @extends {React.Component}
 */
export default class SearchUsers extends React.Component {
  /**
   * Creates an instance of SearchUsers.
   * @memberOf SearchUsers
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
   * @memberOf SearchUsers
   */
  onChange(event) {
    event.preventDefault();
    const searchQuery = event.target.value;
    this.setState({
      searchQuery
    });
    this.props.searchUserDb(searchQuery);
  }

  /**
   * @returns {void}
   * @memberOf SearchUsers
   */
  clearField() {
    const searchQuery = '';
    this.setState({
      searchQuery
    });
    this.props.searchUserDb(searchQuery);
  }

  /**
   * @returns {String} The HTML markup for the DocumentForm
   * @memberOf CreateDocument
   */
  render() {
    return (
      <form className="input-field user" onSubmit={preventSubmit}>
        <div>
          <input
            id="search"
            type="search"
            name="userSearch"
            placeholder="Search Users"
            value={this.state.searchQuery}
            onChange={this.onChange}
          />
          <i
            role="button"
            className="material-icons"
            onClick={this.clearField}
          >
            close
          </i>
        </div>
      </form>
    );
  }
}

SearchUsers.propTypes = {
  searchUserDb: PropTypes.func.isRequired
};
