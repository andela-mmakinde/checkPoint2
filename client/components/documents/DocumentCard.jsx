import React from 'react';
import PropTypes from 'prop-types';

class DocumentCard extends React.Component {
  componentDidMount() {
    $('#deleteModal').modal();
  }

  render() {
    const { UserDocuments } = this.props;
    const { deleteDocument } = this.props;
    return (
      <div className="floating-box">
        <div className="col m4 s12">
          <div className="card small blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">{UserDocuments.title}</span>
              <p>
                {UserDocuments.content}
              </p>
            </div>
            <div className="card-action">
              <a href="#deleteModal">Delete</a>
              <a href="#">Edit</a>

              <div id="deleteModal" className="modal">
                <div className="modal-content">
                  <p>Are you sure you want to delete?</p>
                </div>
                <div className="modal-footer">
                  <a
                    href=""
                    onClick={() => deleteDocument(UserDocuments.id)}
                    className="modal-action modal-close waves-effect waves-green btn-flat"
                  >
                    Yes
                  </a>
                  <a
                    href="#!"
                    className="modal-action modal-close waves-effect waves-green btn-flat"
                  >
                    No
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DocumentCard.defaultProps = {
  document: null
};

DocumentCard.propTypes = {
  UserDocuments: PropTypes.object.isRequired,
  deleteDocument: PropTypes.func.isRequired
};

export default DocumentCard;
