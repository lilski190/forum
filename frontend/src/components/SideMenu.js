// import React, {Component} from "react";
// import { connect } from "react-redux";
// import { getShowPrivatePageAction, getShowUSerManagementAction } from "../actions/UserMangementActions";
// import '../designPrototype/styles/landing.css'
// import * as UserManagmentActions from '../actions/UserMangementActions'
// import { bindActionCreators } from "redux";

// // const mapStateToProps = state => {
// //     return state;
// // }

// class SideMenu extends Component {

//     constructor(props){
//         super(props)
//         this.refreshPage = this.refreshPage.bind(this);
//         this.openPrivatePage = this.openPrivatePage.bind(this);
//         this.openUserManagement = this.openUserManagement.bind(this);
//         // this.state = {page : 'privatePage'}; //privatePage
//                                             //userManagement
//     }

//     refreshPage() {
//         window.location.reload(false);
//       }

//     handleClick(p){
//         this.props.toggleForm();
//         this.setState({page : p})
        
//     }

//     openPrivatePage(){
//         const dispatch = this.props.dispatch;
//         dispatch(getShowPrivatePageAction());
//     }

//     openUserManagement(){
//         const dispatch = this.props.dispatch;
//         dispatch(getShowUSerManagementAction());
//     }

      
//     render(){
//         return(

// <div id = "sideMenu" style= {{  
//                 marginTop: '20%',  
//                 height: "100%",
//                 width: "100%",
//                 alignContent: "left",
//                 }}>

//                 <p style ={{
//                 marginLeft: "25%",
//                 fontSize: "120%",
//                 fontFamily: "monospace",
//                 textAlign:'left',
//             }}>Menu</p>

//             <button onClick = {this.handleClick('privatePage')} style= {{
//                 marginTop: "7%",
//                 marginLeft: "0%",
//                 width: "67%",
//                 float: "left",
//             }}>Home</button> 
//             <button onclick = {this.handleClick('userManagement')} style= {{
//                 marginTop: "7%",
//                 width: "75%",
//                 float: "left",
//             }}>User Management</button>
//             <button onClick = {this.refreshPage} style={{
//                     marginTop: "7%",
//                     width: "84%",
//                     float: "left",
//             }}>Logout</button>
            
//             </div>
//         )
//     }
// }
// const mapDispatchToProps = dispatch => bindActionCreators({
//     showPrivate: UserManagmentActions.getShowPrivatePageAction,
//     showManagment: UserManagmentActions.getShowUSerManagementAction,
// }, dispatch)

// export default connect(mapDispatchToProps)(SideMenu)