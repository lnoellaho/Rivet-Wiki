var express = require('express');
var cors = require('cors')
var app = express();
var bodyParser = require('body-parser')
var validator = require('express-validator')
var Project = require('./models').Project
var path = require('path')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(validator())
app.use(cors())

app.use(express.static(path.resolve(__dirname, '../wiki-frontend/build')));

//getting all the projects on the home page
app.get('/api', (req, res) => {
    Project.findAll().then( (projects) =>{
        res.json({projects:projects})
    })
})

//getting single project
app.get('/api/Project/:id', (req, res) => {
    Project.findById(req.params.id).then( (project) =>{
        res.json({project:project})
    })
})

//updating project
app.put('/api/Project/:id', (req, res) => {
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
app.delete('/api/Project/:id', (req, res)=> {
    Project.findById(req.params.id).then( (project) => {
        project.destroy().then((project) => {
            res.json({project:project})
        })
    })
})

//posting form
app.post('/api', (req, res) => {
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

app.get('*', function(req, res) { res.sendFile(path.resolve(__dirname, '../wiki-frontend/build', 'index.html')); });

module.exports = app
