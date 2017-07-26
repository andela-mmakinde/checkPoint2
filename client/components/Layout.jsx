import React from 'react';
import PropTypes from 'prop-types';
import Header from './includes/Header';
import Footer from './includes/Footer';

const Layout = props => ({
  render() {
    return (
      <div>
        <Header />
        <main className="dashboardBackground">{props.children}</main>
        <Footer />
      </div>
    );
  }
});

export default Layout;
