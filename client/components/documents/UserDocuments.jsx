/* global Materialize */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DocumentCard from './DocumentCard';
import Pagination from '../Pagination';
import ConnectedSearchDocuments from './SearchDocuments';
import { myDocuments, deleteDocuments } from '../../actions/documentActions';

/**
 * @export
 * @class UserDocuments
 * @extends {React.Component}
 */
export class UserDocuments extends React.Component {
  /**
   * Creates an instance of UserDocuments.
   * @param {any} props
   * @memberOf UserDocuments
   */
  constructor(props) {
    super(props);
    this.state = {
      documents: this.props.documentList,
      offset: 0,
      pageCount: 0,
    };
    this.deleteDocument = this.deleteDocument.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  /**
   * Gets all documents a user created on component mount
   * @method ComponentDidMount
   * @return {void}
   * @memberOf UserDocuments
   */
  componentDidMount() {
    this.props.myDocuments(this.props.currentUser.id);
  }

  /**
   * Initializes when reducer gets updated with new props
   * @param {object} nextProps
   * @return {void}
   * @memberOf UserDocuments
   */
  componentWillReceiveProps(nextProps) {
    const documents = nextProps.documentList;
    const pagination = nextProps.pagination;
    this.setState({
      documents,
      pageCount: pagination.pageCount
    });
  }

 /**
   * handles click on change of page
   * @param {object} page
   * @returns {void}
   * @memberOf Documents
   */
  handlePageClick(page) {
    const selected = page.selected;
    const limit = 8;
    const offset = Math.ceil(selected * limit);
    this.setState({ offset });
    this.props.myDocuments(this.props.currentUser.id, offset, limit)
    .then(() => {
      this.setState({
        documents: this.props.documentList
      });
    });
  }

  /**
   * @param {number} id
   * @returns {void}
   * @memberOf UserDocuments
   */
  deleteDocument(id) {
    this.props
      .deleteDocuments(id)
      .then(() => {
        this.props.myDocuments(this.props.currentUser.id);
        Materialize.toast('Document deleted', 2000);
      });
  }

  /**
   * @returns {String} The HTML markup for the UserDocuments
   * @memberOf UserDocuments
   */
  render() {
    const { documents } = this.state;
    return (
      <div className="dashboardBackground">
        <div><ConnectedSearchDocuments pageType={'myDocuments'} /></div>
        <div className="btn-container">
          <Link
            to="/create"
            className={`btn-floating btn-large 
            waves-effect waves-light right indigo`}
          >
            <i className="material-icons">
              add
            </i>
          </Link>
        </div>
        {documents.length > 0
          ? <div className="container">
            <div className="row">
              {documents.map(docs => (
                <DocumentCard
                  key={docs.id}
                  id={docs.id}
                  document={docs}
                  deleteDocument={this.deleteDocument}
                  currentUser={this.props.currentUser}
                />
                ))}
            </div>
            <div className="paginationContainer">
              <Pagination
                handlePageClick={this.handlePageClick}
                pageCount={this.state.pageCount}
              />
            </div>
          </div> : <h3 className="notFound">No documents found</h3>}
      </div>
    );
  }
}


UserDocuments.defaultProps = {
  documentList: {},
  pagination: {}
};

UserDocuments.propTypes = {
  currentUser: PropTypes.shape({ id: '' }).isRequired,
  documentList:
  PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  pagination: PropTypes.shape({ pageCount: '' }).isRequired,
  myDocuments: PropTypes.func.isRequired,
  deleteDocuments: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  documentList: state.documents.documentList,
  currentUser: state.auth.user,
  pagination: state.documents.pagination
});

export default connect(mapStateToProps, { myDocuments, deleteDocuments })(
  UserDocuments
);
