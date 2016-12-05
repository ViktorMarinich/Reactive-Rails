export default function reducer(state={user: [], text: '' }, action) {
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
  }
    return state
}
