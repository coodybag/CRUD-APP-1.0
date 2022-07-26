const axios = require('axios');

exports.homeRoutes = (req, res)=>{
    //get request to API users that returns a promise and chain with .then()

    axios.get('http://localhost:3000/api/crudapp')
    .then(function(response){
    res.render("index", {crudapp: response.data});
    })
    .catch(err =>{
        res.send(err)
    })
}

exports.add_user = (req, res)=>{
    res.render("add_user");
}

exports.update_user = (req, res)=>{
    axios.get('http://localhost:3000/api/crudapp',{params:{id:req.query.id}})
    .then(function(userdata){
    res.render("update_user", {crudapp: userdata.data});
    })
    .catch(err=>{
        res.send(err)
    })
}