import React, {Component} from 'react';
import '../SignIn/SignIn.css';

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            registerName:'',
            registerEmail:'',
            registerPassword:''
        }
    }

    onNameChange = (event)=>{
        this.setState({registerName: event.target.value});
    }

    onEmailChange = (event)=>{
        this.setState({registerEmail: event.target.value});
    }

    onPasswordChange = (event)=>{
        this.setState({registerPassword: event.target.value});
    }

    onSubmitRegister = ()=> {
        fetch('https://whispering-stream-46813.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.registerEmail,
                password: this.state.registerPassword,
                name: this.state.registerName
            })
        }).then(response => response.json())
        .then(user =>{
            if(user.id){
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
        
    }
    render(){
        return (
            <article className="form-text-color br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 form-center">
                <main className="pa4 main-background-color">
                    <div className="measure">
                        <fieldset className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6 input-text-color" htmlFor="name">Name</label>
                                <input 
                                className="pa2 input-reset ba bg-transparent input-border  w-100" 
                                type="text" 
                                name="name" 
                                id="name"
                                onChange={this.onNameChange}/>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6 input-text-color" htmlFor="email-address">Email</label>
                                <input 
                                className="pa2 input-reset ba bg-transparent input-border w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                                onChange={this.onEmailChange}/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6 input-text-color" htmlFor="password">Password</label>
                                <input 
                                className="b pa2 input-reset ba bg-transparent input-border w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                                onChange={this.onPasswordChange}/>
                            </div>
                        </fieldset>
                        <div className="">
                                <input 
                                onClick={this.onSubmitRegister}
                                className="b ph3 pv2 input-reset button-color ba bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Register"
                                />
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}
export default Register;