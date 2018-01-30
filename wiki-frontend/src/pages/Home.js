import React, { Component } from 'react';
import {Row, Col, Grid, PageHeader, ListGroup, ListGroupItem} from 'react-bootstrap'

export default class Home extends Component {
  render() {
    return (
        <div className="Home">
            <Grid>
                <PageHeader>The Acme Rivet Company</PageHeader>
            </Grid>
            <h2>List of Projects</h2>
             <Row>
                <Col xs={12} lg={2}>
                </Col>
                <Col xs={12} lg={8}>
                  <ListGroup className="ListGroup">
                    {this.props.projects.map((project, index) =>{
                      return (

                        <ListGroupItem
                          key={index}
                          header={
                            <h4>
                            <a href={`/Project/${project.id}`}>
                              <span className='project-name'>
                                {project.name}
                              </span>
                              </a>
                            </h4>
                          }>
                        </ListGroupItem>
                      )
                    })}
                  </ListGroup>
                  <a href='/NewProject'>
                      <button type="button" className="btn btn-secondary HomeButton">Add Project</button>
                  </a>
                </Col>
                <Col xs={12} lg={2}>
                </Col>
            </Row>
        </div>
    );
  }
}
