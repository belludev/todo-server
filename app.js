const express = require('express')
    , app = express()
    , bodyParser = require('body-parser')
    , mongoose = require('mongoose');

const router = express.Router();
const PORT = process.env.PORT || 8080;

const { Todos } = require('./Models/TodoSchema');

mongoose.connect('mongodb://localhost:27017/todos', {useNewUrlParser: true},(err) => {
    if(err) console.log(err);
    else console.log('DB Connected');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', router);


router.route('/todo')
.get((req, res) => {
    Todos.find((err, results) => {
        if(err) res.send(err);
        else res.json(results)
    })
})
.post((req, res) => {
    if(req.body.data){
        let newTodo = new Todos({
            data: req.body.data,
        });
        newTodo.save((err) => {
            if(err) res.json({err});
            else res.json(newTodo)
        });
    }else{
        res.json({
            err: 'No data'
        })
    }
});
router.route('/todo/:id')
.get((req, res) => {
    Todos.findById(req.params.id, (err, results) => {
        if(err) res.json({err});
        else res.json(results);
    })
})
.put((req, res) => {
    const updateData = {
        ...req.body
    }
    Todos.updateOne({ _id: req.params.id }, updateData, (err, raw) => {
        if(err) res.json({err});
        else{
            if(raw.nModified > 0) res.json({ update: 'success' });
            else res.json({ update: 'failure' })
        }
    })
})
.delete((req, res) => {
    Todos.deleteOne({ _id: req.params.id }, (err) => {
        if(err) res.json({err});
        else res.json({ removal: 'success' });
    })
})


app.listen(PORT, () => {
    console.log("Listening on port: " + PORT);
})