import React, { Component } from 'react'
import './index.css'

import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'

import {Redirect} from 'react-router-dom'

import 'materialize-css/dist/css/materialize.min.css'



class Login extends Component{
    constructor(){
        super();
        this.state={
            isLogged: false
        }

        this.responseFacebook= this.responseFacebook.bind(this);
        this.responseGoogle= this.responseGoogle.bind(this);
        this.onFailure= this.onFailure.bind(this);
    }
    componentWillMount(){
        if(localStorage.getItem("fbData")|| localStorage.getItem("googleData")){
            this.setState({ isLogged: true})
        }
    }
    responseFacebook(response){
        //console.log(response);
        //TODO
        localStorage.setItem("fbData", JSON.stringify({
            toke: response.toke,
            email: response.email,
            name: response.name,
            picture: response.picture.data.url,
            social: 'fb'
        }));

        this.setState({ isLogged: true})
    }
    responseGoogle(response){
        console.log(response);
        localStorage.setItem("googleData", JSON.stringify({
            token: response.token,
            email: response.profileObj.email,
            name: response.profileObj.name,
            picture: response.profileObj.imageUrl,
             social:'google'
        }))
        this.setState({isLogged: true})
    }
    onFailure(error){
        console.log(error);
    }    
    render(){
        if(this.state.isLogged){
            return(<Redirect to="/home/"/>)
        }
        return(
            <div className="login">
                 <div className="login-box">
                     <div className="card">
                         <div className="card-content">
                            <FacebookLogin
                                appId="665461730922474"
                                autoLoad={ false }
                                fields="name, email, picture.width(120)"
                                callback={ this.responseFacebook}
                                onFailure={ this.onFailure}
                                textButton="Facebook"
                                cssClass="waves-effect waves-light btn blue darken-2"
                                icon="fa fa-facebook"/>
                            <br/>
                         </div>
                         <div>
                         

                         
                         </div>
                    </div>
                </div>
            </div>
        );

    }
}
export default Login;