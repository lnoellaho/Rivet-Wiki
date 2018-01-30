import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import Home from './pages/Home'
import Project from './pages/Project'
import NewProject from './pages/newProject'

import Edit from './pages/Edit'

class App extends Component {
    constructor(props){
      super(props)
      this.state = {
        apiUrl: "http://localhost:3001",
        projects: [],
        newProjectSuccess: false,
        errors: null
      }
    }
    componentWillMount(){
      fetch(`${this.state.apiUrl}/`)
      .then((rawResponse) =>{
        return rawResponse.json()
      })
      .then((parsedResponse)=>{
        this.setState({projects: parsedResponse.projects})
      })
    }

    handleNewProject(params){
        fetch(`${this.state.apiUrl}/`, {
            body: JSON.stringify(params),  // <- we need to stringify the json for fetch
            headers: {  // <- We specify that we're sending JSON, and expect JSON back
              'Content-Type': 'application/json'
            },
            method: "POST"  // <- Here's our verb, so the correct endpoint is invoked on the server
        })

        .then((rawResponse)=>{
          return rawResponse.json()
        })
        .then((parsedResponse) =>{
          if(parsedResponse.errors){ // <- Check for any server side errors
            this.setState({errors: parsedResponse.errors})
          }else{
            const projects = Object.assign([], this.state.projects)
            projects.push(parsedResponse.project) // <- Add the new cat to our list of cats
            this.setState({
              projects: projects,  // <- Update cats in state
              errors: null, // <- Clear out any errors if they exist
              newProjectSuccess: true // <- This is the new flag in state
            })
          }
        })
      }



    render() {
        return (
            <Router>
              <div className="App">
                    {/* sending the home component this.state.projects */}
                    <Route exact path="/" render={props => (
                        <Home projects={this.state.projects} />
                    )}/>
                    <Route path="/:id/Edit" component={Edit} />
                    <Route path="/Project/:id" component={Project} />

                    <Route exact path="/NewProject" render={props => (
                        <div>
                            <NewProject
                               onSubmit={this.handleNewProject.bind(this)}
                               errors={this.state.errors && this.state.errors.validations}/>
                               {this.state.newProjectSuccess && <Redirect to="/" /> }
                        </div>
                    )}/>


              </div>
          </Router>
        );
    }
}

export default App;
