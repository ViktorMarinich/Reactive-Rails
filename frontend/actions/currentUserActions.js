import axios from "axios";

export function fetchCurrentUser() {
  return function(dispatch) {
    axios.get("/users/current")
      .then((response) => {
        dispatch({type: "FETCH_CURRENT_USER", payload: response.data})
      })
  }
}
export function destroySession() {
  return function(dispatch) {
    axios.get("/logout")
      .then((response) => {
        dispatch({type: "DESTROY_SESSION", payload: null})
      })
  }
}
export function fetchNews() {
  return function(dispatch) {
    axios.get("/news")
      .then((response) => {
        dispatch({type: "FETCH_NEWS", payload: response.data})
      })
  }
}
