export default function reducer(state={user: [], text: '',files: [],news_files: [], counter: 0 }, action) {
    switch (action.type) {
      case "FETCH_USER": {
        return {...state, user: action.payload}
        break;
      }
      case "UPDATE_USER": {
        return {...state, user: {...state.user, name: action.payload.name, email: action.payload.email} }
        break;
      }
      case "UPDATE_NEWS": {
      return {...state, user: {...state.user, wall: {...state.user.wall, news: [...state.user.wall.news, action.payload]}}}
      break;
      }
      case "UPDATE_NEWS_TEXT": {
        return {...state, text: action.payload }
        break;
      }
      case "UPDATE_FILES": {
        return {...state, files: action.payload }
        break;
      }
      case "UPDATE_GALLERY": {
        return {...state, user: {...state.user, gallery: {...state.user.gallery, images: state.user.gallery.images.concat(action.payload)}} }
        break;
      }
      case "UPDATE_NEWS_FILES": {
        return {...state, news_files: action.payload }
        break;
      }
      case "UPDATE_INCOMING_REQUESTS": {
        return {...state, user: {...state.user, incoming: [...state.user.incoming, action.payload ] } }
        break;
      }
      case "UPDATE_OUTCOMING_REQUESTS": {
        return {...state, user: {...state.user, outcoming: [...state.user.incoming, action.payload ] } }
        break;
      }
      case "DELETE_FRIEND": {
        return {...state, user:{...state.user, friends: state.user.friends.filter(friend => friend.id !== action.payload) } }
        break;
      }
      case "ADD_FRIEND": {
        return {...state, user:{...state.user, friends: state.user.friends.concat(action.payload) } }
        break;
      }
      case "DELETE_INCOMING": {
        return {...state, user:{...state.user, incoming: state.user.incoming.filter(friend => friend.id !== action.payload) } }
        break;
      }
      case "SET_COUNTER": {
        return {...state,  counter: action.payload }
        break;
      }
      case "SET_PREV_PARAMS": {
        return {...state,  prevParams: action.payload }
        break;
      }
  }
    return state
}
