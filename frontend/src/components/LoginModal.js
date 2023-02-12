import React, {Component} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {connect} from 'react-redux';
// const [show, setShow] = useState(false);
import * as authenticationActions from '../actions/AuthenticationAction'
import { bindActionCreators } from "redux";
import Form from 'react-bootstrap/Form';  
import Nav from 'react-bootstrap/Nav';

const mapStateToProps = state => {
    return state;
}


class LoginModal extends Component {
    constructor(props){
        super(props)
        this.state ={
            username: '',
            passwort: '',
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

handleShow(e){
    e.preventDefault();
    // this.setState({show: true});
    const {showLoginDialogAction} = this.props;
    showLoginDialogAction();
}

handleClose(){
    const {hideLoginDialogAction} = this.props;
    hideLoginDialogAction();
    // this.setState({show: false});
}

handleChange(e){
    // console.log("in HandleChange :)")
    const {name, value} = e.target;
    this.setState ({ [name]: value})
    console.log(JSON.stringify(this.state));

}

handleSubmit(e){ //hier username und Pssword als actions übergeben
    e.preventDefault();
    const {username, passwort} = this.state
    console.log(this.state)
    console.log(username) //password is undefined
    console.log(passwort)
    const {auththenticateUserAction} = this.props;
    auththenticateUserAction(username, passwort);
    // console.log("Pushed Login:)")
}

render(){
    var showDialog = this.props.showLoginDialog;
    if(showDialog === undefined){
        showDialog = false;
    }
    return (
    
    <div>
        <Modal show={showDialog} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login-Dialog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>User ID</Form.Label>
                <Form.Control id ="LoginUserIDInput" type="text" placeholder="User ID" name = 'username' onChange={this.handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control id = "LoginPasswordInput" type="password" placeholder="Password" name = 'passwort' onChange={this.handleChange} />
            </Form.Group>
                <Button id = "LoginButton" variant="primary" type="submit" onClick= {this.handleSubmit}>
                Login
            </Button>
            </Form>
        </Modal.Body>
        <Modal.Footer>
        <Nav.Link href="/help">Password vergessen?</Nav.Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
}

const mapDispatchToProps = dispatch => bindActionCreators({
    showLoginDialogAction: authenticationActions.getShowLoginDialogAction,
    hideLoginDialogAction: authenticationActions.getHideLoginDialogAction,
    auththenticateUserAction: authenticationActions.authenicateUser,
}, dispatch)

const ConnectetLoginModal = connect(mapStateToProps, mapDispatchToProps)(LoginModal)
export default ConnectetLoginModal;