const express = require('express')
const bodyParser = require('body-parser')

const client = require("./connection")
const app = express()

app.use(bodyParser.json())

app.listen(3100, () => {
    console.log('server runed');
})

client.connect(err => {
    if(err){
        console.log(err.message);
    } else {
        console.log('connected');
    }
})



//get == select *
app.get('/books', (req, res) => {
    client.query('select * from books', (err, result) => {
        if(!err){
            res.send(result.rows)
        }
    })
})

//post == insert
app.post('/books', (req, res) => {
    const {title, description, author} = req.body
    client.query(`insert into books(title, description, author) values ('${title}', '${description}', '${author}')`), (err, result) => {
     if (!err){
        res.send('insert success')
     } else {
        res.send(err.message)
     }
    }
})

app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id; // Get the ID from the URL parameters

    // Assuming you're using a PostgreSQL database and a client library like 'pg'
    client.query(`DELETE FROM books WHERE id = $1`, [bookId], (err, result) => {
        if (!err) {
            if (result.rowCount === 1) {
                res.send('Delete success');
            } else {
                res.status(404).send('Book not found');
            }
        } else {
            res.status(500).send(err.message);
        }
    });
});
