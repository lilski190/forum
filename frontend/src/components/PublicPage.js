import React, {Component} from "react";
import '../designPrototype/styles/landing.css'
import LoginButton from "./LoginButton";

class PublicPage extends Component {
    render(){
        return(
            // hier die teile aus bootstrap einfac rauskopiert
           <div className="page-content" id="LandingPage" style ={{alignContent: 'center',
           display : 'grid',
           margin: '0',
           alignItems: 'stretch',
           gridTemplateColumns: '1fr 1fr',
           gridTemplateRows: '1fr 1fr',
           background: 'linear-gradient(-110deg, #F2CF54 45%, #1FA6A6 45%)',
           }}>
                <div style = {{padding: '35%',
                            //  backgroundColor: '#1FA6A6',
                             width : '100%'}}>
                <h1>WELCOME</h1>
                <p>We are a Forum for...</p>
                </div>

                <div style= {{  
                        // backgroundColor: '#F2CF54',
                        }}>
                    <div style = {{
                        height: "100%",
                        width: "100%",
                        fontSize: "300%",
                        fontFamily: "monospace"
                    }}>
                    <LoginButton 
                        style = {{
                            buttonColor: 'black'

                        }}
                     />
                    </div>
                </div>
                <div style = {{
                        height: "100%",
                        width: "200%",
                        background: 'linear-gradient(110deg, #9F9C9C 49%, #716C6C 45%)'}}>              </div>
                
           </div>
        )
    }
}

export default PublicPage;