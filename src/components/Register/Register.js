import React from 'react';
import './Register.css';


class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:"",
            name:""
        }
    }
    
    onEmailChange = event => {
        this.setState({email: event.target.value})
    }
    
    onPasswordChange = event => {
        this.setState({password: event.target.value})
    }

    onNameChange = event => {
        this.setState({name: event.target.value})
    }
    
    onSubmitRegister = () =>{
        console.log("hello");
        fetch('https://the-smartest-brain-api.herokuapp.com/register',{
            method: 'post',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
        .then(response =>  response.json())
        .then(userRes => {
            if (userRes.id) {
                this.props.loadUser(userRes);
                this.props.onRouteChange('home');
            }else{
                console.error("Please try registering again!!!");
                this.props.onRouteChange('register');
            }
        })
        .catch(err => 
            console.log("Error signing in user",err)
        )
    }
    
        render(){
            const {onRouteChange} = this.props
    return(
        <article className="formBackground br3 ba b--light-purple bw1 mw6 mv5 center shadow-5 w100 w-50-m w-25-l pa3 pa4-ns">
    <main className="pa4 black-80">
        <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input 
                onChange={this.onNameChange}
                className="pa2 input-reset ba b--light-purple bw1 bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
            </div> 
            <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                onChange={this.onEmailChange}
                className="pa2 input-reset ba b--light-purple bw1 bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
            </div>
            <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input 
                onChange={this.onPasswordChange}
                className="b pa2 input-reset ba b--light-purple bw1 bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
            </div>
            </fieldset>
            <div className="">
            <input 
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
            type="submit" 
            value="Register"
            onClick={this.onSubmitRegister} />
            </div>
            <div className="lh-copy mt3">
            <p onClick={() => onRouteChange('signin')} className="f6 link dim black db pointer">Sign In</p>
            </div>
        </div>
</main>
</article>
    )
    }
    }

export default Register;