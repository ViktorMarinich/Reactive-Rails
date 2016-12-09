export default function reducer(state={errors:[] }, action) {
    switch (action.type) {
      case "FETCH_CURRENT_USER": {
        return {...state, currentUser: action.payload}
        break;
      }
      case "DESTROY_SESSION": {
        return {...state, currentUser: action.payload}
        break;
      }
      case "FETCH_NEWS": {
        return {...state, allNews: action.payload}
        break;
      }
      case "SET_ERRORS": {
        return {...state, errors: action.payload}
        break;
      }
    }
    return state
}
