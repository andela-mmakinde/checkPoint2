/* global $ */
import React from 'react';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';
import { Link } from 'react-router-dom';

/**
 * @class DocumentCard
 * @extends {React.Component}
 */
class DocumentCard extends React.Component {
  /**
   * Initialize select dropdown on component mount
   * @memberOf DocumentCard
   * @return {void}
   */
  componentDidMount() {
    $('#deleteModal').modal();
  }

  /**
   * @returns {String} The HTML markup for the DocumentCard
   * @memberOf DocumentCard
   */
  render() {
    const { document, deleteDocument, currentUser } = this.props;
    const modalId = `modal${this.props.id}`;

    return (
      <div className="col m3 s12 documentCard">
        <div className="card small white darken-10">
          <div className="card-content black-text">
            <span className="card-title truncate title">{document.title}</span>
            <br />
            <div>Opened: {new Date(document.createdAt).toDateString()}</div>
            <div>Access: {document.access}</div>
          </div>
          <div className="card-action">
            <a
              href={`#${modalId}`}
              onClick={() => $(`#${modalId}`).modal()}
              className="indigo-text documentView"
            >View</a>
          </div>
          {currentUser.id === document.ownerId && <div className="card-action">
            <a className="deleteModalTrigger" href="#deleteModal">
              <i className="material-icons indigo-text">delete</i>
            </a>
            <Link to={`/edit/${document.id}`}>
              <i className="material-icons edit indigo-text">edit</i>
            </Link>
            <a
              href={`#${modalId}`}
              onClick={() => $(`#${modalId}`).modal()}
              className="indigo-text"
              id="documentView"
            >View</a>
            <div id="deleteModal" className="modal">
              <div className="modal-content">
                <p>Are you sure you want to delete?</p>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => deleteDocument(document.id)}
                  className={`modal-action modal-close waves-effect delete
                  waves-green btn-flat`}
                >
                  Yes
                </button>
                <button className={`modal-action modal-close 
                  waves-effect waves-green btn-flat`}
                >
                  No
                </button>
              </div>
            </div>

          </div>}

          <div id={modalId} className="modal viewModal">
            <div className="modal-content">
              <h5 className="center">{document.title}</h5>
              <span>{renderHTML(document.content)}</span>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
DocumentCard.propTypes = {
  document: PropTypes.shape({
    title: '',
    content: ''
  }).isRequired,
  deleteDocument: PropTypes.func,
  id: PropTypes.number.isRequired,
  currentUser: PropTypes.shape({ id: '' }).isRequired,
};

DocumentCard.defaultProps = {
  document: null,
  deleteDocument: null
};

export default DocumentCard;
