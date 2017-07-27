import React from 'react';
import PropTypes from 'prop-types';

/**
 * SearchBar component.
 * @returns {String} The HTML markup for the search input component
 */
const SearchBar = ({ onSubmit, onChange }) => (
  <form className="searchForm" onSubmit={onSubmit}>
    <div className="input-field document">
      <input
        id="search"
        className="searchBar"
        type="search"
        name="search"
        placeholder="Search Documents"
        onChange={onChange}
      />
      <i role="button" className="material-icons">close</i>
      <button type="submit" name="search" className="searchButton" />
    </div>
  </form>
);

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchBar;
