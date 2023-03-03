import jwt from "jwt-decode";
import {
  GET_ALL_USERS,
  LOGIN,
  GET_ALL_OPERATORS,
  GET_ALL_MARKER,
  GET_MARKER_OPERATOR
} from "./actions";

const initialState = {
  sessionState: [],
  users: [],
  operators: [],
  allMarker: [],
  markerOperator: []
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      let currentToken = jwt(payload);
      return {
        ...state,
        sessionState: currentToken,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        users: payload,
      };
    case GET_ALL_OPERATORS:
      return {
        ...state,
        operators: payload,
      };
    case GET_ALL_MARKER:
      return {
        ...state,
        allMarker: payload,
      };
      case GET_MARKER_OPERATOR:
        return {
          ...state,
          markerOperator: payload,
        };
    default:
      return state;
  }
};
export default rootReducer;
