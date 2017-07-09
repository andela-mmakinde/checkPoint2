import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DocumentCard from './DocumentCard.jsx';
import Pagination from '../common/pagination.jsx';
import { myDocuments, deleteDocuments } from '../../actions/documentActions';

class UserDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Documents: ''
    };
    this.deleteDocument = this.deleteDocument.bind(this);
  }

  componentDidMount() {
    this.props.myDocuments();
  }

  componentWillReceiveProps(nextProps) {
    const newDocument = nextProps.documentsFromReducer;
    this.setState({
      Documents: newDocument
    });
  }

  deleteDocument(id) {
    this.props
      .deleteDocuments(id)
      .then(() => (Materialize.toast('Document deleted', 2000)));
  }

  render() {
    // const { documentsFromReducer } = this.props;
    const { Documents } = this.state;
    return (
      <div className="dashboardBackground">
        <Link
          to="/create"
          style={{ margin: '30px' }}
          className="btn-floating btn-large waves-effect waves-light right indigo"
        >
          <i className="material-icons">
            add
          </i>
        </Link>
        <Pagination />
        {!Documents.length
          ? <h2>You have not authored any document</h2>
          : <div className="container">
            <div className="row">
              {Documents.map(docs => (
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
      </div>
    );
  }
}

UserDocuments.propTypes = {
  currentUser: PropTypes.object.isRequired,
  documentsFromReducer: PropTypes.array.isRequired,
  myDocuments: PropTypes.func.isRequired,
  deleteDocuments: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    documentsFromReducer: state.documents,
    currentUser: state.auth.user
  };
}

export default connect(mapStateToProps, { myDocuments, deleteDocuments })(
  UserDocuments
);
