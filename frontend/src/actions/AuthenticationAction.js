export const SHOW_LOGIN_DIALOG = 'SHOW_LOGIN_DIALOG'
export const HIDE_LOGIN_DIALOG = 'HIDE_LOGIN_DIALOG'

export const AUTHENTICATION_PENDING = 'AUTHENTICATION_PENDING'
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS'
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR'

export function getShowLoginDialogAction()
{
    return{
        type: SHOW_LOGIN_DIALOG
    }
}
export function getHideLoginDialogAction()
{
    return{
        type: HIDE_LOGIN_DIALOG
    }
}

export function getAuthenticationPendingAction()
{
    return{
        type: AUTHENTICATION_PENDING
    }
}

export function getAuthenticationSuccessAction(userSession)
{
    return{
        type: AUTHENTICATION_SUCCESS,
        user: userSession.user,
        accessToken: userSession.accessToken
    }
}

export function getAuthenticationErrorAction(error)
{
    return{
        type: AUTHENTICATION_ERROR,
        error: error,
    }
}

export function authenicateUser(userID, password){
    console.log("authenicate ...")

    return dispatch => {
        dispatch(getAuthenticationPendingAction());
        login(userID, password) //hier der eigendliche fetch
            .then(
                userSession => {
                    const action = getAuthenticationSuccessAction(userSession);
                    dispatch(action);
                },
                error => {
                    dispatch(getAuthenticationErrorAction(error));
                }
            )
            .catch(error => {
                dispatch(getAuthenticationErrorAction(error));
            })
    }
}

function login(userID, password){
    var user = userID +":"+ password;
    // var userData = Buffer.from(user).toString('base64');
    //var userData = atob(user);
    var userData = btoa(user);
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + userData
        },
        // header: {'Content-Type': 'application/json'},
        // body: JSON.stringify({userID, password})
    };

    //return fetch('https://localhost:443/authenticate', requestOptions)
    return fetch('http://localhost:8080/authenticate', requestOptions)
            .then(handleResponse)
            .then(userSession => {
                return userSession;
            });
}

function handleResponse(response){ //status = unortherized :(
    console.log(response)
    const authorizationHeader = response.headers.get('Authorization');

    return response.text().then(text => {
        console.log('Resieved result: ' + authorizationHeader)

        const data = text && JSON.parse(text);
        var token
            if(authorizationHeader){
                token = authorizationHeader.split(" ")[1];
            }
            if (!response.ok){
                if(response.status === 401){
                    logout(); 
                }
                // const error = (data && data.message) || response.statusText;
                return Promise.reject(response.statusText);
            }
            else{
                let userSession = {
                        user: data,
                        accessToken: token
                }
                return userSession
            }
    })
}

function logout(){
    console.log("Login fehlgeschlagen")
    console.error("fehler beim einlogen ")
}