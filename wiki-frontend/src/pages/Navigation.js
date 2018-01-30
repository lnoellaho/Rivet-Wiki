import React, { Component } from 'react';
import {Grid, PageHeader} from 'react-bootstrap'

export default class Navigation extends Component {
    constructor(props){
      super(props)
      this.state = {
        apiUrl: "http://localhost:3000",
        projects: []
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

  render() {
    return (
        <div className="Navigation">
            <a href= '/' className="BackHome">
            <h1 className="Logo">The Acme Rivet Company</h1></a>
            <div className="btn-group-vertical" data-toggle="buttons">
            {this.state.projects.map((project, index) =>{
              return (
                    <a href={`/Project/${project.id}`}>
                        <button type="button" className="btn btn-primary">{project.name}</button>
                    </a>

              )
            })}

            </div>
        </div>
    );
  }
}
