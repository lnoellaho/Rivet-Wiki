import React, { Component } from 'react';

var apiUrl if(process.env.NODE_ENV === 'production'){ apiUrl = "/" } else { apiUrl = "http://localhost:3000/" }

export default class Navigation extends Component {
    constructor(props){
        super(props)
        this.state = {
            projects: []
        }
    }
    componentWillMount(){
        fetch(`${apiUrl}/api`)
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
                    <h1 className="Logo">The Acme Rivet Company</h1>
                </a>
                <div className="btn-group-vertical" data-toggle="buttons">
                    {this.state.projects.map((project, index) =>{
                        return (
                            <a href={`/Project/${project.id}`} key={project.id}>
                                <button type="button" className="btn btn-primary">{project.name}</button>
                            </a>

                        )
                    })}
                </div>
            </div>
        );
    }
}
