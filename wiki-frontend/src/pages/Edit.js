import React, { Component } from 'react';

import { Button, HelpBlock, Alert, Col, ControlLabel, FormGroup, FormControl, Row } from 'react-bootstrap'
import Navigation from './Navigation'

var apiUrl;
if(process.env.NODE_ENV === 'production'){ apiUrl = "/" } else { apiUrl = "http://localhost:3000/" }

export default class Edit extends Component {
    constructor(props){
        super(props)
        this.state = {
            form:{
                name: '',
                location: '',
                collaborator: '',
                information: ''
            },
            project: []
        }
    }

//mounting project to fill form
    componentWillMount(){
        const id = this.props.match.params.id
        fetch(`${apiUrl}api/Project/${id}`)
        .then((rawResponse) =>{
            return rawResponse.json()
        })
        .then((parsedResponse)=>{
            this.setState({project: parsedResponse.project})
        })
    }

//handle form change
    handleChange(event){
        const formState = Object.assign({}, this.state.project)
        formState[event.target.name] = event.target.value
        this.setState({project: formState})
    }

//handle button submit
    handleSubmit(){
      this.handleUpdate(this.state.project)
    }

//handle form update to database
    handleUpdate(params){
        const id = this.props.match.params.id
        fetch(`${apiUrl}api/Project/${id}`, {
            body: JSON.stringify(params),  // <- we need to stringify the json for fetch
            headers: {  // <- We specify that we're sending JSON, and expect JSON back
              'Content-Type': 'application/json'
            },
            method: "PUT"  // <- Here's our verb, so the correct endpoint is invoked on the server
        })
    }

//handling delete with .delete method
    handleDelete(params){
        const id = this.props.match.params.id
        fetch(`${apiUrl}api/Project/${id}`, {
            headers: {  // <- We specify that we're sending JSON, and expect JSON back
              'Content-Type': 'application/json'
            },
            method: "DELETE"  // <- Here's our verb, so the correct endpoint is invoked on the server
        })
    }

//handling delete with .get method
    // deleteProject() {
    //     const id = this.props.match.params.id
    //     fetch(`${this.state.apiUrl}/Project/${id}/delete`)
    //     .then((rawResponse) =>{
    //         return rawResponse.json()
    //     })
    //     .then((parsedResponse)=>{
    //         this.setState({project: parsedResponse.project})
    //     })
    // }


    errorsFor(attribute){
        var errorString = ""
        if(this.props.errors){
            const errors = this.props.errors.filter(error => error.param === attribute )
                if(errors){
                    errorString = errors.map(error => error.msg ).join(", ")
                }
        }
        return errorString === "" ? null : errorString
    }

    render() {
        return (
            <form>
                <Row>
                    <Col lg={4} sm={6}>
                        <Navigation />
                    </Col>
                    <Col lg={8} sm={6} className="FormBox">

                    <Row>
                        <Col xs={12}>{this.props.errors && <Alert bsStyle="danger">
                        Oops! Please check the form and try again.
                          </Alert>
                        }
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                          <FormGroup
                          id="name-form-group"
                          validationState={this.errorsFor('name') && 'error'}>
                            <ControlLabel id="name">Project Name</ControlLabel>
                            <FormControl
                              type="text"
                              name="name"
                              value={this.state.project.name}
                              onChange={this.handleChange.bind(this)}
                            />
                            {this.errorsFor('name') &&
                            <HelpBlock id="name-help-block">{this.errorsFor('name')}</HelpBlock>
                            }
                          </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12}>
                          <FormGroup
                            id="location-form-group"
                            validationState={this.errorsFor('location') && 'error'}>
                            <ControlLabel id="location">Location</ControlLabel>
                            <FormControl
                                type="text"
                                name="location"
                                value={this.state.project.location}
                                onChange={this.handleChange.bind(this)}
                            />
                            {this.errorsFor('location') &&
                            <HelpBlock id="location-help-block">{this.errorsFor('location')}</HelpBlock>
                            }
                          </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12}>
                          <FormGroup
                            id="collaborator-form-group"
                            validationState={this.errorsFor('collaborator') && 'error'}>
                            <ControlLabel id="collaborator">Collaborator</ControlLabel>
                            <FormControl
                                type="text"
                                name="collaborator"
                                value={this.state.project.collaborator}
                                onChange={this.handleChange.bind(this)}
                            />
                            {this.errorsFor('collaborator') &&
                            <HelpBlock id="collaborator-help-block">{this.errorsFor('collaborator')}</HelpBlock>
                            }
                          </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12}>
                          <FormGroup
                            id="information-form-group"
                            validationState={this.errorsFor('information') && 'error'}>
                            <ControlLabel id="information">Information</ControlLabel>
                            <FormControl
                                componentClass='textarea'
                                type="text"
                                name="information"
                                value={this.state.project.information}
                                onChange={this.handleChange.bind(this)}
                              />
                              {this.errorsFor('information') &&
                              <HelpBlock id="information-help-block">{this.errorsFor('information')}</HelpBlock>
                              }
                          </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Button
                                id="submit" className="btn btn-secondary editbutt"
                                 onClick={this.handleSubmit.bind(this)}
                                > <a href={`/Project/${this.state.project.id}`}>Save Changes</a>
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Button
                            id="submit" className="btn btn-secondary removebutt"
                            onClick={this.handleDelete.bind(this)}
                        >
                            <a href="/">Delete Project</a>
                        </Button>
                    </Row>
                    </Col>
                </Row>
            </form>
        );
    }
}
