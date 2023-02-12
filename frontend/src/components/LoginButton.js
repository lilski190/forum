import React, {Component} from "react";
import '../designPrototype/styles/landing.css'

import {connect } from 'react-redux';

import {getShowLoginDialogAction} from '../actions/AuthenticationAction'

class LoginButton extends Component {

    constructor(props){
        super(props)
        this.showLoginDialog = this.showLoginDialog.bind(this);
    }
    showLoginDialog(){
        const dispatch = this.props.dispatch;
        dispatch(getShowLoginDialogAction());
    }

    render(){
        return(
        <button id="OpenLoginDialogButton"  onClick = {this.showLoginDialog} style={{
                                        
                                        }}>Login</button>
                                        )
        }
    }                                                

export default connect()(LoginButton)