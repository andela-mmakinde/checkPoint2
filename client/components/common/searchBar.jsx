import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ onSubmit, onChange }) => (
  <form className="searchForm" onSubmit={onSubmit}>
    <div className="input-field document">
      <input
        id="search"
        className="searchBar"
        type="search"
        placeholder="Search Documents"
        onChange={onChange}
      />
      <button type="submit" name="search" className="searchButton">
        {/*<i className="material-icons">search</i>*/}
      </button>
    </div>
  </form>
);

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchBar;
