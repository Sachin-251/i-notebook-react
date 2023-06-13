import express from "express";
import mysql from "mysql";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from 'bcrypt';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const HOST = process.env.HOST;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const DATABASE = process.env.DATABASE;
const PORT = process.env.PORT;

const db = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
});
if(db){
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
}else{
    console.log(`Error did not connect`);
}

app.post("/register", async (req,res) => {
    const q = "INSERT INTO USER (`first_name`,`last_name`,`email`,`password`) VALUES (?)";
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(req.body.password, salt);  
    const values = [
        req.body.fName,
        req.body.lName,
        req.body.email,
        passwordHash,
    ];
    db.query(q,[values],(err,data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post("/user",async (req,res) => {
    const q = "SELECT * FROM user WHERE email = ?";
    console.log(req.body.email);
    const values = [req.body.email];
    db.query(q,[values],(err,data) => {
        if(err) return res.json("Request Failed");
        if(data.length > 0){
            return res.json(true);
        }else{
            return res.json(false);
        }
    });
});

app.post("/login",async (req,res) => {
    const q = "SELECT * FROM user WHERE email = ?";
    db.query(q,[req.body.email],async (err,data) => {
        if(err) return res.json(err);
        if(data.length > 0){
            if(await bcrypt.compare(req.body.password, data[0].password)){
                return res.json(data[0]);
            }else{
                return res.json(false);
            }
        }else{
            return res.json("User Not Found");
        }
    });
});

app.post("/add", async (req,res) => {
    const q = "INSERT INTO TASKLIST (`user_id`,`task`) VALUES (?)";
    const values = [
        req.body.userId,
        req.body.task
    ];
    db.query(q,[values],(err,data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.get("/read", async (req,res) => {
    const q = "SELECT * FROM TASKLIST";
    db.query(q,(err,data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post("/delete", async (req,res) => {
    const q = "DELETE FROM TASKLIST WHERE id = ?";
    db.query(q,[req.body.id],(err,data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post("/update", async (req,res) => {
    const q = "UPDATE TASKLIST SET task = ? WHERE id = ?";
    db.query(q,[req.body.updateTask , req.body.id],(err,data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

