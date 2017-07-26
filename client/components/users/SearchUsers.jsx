import React from 'react';
import PropTypes from 'prop-types';


export default class SearchUsers extends React.Component {
  constructor() {
    super();
    this.state = {
      searchQuery: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({
      searchQuery: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.searchUserDb(this.state.searchQuery);
  }

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
