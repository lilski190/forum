export const SHOW_USER_MANAGEMENT = 'SHOW_USER_MANAGEMENT'
export const SHOW_PRIVATE_PAGE = 'SHOW_PRIVATE_PAGE '

export function getShowUSerManagementAction()
{
    return{
        type: SHOW_USER_MANAGEMENT
    }
}
export function getShowPrivatePageAction()
{
    return{
        type: SHOW_PRIVATE_PAGE
    }
}


function deleteUSer(userID, password){
    console.log("delete ...")

    return dispatch => {
    //     dispatch(getAuthenticationPendingAction());
    //     login(userID, password) //hier der eigendliche fetch
    //         .then(
    //             userSession => {
    //                 const action = getAuthenticationSuccessAction(userSession);
    //                 dispatch(action);
    //             },
    //             error => {
    //                 dispatch(getAuthenticationErrorAction(error));
    //             }
    //         )
    //         .catch(error => {
    //             dispatch(getAuthenticationErrorAction(error));
    //         })
     }

}

function createUser(userID, password){
    // var user = userID +":"+ password;
    // // var userData = Buffer.from(user).toString('base64');
    // //var userData = atob(user);
    // var userData = btoa(user);
    
    // const requestOptions = {
    //     method: 'GET',
    //     headers: {
    //         'Authorization': 'Basic ' + userData
    //     },
    //     // header: {'Content-Type': 'application/json'},
    //     // body: JSON.stringify({userID, password})
    // };

    // //return fetch('https://localhost:443/authenticate', requestOptions)
    // return fetch('http://localhost:8080/authenticate', requestOptions)
    //         .then(handleResponse)
    //         .then(userSession => {
    //             return userSession;
    //         });
}

function getUser(response){ 
    // console.log(response)
    // const authorizationHeader = response.headers.get('Authorization');

    // return response.text().then(text => {
    //     console.log('Resieved result: ' + authorizationHeader)

    //     const data = text && JSON.parse(text);
    //     var token
    //         if(authorizationHeader){
    //             token = authorizationHeader.split(" ")[1];
    //         }
    //         if (!response.ok){
    //             if(response.status === 401){
    //                 logout(); 
    //             }
    //             // const error = (data && data.message) || response.statusText;
    //             return Promise.reject(response.statusText);
    //         }
    //         else{
    //             let userSession = {
    //                     user: data,
    //                     accessToken: token
    //             }
    //             return userSession
    //         }
    // })
}
