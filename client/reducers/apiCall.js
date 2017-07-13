import * as actionTypes from '../actions/actionType';

const initialState = {
  loading: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case (actionTypes.BEGIN_AJAX_CALL):
      return ({ loading: true });
    default:
      return state;
  }
};
