import React, {Component} from "react";
import '../designPrototype/styles/landing.css'

import {connect } from 'react-redux';



class LogoutButton extends Component {

    // constructor(props){
    //     super(props)
    // }

    refreshPage() {
        window.location.reload(false);
      }
      
    render(){
        return(
        <button id="LogoutButton" onClick = {this.refreshPage} style={{
                                        }}>Logout</button>
                                        )
        }
    }                                                

export default connect()(LogoutButton)