import React, {Component} from "react";
import '../designPrototype/styles/landing.css'

class PrivatePage extends Component {
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
                
                <div style= {{  
                marginTop: '20%',
                marginLeft:'25%',
                height: "100%",
                width: "100%",
                }}>
                <p style ={{
                fontSize: "120%",
                fontFamily: "monospace",
                textAlign:'left',
            }}>Menu</p>
                </div>
                
                <div style = {{padding: '25%',
                             width : '100%',
                             height : '100%'}}>
                <h1>WELCOME</h1>
                <p>Here is your Private Page</p>
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

export default PrivatePage;