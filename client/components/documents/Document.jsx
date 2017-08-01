import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import ConnectedSearchDocuments from './SearchDocuments';
import GetAccessDocuments from './GetAccessDocuments';
import { fetchAllUserDocument } from '../../actions/documentActions';

/**
 * @export
 * @class Documents
 * @extends {React.Component}
 */
export class Documents extends React.Component {
  /**
   * Creates an instance of Documents.
   * @param {any} props
   * @memberOf Documents
   */
  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      offset: 0,
      pageCount: 0,
      singleDocument: {},
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  /**
   * Get all documents a user has access to on component mount
   * @method ComponentDidMount
   * @return {void}
   * @memberOf Documents
   */
  componentDidMount() {
    this.props.fetchAllUserDocument().then(() => {
      this.setState({
        documents: this.props.documentList
      });
    });
  }

  /**
   * Initializes when reducer gets updated with new props
   * @param {object} nextProps
   * @return {void}
   * @memberOf Documents
   */
  componentWillReceiveProps(nextProps) {
    const documents = nextProps.documentList;
    const pageCount = nextProps.pagination.pageCount;
    this.setState({
      documents,
      pageCount,
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
    this.props.fetchAllUserDocument(offset, limit).then(() => {
      this.setState({
        documents: this.props.documentList
      });
    });
  }
  /**
   * @returns {String} The HTML markup for the DocumentForm
   * @memberOf Documents
   */
  render() {
    return (
      <div>
        <div><ConnectedSearchDocuments /></div>
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
        <div className="dashboardBackground">
          <div>
            <GetAccessDocuments
              currentUser={this.props.currentUser}
              documents={this.state.documents}
            />
          </div>
          <div className="paginationContainer">
            <Pagination
              handlePageClick={this.handlePageClick}
              pageCount={this.state.pageCount}
            />
          </div>
        </div>
      </div>
    );
  }
}

Documents.defaultProps = {
  documentList: [],
  currentUser: {},
  pagination: {}
};

Documents.propTypes = {
  fetchAllUserDocument: PropTypes.func.isRequired,
  documentList:
  PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  currentUser: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  pagination: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

const mapStateToProps = state => ({
  documentList: state.documents.documentList,
  pagination: state.documents.pagination,
  currentUser: state.auth.user
});

export default connect(mapStateToProps, {
  fetchAllUserDocument,
})(Documents);
