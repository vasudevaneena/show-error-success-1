import React, { Component } from 'react';
import './App.css';


class App extends Component {

  constructor(props) {
    super(props);
    this.user = {value: '',
    disable:true,   
    email: '',
            password: '',                
            checkbox:''};
    
    this.handleChecked = this.handleChecked.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateEmail = this.updateField.bind(this, 'email');
    this.updatePassword = this.updateField.bind(this, 'password');
    //this.updateEmail = this.updateEmail.bind(this);
  }

//   updateEmail (event) {
   
//     const isChecked = event.target.value;
//   if(isChecked){
//       this.setState({email: event.target.value});
//       console.log(this.user.email)
//   }
  
// }
  updateField(name, event) {
    const value = event.target.value;
    
    //this.setState({name: value});
    if(name==='email'){
        //this.setState({email: event.target.value});
        this.setState({
          email: event.target.value
      }, function () {
          console.log(this.user.email);
      });
        
    }
    else if (name==='password'){
        this.setState({password: event.target.value});
    }
    //this.setState({name: value});
    //this.user[name] = value;
}

componentDidUpdate() {
  console.log('inside componentDidUpdate',this.user.email);
}
registerUser(user) {
    // Mocked response of user submission to register
    return new Promise((resolve) => {
        let response = "User has been successfully registered";
        const errors = {email: [], password: []};
        const validEmail = /\S+@\S+\.\S+/.test(user.email);

        if(!user.email) {
            errors.email.push('Email required');
        } else if (!validEmail) {
            errors.email.push('Email must be valid');
        }

        if(!user.password) {
            errors.password.push('Password required');
        } else if(user.password.length < 8 ) {
            errors.password.push(
                'Password must contain at least 8 characters');
        }

        for(const errorType in errors) {
            if(errors[errorType].length) {
                response = errors;
                break;
            }
        }

        setTimeout(() => {
            return resolve(response);
        }, Math.random() * 1000 + 500);
    });
}

async handleSubmit(event) {
    event.preventDefault();
    const response = await this.registerUser(this.user);
}
  handleChecked (event) {
   
      const isChecked = event.target.checked;
    if(isChecked){
        this.setState({disable: false});
        document.getElementById('registerButton').className = 'cta';
    }
    else {
        this.setState({disable: true});
        document.getElementById('registerButton').className = 'disable-cta';
    }
    // this.setState({disabled: !this.user.disabled,
    //     check: !this.user.check});
  }
//   handleChange(event) {
//     this.setState({value: event.target.value});
//   }



  render() {
   console.log('inside render');
    return (
    
      <section>
        <header>
          <h1>HealthShare Front-End Test</h1>
        </header>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email address
            <input
              className="input-style"
              name="email"
              onChange={this.updateEmail}
              placeholder="e.g name@example.com"
            />
          </label>
          <label>
            Password
            <input
              className="input-style"
              name="password"
              onChange={this.updatePassword}
              placeholder="••••••••"
            />
          </label>
        
          <button type="submit" id="registerButton"  className = 'cta' >Register</button>
                    
          
         
        </form>
      </section>
    );
  }

}

export default App;

