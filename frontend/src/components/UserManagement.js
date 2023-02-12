import React, {Component} from "react";
import '../designPrototype/styles/landing.css'
import SideMenu from "./SideMenu";

class UserManagement extends Component {
    render(){
        return(
            // hier die teile aus bootstrap einfac rauskopiert
            <div id="PrivatePage" style ={{alignContent: 'center',
            display : 'grid',
            margin: '0',
            alignItems: 'stretch',
            gridTemplateColumns: '0.3fr 1fr ',
            gridTemplateRows: '1fr 1fr',
            background: 'linear-gradient(-100deg, #1FA6A6 75%, #F2CF54 20%)',
            }}> 
                <SideMenu/>
                
                <div style = {{padding: '3%',
                             width : '100%',
                             height : '100%'}}>
                <h1>User Management</h1>
                </div>
                <div style = {{
                        height: "100%",
                        width: "450%",
                        background: 'linear-gradient(100deg, #9F9C9C 19%, #716C6C 19%)'}}>              
                        </div>
                
           </div>
        )
    }
}

export default UserManagement;