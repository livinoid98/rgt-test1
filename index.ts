const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'rgt'
})

app.post('/codingTest/post', async (req,res) => {
    const orderId = req.body.order_id;
    const productName = req.body.product_name;
    const options = req.body.options;
    const tableNo = req.body.table_no;
    const quantity = req.body.quantity;
    const orderDate = req.body.order_date;
    const orderTime = req.body.order_time;
    const dateTime = req.body.date_time;
    const robotStatus = req.body.tobot_status;
    const dong = req.body.dong;
    const ho = req.body.ho;
    const seq = req.body.seq;
    const ordererName = req.body.orderer_name;

    connection.connect();
    let sql = 'insert into codingtest(order_id, product_name, options, table_no, quantity, order_date, order_time, date_time, robot_status, dong, ho, seq, orderer_name) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [orderId, productName, options, tableNo, quantity, orderDate, orderTime, dateTime, robotStatus, dong, ho, seq, ordererName], (err, result, field) => {
        if(err){
            console.error(err);
            res.status(500).send({error: "error"});
            return;
        }
        res.send({orderId: orderId});
    })
    await connection.end();
})

app.get('/', (req,res) => {
    res.send('index');
})

app.listen(PORT, () => {
    console.log(`server start on port ${PORT}`);
})