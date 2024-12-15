const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const authRouter = require("./routes/AuthRouter.js");
const productRouter = require("./routes/ProductsRouter.js");
require("dotenv").config();
require("./database/db.js");


app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

//route
app.use("/auth", authRouter);
app.use("/product",productRouter)


app.listen(PORT, () =>{
        console.log(`Server is running on ${PORT}`);
}) 