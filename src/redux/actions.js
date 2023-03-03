import axios from "axios";

// export const REGISTER = "REGISTER"
export const LOGIN = "LOGIN"
export const GET_ALL_USERS = "GET_ALL_USERS"
export const GET_ALL_OPERATORS = "GET_ALL_OPERATORS"
export const GET_ALL_MARKER = "GET_ALL_MARKER"
export const GET_MARKER_OPERATOR = "GET_MARKER_OPERATOR"



const deploy = "https://pruebatecnica.up.railway.app";


export function getAllUsers() {
  return async function (dispatch) {
    try {
      const user = await axios.get(`${deploy}/usuario/todos`);
      return dispatch({
        type: GET_ALL_USERS,
        payload: user.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAllOperators() {
  return async function (dispatch) {
    try {
      const user = await axios.get(`${deploy}/usuario/operarios`);
      return dispatch({
        type: GET_ALL_OPERATORS,
        payload: user.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAllMarker() {
  return async function (dispatch) {
    try {
      const user = await axios.get(`${deploy}/marcador`);
      return dispatch({
        type: GET_ALL_MARKER,
        payload: user.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getMarkerOperator(firstName) {
  return async function (dispatch) {
    try {
      const user = await axios.get(`${deploy}/marcador/operator?firstName=${firstName}`);
      return dispatch({
        type: GET_MARKER_OPERATOR,
        payload: user.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}





export function createUser(payload) {
  return async function (dispatch) {
    try {
      let user = await axios.post(`${deploy}/ingresar/registro`, payload);
      console.log("------", user.data);
    } catch (error) {
      console.log(error);
    }
  };
}

export function createMarker(payload) {
  return async function (dispatch) {
    try {
      let user = await axios.post(`${deploy}/marcador`, payload);
      console.log("------", user.data);
    } catch (error) {
      console.log(error);
    }
  };
}

// export function createUserFromAdmin(payload) {
//   return async function (dispatch) {
//     try {
//       let user = await axios.post(`${deploy}/users`, payload);
//       console.log("------", user.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }

export function loginUser(payload) {
    return async function (dispatch) {
      try {
        let token = await axios.post(`${deploy}/ingresar/login`, payload);
        return dispatch({
          type: LOGIN,
          payload: token.data
        })
      } catch (error) {
        console.log(error.message);
      }
    };
}

