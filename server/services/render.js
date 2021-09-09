const axios = require('axios');

exports.homeRoutes = (req, res)=>{
    // make a GET request to /api/records
    axios.get(`${process.env.DOMAIN}:${process.env.PORT}/api/records`)
        .then(function(response){
            //console.log(response);
            res.render('index', {records : response.data})
        })
        .catch(err=>{
            res.send(err);
        })
}

exports.add_record = (req, res)=>{
    res.render('add_record');
}

exports.update_record = (req, res)=>{
    axios.get(`${process.env.DOMAIN}:${process.env.PORT}/api/records`, {params : {id : req.query.id}})
        .then(function(recorddata){
            res.render("update_record", {record: recorddata.data})
        })
        .catch(err=>{
            res.send(err);
        })
}