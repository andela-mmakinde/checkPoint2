import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import DocumentCard from './DocumentCard';
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

  handlePageClick(data) {
    const selected = data.selected;
    const limit = 6;
    const offset = Math.ceil(selected * limit);
    this.setState({ offset });
    this.props.myDocuments(this.props.currentUser.id, offset, limit).then(() => {
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
        <Link
          to="/create"
          style={{
            margin: '30px',
            position: 'absolute',
            left: '75rem'
          }}
          className="btn-floating btn-large waves-effect waves-light right indigo"
        >
          <i className="material-icons">
            add
          </i>
        </Link>
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
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={<a href="">...</a>}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
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
  documentsFromReducer: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  pagination: PropTypes.object.isRequired,
  myDocuments: PropTypes.func.isRequired,
  deleteDocuments: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    documentsFromReducer: state.documents.documents,
    currentUser: state.auth.user,
    pagination: state.documents.pagination
  };
}

export default connect(mapStateToProps, { myDocuments, deleteDocuments })(
  UserDocuments
);
