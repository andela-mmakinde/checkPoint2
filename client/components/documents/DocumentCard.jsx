import React from 'react';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';
import { Link } from 'react-router-dom';

class DocumentCard extends React.Component {
  componentDidMount() {
    $('#deleteModal').modal();
  }

  render() {
    const { document } = this.props;
    const { deleteDocument } = this.props;
    const { currentUser } = this.props;
    const modalId = `modal${this.props.id}`;

    return (
      <div className="col m4 s12 documentCard">
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
              className="indigo-text viewDocument"
            >View</a>
          </div>
          {currentUser.id === document.ownerId && <div className="card-action">
            <a href="#deleteModal">
              <i className="material-icons indigo-text">delete</i>
            </a>
            <Link to={`/edit/${document.id}`}>
              <i className="material-icons edit indigo-text">edit</i>
            </Link>
            <a
              href={`#${modalId}`}
              onClick={() => $(`#${modalId}`).modal()}
              className="indigo-text"
            >View</a>
            <div id="deleteModal" className="modal">
              <div className="modal-content">
                <p>Are you sure you want to delete?</p>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => deleteDocument(document.id)}
                  className="modal-action modal-close waves-effect waves-green btn-flat">
                  Yes
                </button>
                <button className="modal-action modal-close waves-effect waves-green btn-flat">
                  No
                </button>
              </div>
            </div>

          </div>}

          <div id={modalId} className="modal">
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
  document: PropTypes.object.isRequired,
  deleteDocument: PropTypes.func,
  id: PropTypes.number.isRequired,
  currentUser: PropTypes.object.isRequired
};

DocumentCard.defaultProps = {
  document: null,
  deleteDocument: null
};

export default DocumentCard;
