import './App.css';
import PublicPage from './components/PublicPage';
import TopMenu from './components/topMenu';
import PrivatePage from './components/PrivatePage';
import LoginModal from './components/LoginModal';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import LogoutButton from './components/LogoutButton';
import LoginButton from './components/LoginButton';

const mapStateToProps = state => {
  return state
}
// hier werden die einzelen komponents zusammen getragen
class App extends Component {
  render(){
  
    const user = this.props.user 
    console.log(this.props)

    console.log(" in App.js User ist: " + user)
    let workspace;
    let button;

    if(user){
        workspace = <PrivatePage/>
        button=<LogoutButton/>
        
    }
    else{
        workspace = <PublicPage/>
        button= <LoginButton/>
    }

  return (
    <div className="App">
    <TopMenu b = {user} />
    {workspace}
    <LoginModal/>

    </div>
  );
  }
}

export default connect(mapStateToProps)(App);
