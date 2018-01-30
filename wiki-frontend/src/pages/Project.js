import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Grid, Row, Col} from 'react-bootstrap'
import Navigation from './Navigation'

export default class Project extends Component {
    constructor(props){
      super(props)
      this.state = {
        apiUrl: "http://localhost:3000",
        project: []
      }
    }
    componentWillMount(){
        const id = this.props.match.params.id
        fetch(`${this.state.apiUrl}/Project/${id}`)
        .then((rawResponse) =>{
            return rawResponse.json()
        })
        .then((parsedResponse)=>{
            this.setState({project: parsedResponse.project})
        })
    }


  render() {
    return (
        <div className="Project">
            <Row>
                <Col lg={4}>
                    <Navigation />
                    <a href='/NewProject'>
                        <button type="button" className="btn btn-secondary HomeButton">Add Project</button>
                    </a>
                </Col>
                <Col lg={8}>
                    <h2>{this.state.project.name}</h2>
                    <h4>Location: {this.state.project.location}</h4>
                    <h4>Collaborator: {this.state.project.collaborator}</h4>
                    <h4 className="Info">Information</h4>
                    <p> {this.state.project.information}</p>
                </Col>
            </Row>
        </div>
    );
  }
}
