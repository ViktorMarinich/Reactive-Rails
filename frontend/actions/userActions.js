import axios from "axios";

export function fetchUser(id) {
  return function(dispatch) {
    axios.get(`/users/${id}`)
      .then((response) => {
        dispatch({type: "FETCH_USER", payload: response.data})
      })
  }
}
export function updateUser(id,params) {
  return function(dispatch) {
    axios.patch(`/users/${id}`, params)
    .then((response) => {
      dispatch({type: "UPDATE_USER", payload: response.data})
     })
  }
}
export function updateNews(params) {
  return function(dispatch) {
    dispatch({type: "UPDATING_NEWS_START"})
    axios.post('/news', params)
      .then(function (response) {
        dispatch({type: "UPDATE_NEWS", payload: response.data})
      })
  }
}
export function updateNewsText(value) {
  return {
    type: 'UPDATE_NEWS_TEXT',
    payload: value,
  }
}

export function updateFiles(value) {
  return {
    type: 'UPDATE_FILES',
    payload: value,
  }
}
export function updateGallery(value) {
  return {
    type: 'UPDATE_GALLERY',
    payload: value,
  }
}
export function updateNewsFiles(value) {
  return {
    type: 'UPDATE_NEWS_FILES',
    payload: value,
  }
}
export function createRelationships(params) {
  return function(dispatch) {
    axios.post(`/relationships`,params)
      .then((response) => {
        dispatch({type: "UPDATE_INCOMING_REQUESTS", payload: response.data})
      })
  }
}
export function updateOutcoming(id) {
  return function(dispatch) {
    axios.get(`/users/${id}`)
      .then((response) => {
        dispatch({type: "UPDATE_OUTCOMING_REQUESTS", payload: response.data})
      })
  }
}
export function deleteFriend(params) {
  return function(dispatch) {
    axios.post('/friends/destroy', params)
    .then((response) => {
      dispatch({type: "DELETE_FRIEND", payload: response.data.id})
    })
  }
}
export function addFriend(params) {
  return function(dispatch) {
    axios.post('/friends', params)
    .then((response) => {
      dispatch({type: "ADD_FRIEND", payload: response.data})
    })
  }
}
export function deleteIncoming(value) {
  return {
    type: 'DELETE_INCOMING',
    payload: value,
  }
}
export function setCounter(value) {
  return {
    type: 'SET_COUNTER',
    payload: value,
  }
}
export function setPrevParams(value) {
  return {
    type: 'SET_PREV_PARAMS',
    payload: value,
  }
}
export function updatingGalleryStart() {
  return {
    type: 'UPDATING_GALLERY_START',
  }
}
