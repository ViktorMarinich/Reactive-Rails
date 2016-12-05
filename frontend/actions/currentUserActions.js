import axios from "axios";

export function fetchCurrentUser() {
  return function(dispatch) {
    axios.get("/users/current")
      .then((response) => {
        console.log('resp',response.data)
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
