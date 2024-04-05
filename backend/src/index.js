const cors = require('cors');
require('dotenv').config();
const express = require("express");
require('express-async-errors');
const router = require("./routes/index");
const sequelize = require("./db/index");


const main = async () => {
    console.log(process.env)
    const app = express();
    app.use(express.json());
    // app.set("trust proxy", !__prod__); //a little fix here from another users codes--- actually think this made it works
    // app.set("Access-Control-Allow-Origin", "http://localhost:3000");
    // app.set("Access-Control-Allow-Credentials", true);
    app.use(cors({
        origin:"http://localhost:5173",
        credentials:true
    }))

    app.use("/api/v1", router);
    
    (async () => {
        try {
          await sequelize.sync();
          console.log("Models have been synchronized successfully.");
        } catch (error) {
          console.error("Unable to sync models with the database:", error);
        }
      })();

    const PORT = process.env.PORT || 5000;

   
    const start = () => {
        try {
            app.listen(PORT, () => {
                console.log(`Server listening on port ${PORT}`)
            })
        } catch (error) {
            console.error(error);
        }

    }

    start();
}

main().catch((err) => console.log(err));


