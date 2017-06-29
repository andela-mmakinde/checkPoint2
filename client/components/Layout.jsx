import React from 'react';
import PropTypes from 'prop-types';
import Header from './includes/Header.jsx';
import Footer from './includes/Footer.jsx';
import Home from './Home.jsx';

const Layout = props => ({
  render() {
    return (
      <div>
        <Header />
        <main>{props.children}</main>
        <Footer />
      </div>
    );
  }
});

export default Layout;
