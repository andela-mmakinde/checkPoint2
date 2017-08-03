import React from 'react';
import PropTypes from 'prop-types';
import preventSubmit from '../../utilities/preventSubmit';


/**
 * SearchBar component.
 * @returns {String} The HTML markup for the search input component
 */
const SearchBar = ({ clearField, onChange, searchQuery }) => (
  <form className="searchForm" onSubmit={preventSubmit}>
    <div className="input-field document">
      <input
        id="search"
        className="searchBar"
        type="search"
        name="search"
        placeholder="Search Documents"
        onChange={onChange}
        value={searchQuery}
      />
      <i role="button" className="material-icons" onClick={clearField}>close</i>
      <button type="submit" name="search" className="searchButton" />
    </div>
  </form>
);

SearchBar.propTypes = {
  clearField: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchBar;
