const todo = require('../Models/todoSchema')


exports.addTask = (req, res)=> {
    const {title,body,data,user,status} = req.body;
    const task = new todo({title,body,data,user,status});
    task.save().then(task => {
        res.status(201).json(task)
    }).catch(err => res.send(err))
}

exports.getAllTasks = async (req,res) => {
    const tasks = await todo.find();
    res.status(200).send(tasks);
}

exports.getTaskById = async (req,res) => {
    const task = await todo.findById(req.params.id);
    res.status(200).send(task)
}

exports.editTask = async (req,res) => {
    const task = await todo.findByIdAndUpdate(req.params.id , req.body);
    res.status(201).json(task)
}

exports.delTask = async (req,res) => {
    const task =  await todo.findByIdAndDelete(req.params.id);
    res.status(200).json(task)
}