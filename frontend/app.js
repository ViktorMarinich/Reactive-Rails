import React, { Component } from 'react';
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as currentUserActions from "./actions/currentUserActions"
import * as userActions from "./actions/userActions"
import { Link } from 'react-router';

class App extends Component {
  componentDidMount(){
    this.props.currentUserActions.fetchCurrentUser()
  }
  SignOut(e){
    e.preventDefault()
    this.props.currentUserActions.destroySession()
    this.props.router.push(`/`)
  }
  render() {
    const {children, errors, current_user, files, router, counter, allNews} = this.props
    const {fetchNews, fetchCurrentUser, setErrors} = this.props.currentUserActions
    const {updateFiles, setCounter} = this.props.userActions
    let i =0
    const error_list = (typeof errors.length !='undefined')? errors.map((error)=>{
      i=i+1
      return <h4  key={i} style={{ color: 'red' , textAlign: 'left', paddingLeft: '20px'}}>{error}</h4>
    }): ''
    if (typeof current_user=='undefined') {return <div>Loading...</div>}
    if (current_user== null){
      return(
        <div>
          {(error_list=='')? '':
          <div style={{ textAlign: 'center'}}>
            <div style={{width: '400px', display: 'inline-block'}}>
              <h3 style={{ textAlign: 'left', color: 'red'}} > Something went wrong:</h3>
              {error_list}
            </div>
          </div>}
          <div style={{display: 'flex', width: '1000px',flexDirection: 'row', justifyContent: 'space-around'}}>
            <div style={{width: '200px', display: 'inline-block'}}>
              <SignIn router={router}  setErrors={setErrors} fetchCurrentUser={fetchCurrentUser}/>
            </div>
            <div style={{width: '200px', display: 'inline-block'}}>
              <SignUp router={router}  setErrors={setErrors} files={files}
              updateFiles={updateFiles} fetchCurrentUser={fetchCurrentUser}/>
            </div>
          </div>
      </div>

    )}
    return (
      <div style={{display: 'flex', width: '1000px',flexDirection: 'row'}}>
        <div>
        <h3 style={{textAlign: 'center'}}>Menu</h3>
        <div style={{ width: '200px', borderStyle: 'double',textAlign: 'center', backgroundColor:'#4a6877', paddingTop: '10px', paddingBottom: '10px'}}>
          <p><Link to={`/user/${current_user.id}`}>My profile</Link></p>
          <p><Link to={`/settings`}>Settings</Link></p>
          <p><Link to={`/friends`}>Friends</Link></p>
          <p><Link to={`/gallery`}>Gallery</Link></p>
          <p><Link to={`/news`}>News</Link></p>
          <p><Link to='/' onClick={this.SignOut.bind(this)}>Sign Out</Link></p>
        </div>
        </div>
        <div style={{paddingLeft: '10px'}}>
          {children && React.cloneElement(children, {current_user:current_user,
          files: files, router: router, counter: counter, updateFiles: updateFiles,
          allNews: allNews, fetchNews: fetchNews, setCounter: setCounter,
          fetchCurrentUser: fetchCurrentUser})}
        </div>
     </div>
  );
  }
}
function mapStateToProps(state) {
  return {
    current_user: state.currentUser.currentUser,
    allNews: state.currentUser.allNews,
    files: state.user.files,
    counter: state.user.counter,
    errors: state.currentUser.errors
  }
}

function mapDispatchToProps(dispatch) {
  return {
    currentUserActions: bindActionCreators(currentUserActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
