/* global Materialize */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DocumentCard from './DocumentCard';
import Pagination from '../Pagination';
import SearchDocuments from './SearchDocuments';
import { myDocuments, deleteDocuments } from '../../actions/documentActions';

export class UserDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: '',
      offset: 0,
      pageCount: 0,
    };
    this.deleteDocument = this.deleteDocument.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    this.props.myDocuments(this.props.currentUser.id);
  }

  componentWillReceiveProps(nextProps) {
    const documents = nextProps.documentsFromReducer;
    const pagination = nextProps.pagination;
    this.setState({
      documents,
      pageCount: pagination.pageCount
    });
  }

  handlePageClick(page) {
    const selected = page.selected;
    const limit = 8;
    const offset = Math.ceil(selected * limit);
    this.setState({ offset });
    this.props.myDocuments(this.props.currentUser.id, offset, limit)
    .then(() => {
      this.setState({
        documents: this.props.documentsFromReducer
      });
    });
  }

  deleteDocument(id) {
    this.props
      .deleteDocuments(id)
      .then(() => {
        this.props.myDocuments(this.props.currentUser.id);
        Materialize.toast('Document deleted', 2000);
      });
  }

  render() {
    const { documents } = this.state;
    return (
      <div className="dashboardBackground">
        <div><SearchDocuments /></div>
        <div className="btn-container">
          <Link
            to="/create"
            className="btn-floating btn-large waves-effect waves-light right indigo"
          >
            <i className="material-icons">
              add
            </i>
          </Link>
        </div>
        {!documents.length
          ? <span />
          : <div className="container">
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
          </div>}
        <div className="paginationContainer">
          <Pagination
            handlePageClick={this.handlePageClick}
            pageCount={this.state.pageCount}
          />
        </div>
      </div>
    );
  }
}


UserDocuments.defaultProps = {
  documentsFromReducer: {},
  pagination: {}
};

UserDocuments.propTypes = {
  currentUser: PropTypes.object.isRequired,
  documentsFromReducer:
  PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  pagination: PropTypes.object.isRequired,
  myDocuments: PropTypes.func.isRequired,
  deleteDocuments: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    documentsFromReducer: state.documents.documentList,
    currentUser: state.auth.user,
    pagination: state.documents.pagination
  };
}

export default connect(mapStateToProps, { myDocuments, deleteDocuments })(
  UserDocuments
);
