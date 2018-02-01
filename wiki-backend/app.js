var express = require('express');
var cors = require('cors')
var app = express();
var bodyParser = require('body-parser')
var validator = require('express-validator')
var Project = require('./models').Project

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(validator())
app.use(cors())

//getting all the projects on the home page
app.get('/', (req, res) => {
    Project.findAll().then( (projects) =>{
        res.json({projects:projects})
    })
})

//getting single project
app.get('/Project/:id', (req, res) => {
    Project.findById(req.params.id).then( (project) =>{
        res.json({project:project})
    })
})

//updating project
app.put('/Project/:id', (req, res) => {
    Project.findById(req.params.id).then( (project) =>{
        project.update({
            name: req.body.name,
            location: req.body.location,
            collaborator: req.body.collaborator,
            information: req.body.information
        }).then((project)=> {
            res.json({project:project})
        })
    })
})

// deleting with .get
// app.get('/Project/:id/delete', (req, res)=> {
//     Project.findById(req.params.id).then( (project) => {
//         project.destroy().then((project) => {
//             res.json({project:project})
//         })
//     })
// })

//deleting with .delete yayyyy
app.delete('/Project/:id', (req, res)=> {
    Project.findById(req.params.id).then( (project) => {
        project.destroy().then((project) => {
            res.json({project:project})
        })
    })
})

//posting form
app.post('/', (req, res) => {
    req.checkBody('name', 'Is required').notEmpty()
    req.checkBody('location', 'Is required').notEmpty()
    req.checkBody('collaborator', 'Is required').notEmpty()
    req.checkBody('information', 'Is required').notEmpty()

    req.getValidationResult()

        .then((validationErrors) =>{
            if(validationErrors.isEmpty()){
                Project.create({
                    name: req.body.name,
                    location: req.body.location,
                    collaborator: req.body.collaborator,
                    information: req.body.information
                }).then((project)=>{
                    res.status(201)
                    res.json({project: project})
                })
            }else{
                res.status(400)
                res.json({errors: {validations: validationErrors.array()}})
            }
        })
})

    module.exports = app
