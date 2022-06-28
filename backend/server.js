const express = require("express")
const { data } = require("./data")
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const seedRouter = require("./routes/seedRouter");

dotenv.config()

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("CONNECTED TO DB")
}).catch(err => {
    console.log(err.message)
})

const app = express();
const PORT = process.env.PORT || 5000

app.use("/api/products", require("./routes/productRouter"))



app.use('/api/seed', seedRouter);

app.listen(PORT,() => console.log(`
|| SERVER IS RUNNING ON PORT ${PORT}
|| TRY GOING TO https://localhost:${PORT}
|| ENJOY SOFTWARE DEVELOPMENT BRO :) 
`))