import React, { Component } from "react";
import "./App.css";
import Response from "./Responsecomp.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.user = {
      email: "",
      password: ""
    };
    this.state = {
      errors: {},
      succesResponse: "",
      email: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateEmail = this.updateField.bind(this, "email");
    this.updatePassword = this.updateField.bind(this, "password");
  }

  updateField(name, event) {
    const value = event.target.value;
    this.user[name] = value;
    if (name === "email") {
      this.setState({ email: value });
    } else {
      this.setState({ password: value });
    }
  }

  registerUser(user) {
    // Mocked response of user submission to register
  
    return new Promise(resolve => {
      let response = "User has been successfully registered";
      const errors = { email: [], password: [] };
      const validEmail = /\S+@\S+\.\S+/.test(user.email);

      if (!user.email) {
        errors.email.push("Email required");
      } else if (!validEmail) {
      
        errors.email.push("Email must be valid");
      }

      if (!user.password) {
        errors.password.push("Password required");
      } else if (user.password.length < 8) {
        
        errors.password.push("Password must contain at least 8 characters");
      }
     
      for (const errorType in errors) {
        if (errors[errorType].length) {
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
    const response = await this.registerUser(this.state);
   
    if (response.email || response.password) {
      this.setState({ errors: response, succesResponse: "" });
    } else {
      this.setState({ succesResponse: response, errors: "" });
    }
  }

  render() {
    return (
      <section>
        <header>
          <h1>HealthShare Front-End Test</h1>
        </header>

        <form>
          <Response props={this.state} />
          <label>
            Email address
            <input
              type="text"
              name="email"
              onChange={this.updateEmail}
              placeholder="e.g name@example.com"
              id="test-email"
              value={this.state.email}
            />
          </label>
          <label>
            Password
            <input
              name="password"
              onChange={this.updatePassword}
              placeholder="••••••••"
              id="test-password"
              value={this.state.password}
            />
          </label>
          <button
            className="cta"
            type="submit"
            id="test-button"
            onClick={this.handleSubmit}
          >
            Register
          </button>
        </form>
      </section>
    );
  }
}

export default App;
