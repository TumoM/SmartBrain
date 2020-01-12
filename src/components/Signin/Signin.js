import React from 'react';
import './Signin.css';


class Signin extends React.Component{
constructor(props){
    super(props);
    this.state = {
        signInEmail:"",
        signInPassword:""
    }
}

onEmailChange = event => {
    this.setState({signInEmail: event.target.value})
}

onPasswordChange = event => {
    this.setState({signInPassword: event.target.value})
}

onSubmitSignin = () =>{
    fetch('http://localhost:4000/signin',{
        method: 'post',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: this.state.signInEmail,
            password: this.state.signInPassword
        })
    })
    .then(response => response.json())
    .then(user => {
        if(user.id){
        this.props.loadUser(user);
        this.props.onRouteChange('home');
        }else{
        console.log("Please try singing in again!!!");
        
        this.props.onRouteChange('signin');
        }
    })
    .catch(err => 
    console.log("Error signing in user",err)
    )
}

    render(){
        const {onRouteChange} = this.props
return(
    <article className="br3 ba b--light-purple bw1 mw6 mv5 center shadow-5 w100 w-50-m w-25-l pa3 pa4-ns">
    <main className="pa4 black-80">
        <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input onChange={this.onEmailChange} className="pa2 input-reset ba b--light-purple bw1 bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
            </div>
            <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba b--light-purple bw1 bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
            </div>
            </fieldset>
            <div className="">
            <input 
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
            type="submit" 
            value="Sign in"
            onClick={this.onSubmitSignin} />
            </div>
            <div className="lh-copy mt3">
            <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
            </div>
        </div>
</main>
</article>
)
}
}

export default Signin;