import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ onSubmit, onChange, clearField }) => (
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
      <i role="button" className="material-icons" onClick={clearField}>close</i>
      <button type="submit" name="search" className="searchButton" />
    </div>
  </form>
);

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  clearField: PropTypes.func.isRequired,
};

export default SearchBar;
