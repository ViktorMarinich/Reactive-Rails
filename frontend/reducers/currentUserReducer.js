export default function reducer(state={ currentUser: null }, action) {
    switch (action.type) {
      case "FETCH_CURRENT_USER": {
        return {...state, currentUser: action.payload}
      }
    }
    return state
}
