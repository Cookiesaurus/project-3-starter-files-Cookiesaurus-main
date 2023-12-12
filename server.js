// Import required modules
var express = require("express");
var Service = require("./service/service.js");  
const bodyParser = require('body-parser');
var logger = require('morgan');

// Create a new instance of the Service class
var service = new Service("eh8319");

// Create an Express app
var app = express();

// Use logger middleware for logging HTTP requests
app.use(logger('dev'));

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Define routes and corresponding HTTP methods:

// GET request for the root path
app.get("/",async function(req,res){
    res.json({"response":"this is the appropriate response"});  
});

// DELETE request for the /company path
app.delete("/company", async function(req,res){
    const company = req.query.company;
    const resp = await service.deleteCompany(company);  
    res.status(resp.status).json(resp.resp);
});

// GET request for the /departments path
app.get("/departments",async function(req,res){
    const resp = await service.getAllDepartment();
    console.log(resp);
    res.status(resp.status).json(resp.resp);  
});

// GET request for the /department path
app.get("/department/",async function(req,res){
    const id = req.query.dept_id;
    console.log("ID", id);
    const resp = await service.getDepartment(id);
    res.status(resp.status).json(resp.resp);  
});

// POST request for the /department path
app.post("/department",async function(req,res){
    const data = req.body;
    const resp = await service.insertDepartment(data);
    res.status(resp.status).json(resp.resp);
});

// PUT request for the /department path
app.put("/department",async function(req,res){
    const data = req.body;
    console.log("put department", data )
    const resp = await service.updateDepartment(data);
    res.status(resp.status).json(resp.resp);
});

// DELETE request for the /department path
app.delete("/department",async function(req,res){
    const id = req.query.dept_id;
    const resp = await service.deleteDepartment(id);
    res.status(resp.status).json(resp.resp);
});

// GET request for the /employees path
app.get("/employees",async function(req,res){
    const resp = await service.getAllEmployee();
    res.status(resp.status).json(resp.resp);  
});

// GET request for the /employee path
app.get("/employee/",async function(req,res){
    const id = req.query.emp_id;
    console.log("ID", id);
    const resp = await service.getEmployee(id);
    res.status(resp.status).json(resp.resp);  
});

// POST request for the /employee path
app.post("/employee",async function(req,res){
    const data = req.body;
    const resp = await service.insertEmployee(data);
    res.status(resp.status).json(resp.resp);
});

// PUT request for the /employee path
app.put("/employee",async function(req,res){
    const data = req.body;
    const resp = await service.updateEmployee(data);
    res.status(resp.status).json(resp.resp);
});

// DELETE request for the /employee path
app.delete("/employee",async function(req,res){ 
    const id = req.query.emp_id;
    const resp = await service.deleteEmployee(id);
    res.status(resp.status).json(resp.resp);
});

// GET request for the /timecards path
app.get("/timecards",async function(req,res){  
    const id = req.query.emp_id;
    console.log("Get All TimeCards by ID", id);
    const resp = await service.getAllTimecard(id);
    res.status(resp.status).json(resp.resp);  
});

// GET request for the /timecard path
app.get("/timecard/",async function(req,res){
    const id = req.query.timecard_id;
    console.log("Get TimeCard ID", id);
    const resp = await service.getTimecard(id);
    res.status(resp.status).json(resp.resp);  
});

// POST request for the /timecard path
app.post("/timecard",async function(req,res){
    const data = req.body;
    console.log("post", data);
    const resp = await service.insertTimecard(data);
    console.log("resp" ,resp);
    res.status(resp.status).json(resp.resp);
});

// PUT request for the /timecard path
app.put("/timecard",async function(req,res){
    const data = req.body;
    const resp = await service.updateTimecard(data);
    res.status(resp.status).json(resp.resp);
});

// DELETE request for the /timecard path
app.delete("/timecard",async function(req,res){
    const id = req.query.timecard_id;
    const resp = await service.deleteTimecard(id);
    res.status(resp.status).json(resp.resp);
}); 

// Start the Express app on port 8080
app.listen(8080);
console.log('Express started on port 8080');
