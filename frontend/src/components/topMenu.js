import React, {Component} from "react";
import Nav from 'react-bootstrap/Nav';
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

class TopMenu extends Component {
    render(){
    const user = this.props.b 
    console.log(" im top Menu: " + this.props.b)

    console.log(" in App.js User ist: " + user)
    let button;

    if(user){
        button = <LogoutButton style = {{
            color: 'white',
        }}/>
        
    }
    else{
        button = <LoginButton style = {{
            color: 'white',
        }}/>
    }
        return(
            <div style = {{
                background: '#D9D9D9' 
            }}> 
            <Nav activeKey="/home" onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}>
                
                <Nav.Item style = {{
                    backgroundColor: '#9F9C9C',
                    marginLeft: 'auto', 
                    marginRight: '0',  
                }}>
                    <Nav.Link>{button}</Nav.Link>
                </Nav.Item>
            </Nav>
           </div>
        )
    }
}

export default TopMenu;