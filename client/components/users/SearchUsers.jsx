import React from 'react';
import PropTypes from 'prop-types';

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
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @param {any} event
   * @returns {void}
   * @memberOf SearchUsers
   */
  onChange(event) {
    this.setState({
      searchQuery: event.target.value
    });
  }

  /**
   * @param {any} event
   * @returns {void}
   * @memberOf SearchUsers
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.searchUserDb(this.state.searchQuery);
  }

  /**
   * @returns {String} The HTML markup for the DocumentForm
   * @memberOf CreateDocument
   */
  render() {
    return (
      <form className="input-field user" onSubmit={this.onSubmit}>
        <div >
          <input
            id="search"
            type="search"
            name="userSearch"
            placeholder="Search Users"
            onChange={this.onChange}
          />
        </div>
      </form>
    );
  }
}

SearchUsers.propTypes = {
  searchUserDb: PropTypes.func.isRequired
};
