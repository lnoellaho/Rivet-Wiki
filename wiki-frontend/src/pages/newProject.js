import React, { Component } from 'react';
import { Button, HelpBlock, Alert, Col, ControlLabel, FormGroup, FormControl, Row } from 'react-bootstrap'
import Navigation from './Navigation'

export default class NewProject extends Component {
  constructor(props){
      super(props)
      this.state = {
        form:{
          name: '',
          location: '',
          collaborator: '',
          information: ''
        }
      }
    }

handleChange(event){
  const formState = Object.assign({}, this.state.form)
  formState[event.target.name] = event.target.value
  this.setState({form: formState})
}

handleSubmit(){
  this.props.onSubmit(this.state.form)
}

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
                      value={this.state.form.name}
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
                        value={this.state.form.location}
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
                        value={this.state.form.collaborator}
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
                        value={this.state.form.information}
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
                    id="submit" className="btn btn-secondary HomeButton But"
                    onClick={this.handleSubmit.bind(this)}
                    > Add Project
                </Button>
                </Col>
              </Row>
              </Col>
            </Row>

        </form>
    );
  }
}
