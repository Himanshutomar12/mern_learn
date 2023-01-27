import employeeData from "../model/user_schema.js";

export const addEmployee = async (req, res) => {
    const employee = req.body;
    const parsedData = JSON.parse(employee[1]);
    const validatedEmp = new employeeData(parsedData);
    try {
        await validatedEmp.save();
        res.status(201).json({message: "1"});
    } catch (error) {
        res.status(409).json({message: error});
    }
}

export const showEmployee = (req, res) => {
    employeeData.find({}).sort({createdAt:-1}).exec((err, docs) => {
        if(err){
            res.status(409).json({message: err.message});
        }else {
            res.status(201).json(docs);
        }
    })
}

export const deleteEmployee = async (req, res) => {
    const id = req.body[2];
    try {
        await employeeData.deleteOne({_id: id});
        res.status(201).json({msg: 1});
    } catch (error) {
        res.status(409).json({msg: error.message});
    }
}

export const getEmp = (req, res) => {
    const id = req.body[2];
    employeeData.find({_id:id}, (err, result) => {
        if(err){
            res.send({msg: err.message});
        }else {
            res.send(result[0]);
        }
    })
}

export const updateEmployee = (req, res) => {
    const obj = JSON.parse(req.body[2]);
    employeeData.updateOne({_id: obj.id}, {lastName: obj.lname, firstName:obj.name, mobile:obj.phone}, (err, result) => {
        if(err){
            res.json({msg: err});
        }else {
            res.json({msg: 1});
        }
    });
}