import React from 'react';

export default class Pagination extends React.Component{
  render() {
    return (
      <div className="col s12 m12 l12" >
        <ul className="pagination">
          <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
          <li className="active indigo"><a href="#!">1</a></li>
          <li className="waves-effect"><a href="#!">2</a></li>
          <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
        </ul>
      </div>
    );
  }
}
