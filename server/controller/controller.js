var recorddb = require('../model/model');

// create and save newrecord
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message: "Fields cannot be empty."});
        return;
    }
    // create newrecord
    const record= new recorddb({
        name    : req.body.name,
        email   : req.body.email,
        phone   : req.body.phone,
        status  : req.body.status
    })
    // save recordto database
   record
        .save(record)
        .then(data => {
            //res.send(data)
            res.redirect('/');
        })
        .catch(err=>{
            res.status(500).send({
                message : err.message || "Error creating new record."
            });
        });
}

// retrieve and return all records / single records
exports.find = (req,res)=>{
    if(req.query.id){
        const id = req.query.id;
       recorddb.findById(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message : "Record not found"})
                }else{
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({message : "Error retrieving record."})
            })
    }else{
       recorddb.find()
        .then(record=>{
            res.send(record)
        })
        .catch(err=>{
            res.status(500).send({ message : err.message || "Error retrieving record."})
        })
    }
}

// update recordby id
exports.update = (req,res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Fields cannot be empty"})
    }
    
    const id = req.params.id;
    recorddb.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
        .then(data=>{
            if(!data){
                res.status(404).send({message : `Error updating recordwith ID ${id}.`})
            }else{
                res.send(data)
                //res.redirect('/');
            }
        })
        .catch(err=>{
            res.status(500).send({message : "Error updating recordrecord."})
        })
}

// delete recordby id
exports.delete = (req,res)=>{
    const id = req.params.id;

   recorddb.findByIdAndDelete(id)
    .then(data =>{
        if(!data){
            res.status(404).send({ message : `Error deleting recordwith id ${id}.`})
        }else{
            res.send({
                message : "recorddeleted."
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
            message : "Error deletingrecord."
        });
    });
}