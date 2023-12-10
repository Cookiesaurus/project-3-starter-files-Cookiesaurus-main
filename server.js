var express = require("express");
var Service = require("./service/service.js");  
const bodyParser = require('body-parser');
//now use dl.Department, dl.Employee and dl.TimeCard
var logger = require('morgan');
var service = new Service("eh8319");
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
//use router if you'd like

//use appropriate routes/paths/verbs
app.get("/",async function(req,res){
    //call the appropriate dl methods/objects using
    //await as the data layer methods are asynchronous
    res.json({"response":"this is the appropriate response"});  
});
app.get("/departments",async function(req,res){
    //call the appropriate dl methods/objects using
    //await as the data layer methods are asynchronous
    const departments = await service.getAllDepartment();

    res.json(departments);  
});
app.get("/department/",async function(req,res){
    const id = req.query.dept_id;
    console.log("ID", id);
    //call the appropriate dl methods/objects using
    //await as the data layer methods are asynchronous
    const department = await service.getDepartment(id);

    res.json(department);  
});
app.post("/department",async function(req,res){
    const data = req.body;
    const resp = await service.insertDepartment(data);
    res.status(resp.status).json(resp.resp);
});
app.put("/department",async function(req,res){
    const data = req.body;
    console.log("put department", data )
    const resp = await service.updateDepartment(data);
    res.status(resp.status).json(resp.resp);
});
app.delete("/department",async function(req,res){
    const id = req.query.dept_id;
    const resp = await service.deleteDepartment(id);
    res.status(resp.status).json(resp.resp);
});
app.get("/employees",async function(req,res){
    //call the appropriate dl methods/objects using
    //await as the data layer methods are asynchronous
    const employees = await service.getAllEmployee();

    res.json(employees);  
});
app.get("/employee/",async function(req,res){
    const id = req.query.emp_id;
    console.log("ID", id);
    //call the appropriate dl methods/objects using
    //await as the data layer methods are asynchronous
    const employee = await service.getEmployee(id);

    res.json(employee);  
});
app.post("/employee",async function(req,res){
    const data = req.body;
    const resp = await service.insertEmployee(data);
    res.status(resp.status).json(resp.resp);
});
app.put("/employee",async function(req,res){
    const data = req.body;
    const resp = await service.updateEmployee(data);
    res.status(resp.status).json(resp.resp);
});
app.delete("/employee",async function(req,res){ 
    const id = req.query.emp_id;
    const resp = await service.deleteEmployee(id);
    res.status(resp.status).json(resp.resp);
});

app.get("/timecards",async function(req,res){  
    const id = req.query.emp_id;
    const timecards = await service.getAllTimecard(id);
    res.json(timecards);  
});
app.get("/timecard/",async function(req,res){
    const id = req.query.timecard_id;
    console.log("ID", id);
    //call the appropriate dl methods/objects using
    //await as the data layer methods are asynchronous
    const timecard = await service.getTimecard(id);

    res.json(timecard);  
});
app.post("/timecard",async function(req,res){
    const data = req.body;
    console.log("post", data);
    const resp = await service.insertTimecard(data);
    console.log("resp" ,resp);
    res.status(resp.status).json(resp.resp);
});
app.put("/timecard",async function(req,res){
    const data = req.body;
    const resp = await service.updateTimecard(data);
    res.status(resp.status).json(resp.resp);
});
app.delete("/timecard",async function(req,res){
    const id = req.query.timecard_id;
    const resp = await service.deleteTimecard(id);
    res.status(resp.status).json(resp.resp);
}); 

app .listen(8080);
console.log('Express started on port 8080');

