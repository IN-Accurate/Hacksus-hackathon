const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
const db = require('./models');

//Routers - endpoints

const postRouter = require('./routes/Wastes');
app.use("/wastes",postRouter);

const CoordRouter = require('./routes/Coord');
app.use("/coord",CoordRouter);

db.sequelize.sync().then(()=>{
    
    app.listen(process.env.PORT || 3001,() => {
        console.log("Server running on port 3001");
    })
}).catch(err => {
    console.error(err);
});