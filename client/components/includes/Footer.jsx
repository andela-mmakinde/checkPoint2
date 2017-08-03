import React from 'react';

/**
 * Footer component.
 * @returns {String} The HTML markup for the Footer component
 */
const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer className="page-footer indigo">
      <div className="footer-copyright">
        <div className="container center">
          <a
            className="orange-text text-lighten-4"
            href="https://www.linkedin.com/in/makinde-mayowa-650b148b/"
          >
            Makinde Mayowa&emsp;&emsp;
          </a>
          {date}
        </div>
      </div>
    </footer>
  );
};
export default Footer;
