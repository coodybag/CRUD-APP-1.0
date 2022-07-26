//require the model file to be used

var CrudAppDB = require('../model/model');

//create first API request
//create and save new user
exports.create = (req, res)=>{
//validate request
if (!req.body){
    res.status(400).send({message: "Content cannot be empty"})
    return;
}
//new instance of user
const user = new CrudAppDB({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status
    //data matches model
})

//save user in the database
user
.save(user)
.then(data =>{
    // res.send(data)
    res.redirect('/add-user')
})
.catch(err =>{
    res.status(500).send({
        message: err.message("Some error occured while creating a create operation")
    });
});
}

//retrieve and return all users || retrieve and return a single user
//get data from database and respond as a response
exports.find = (req, res)=>{

//for single user retrieve
if(req.query.id){
const id = req.query.id;

CrudAppDB.findById(id)
.then(data =>{
    if(!data){
        res.status(404).send({message: `Not found user with id ${id}.`})
    }
    else{
        res.send(data)
    }
})
.catch(err =>{
    res.status(500).send({message: `Error retrieving user with id ${id}.`})
})

}else{
    CrudAppDB.find()
    .then(user => {
        res.send(user)
    })
    .catch(err =>{
        res.status(500).send({message: err.message || "Error occured while retrieving the record"})
    })

}
}

//update a new identified user by user id
exports.update = (req,res)=>{
if(!req.body){
    return res
    .status(400)
    .send({message: "Data to update cannot be empty"})
}

const id = req.params.id;
CrudAppDB.findByIdAndUpdate(id, req.body)
.then(data =>{
    if(!data){
        res.status(404).send({message: `Cannot update user with ${id}. Maybe user not found!`})
    }
    else{
        res.send(data)
    }
})
.catch(err =>{
    res.status(500).send({message: "Error Update user information"})
})
}

//Delete a user with specified user id
exports.delete = (req, res)=>{
const id = req.params.id;

CrudAppDB.findByIdAndDelete(id)
.then(data =>{
    if(!data){
        res.status(404).send({message: `Cannot delete with id ${id}. Maybe is is wrong`})
    }
    else{
        res.send({
            message: "User was deleted successfully"
        });
    }
})
.catch(err =>{
    res.status(500).send({message: `Could not delete User with id ${id}.`})
})
}