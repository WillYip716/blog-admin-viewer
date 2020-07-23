import React from 'react'
import axios from 'axios';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            username: "",
            password: ""
        };
    }

    onChange = (e) => {
        /*
            Because we named the inputs to match their
            corresponding values in state, it's
            super easy to update the state
        */
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        // get our form data out of state
        const { username, password } = this.state;

        axios.post('http://10.0.2.15:4000/login', { username, password})
            .then((result) => {
                if(result.token){
                    localStorage.setItem('user', result.token);
                    //this.props.history.push('/');
                }
        });
    }

    render() {
        const { username, password } = this.state;
        return (
            <section>
                <form onSubmit={this.onSubmit}>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={this.onChange}
                    />
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.onChange}
                    />                 
                    <button type="submit">Submit</button>
                </form>
            </section>       
        );
    }
}

export default Login;