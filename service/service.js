var DataLayer = require("../companydata/index.js");


class Service {
    constructor(company) {
        this.company=company;
        this.dl = new DataLayer("eh8319");
        this.message = "Service layer is up!";
    }

    async getAllDepartment() {
        try {
            const resp= await this.dl.getAllDepartment(this.company);

        }catch (err){
            console.log(err);
            this.setMessage("Error getting all departments");
            return {status:500, resp:err};
        }
    }
    async getDepartment(id) {
        return await this.dl.getDepartment(this.company, id);
    }
    async insertDepartment(department) {
        try {
            console.log("insertDepartment",department);
            const resp= await this.dl.insertDepartment(
                department);
            console.log("insertDepartment",resp);
            if(resp===undefined || resp===null)
            {
                //this.setMessage("Error inserting department");
                return {status:500, resp:err};
            }else {
                return {status:200, resp:resp};
            }
        }catch (err){
           // console.log(err);
            this.setMessage("Error inserting department");
            return {status:500, resp:err};
        }
    }
    async updateDepartment(department) {
        try {
            const resp= await this.dl.updateDepartment(department);
            
            console.log("updateDepartment",resp);
            if(resp===undefined || resp===null)
            {
                //this.setMessage("Error updating department");
                return {status:500, resp:"response from data layer is null"};
            }else {
                return {status:200, resp:resp};
            }
        }catch (err){
           // console.log(err);
            this.setMessage("Error inserting department");
            return {status:500, resp:err};
        }
    }
    async deleteDepartment(id) {
        try {
            const resp= await this.dl.deleteDepartment(this.company,id);
            console.log("deleteDepartment",resp);
            if(resp===undefined || resp===null)
            {
                //this.setMessage("Error deleting department");
                return {status:500, resp:"response from data layer is null"};
            }else {
                return {status:200, resp:resp};
            }
        }catch (err){
            //console.log(err);
            this.setMessage("Error deleting department");
            return {status:500, resp:err};
        }
    }
    async getAllEmployee() {
        return await this.dl.getAllEmployee(this.company);
    }
    async getEmployee(id) {
        return await this.dl.getEmployee(id);
    }
    async insertEmployee(employee) {
        try {
            if(!this.validate(employee))
            {
                return {status:400, resp:this.getMessage()};
            }
            const resp= await this.dl.insertEmployee(employee);
            console.log("insertEmployee",resp);
            if(resp===undefined || resp===null)
            {
                //this.setMessage("Error inserting employee");
                return {status:500, resp:"response from data layer is null"};
            }else {
                return {status:200, resp:resp};
            }
        } catch (err){ 
            console.log(err);
            this.setMessage("Error inserting employee");
            return {status:500, resp:err};
        }
        
    }
    async updateEmployee(employee) {
        try {
            if(!this.validate(employee))
            {
                return {status:400, resp:this.getMessage()};
            }
            const resp= await this.dl.updateEmployee(employee);
            console.log("updateEmployee",resp);
            if(resp===undefined || resp===null)
            {
                //this.setMessage("Error updating employee");
                return {status:500, resp:"response from data layer is null"};
            }else {
                return {status:200, resp:resp};
            }
        } catch (err){
            console.log(err);
            this.setMessage("Error updating employee");
            return {status:500, resp:err};
        }
    }
    async deleteEmployee(id) {
        try {
            const resp= await this.dl.deleteEmployee(id);
            console.log("deleteEmployee",resp);
            if(resp===undefined || resp===null)
            {
                //this.setMessage("Error deleting employee");
                return {status:500, resp:"response from data layer is null"};
            }else {
                return {status:200, resp:resp};
            }
        } catch (err){
            console.log(err);
            this.setMessage("Error deleting employee");
            return {status:500, resp:err};
        }
    }
    async getAllTimecard(id) {
        return await this.dl.getAllTimecard(id);
    }
    async getTimecard(id) {
        return await this.dl.getTimecard(id);
    }
    async insertTimecard(timecard) {
        try {
            if(!this.validateTime(timecard["start_time"],timecard["end_time"]))
            {
                return {status:400, resp:this.getMessage()};
            }
            const resp= await this.dl.insertTimecard(timecard);
            console.log("insertTimecard",resp);
            if(resp===undefined || resp===null)
            {
                //this.setMessage("Error inserting timecard");
                return {status:500, resp:"response from data layer is null"};
            }else {
                return {status:200, resp:resp};
            }
        } catch (err){
            console.log(err);
            this.setMessage("Error inserting timecard");
            return {status:500, resp:err};
        }
    }
    async updateTimecard(timecard) {
        try {
            if(!this.validateTime(timecard["start_time"],timecard["end_time"]))
            {
                return {status:400, resp:this.getMessage()};
            }
            const resp= await this.dl.updateTimecard(timecard);
            console.log("updateTimecard",resp);
            if(resp===undefined || resp===null)
            {
                //this.setMessage("Error updating timecard");
                return {status:500, resp:"response from data layer is null"};
            }else {
                return {status:200, resp:resp};
            }
        } catch (err){
            console.log(err);
            this.setMessage("Error updating timecard");
            return {status:500, resp:err};
        }
    }
    async deleteTimecard(id) {
        try {
            const resp= await this.dl.deleteTimecard(id);
            console.log("deleteTimecard",resp);
            if(resp===undefined || resp===null)
            {
                //this.setMessage("Error deleting timecard");
                return {status:500, resp:"response from data layer is null"};
            }else {
                return {status:200, resp:resp};
            }
        } catch (err){
            console.log(err);
            this.setMessage("Error deleting timecard");
            return {status:500, resp:err};
        }
    }

    // Helper functions:
    validateTime(startTime, endTime) {
        try {
            console.log("validateTime:", startTime, endTime);

            if (!startTime || !endTime) {
                this.message = "Start and end times are required";
                return false;
            }

            const start = new Date(startTime+ "T00:00:01");
            const end = new Date(endTime+ "T00:00:01");

            if (start > end) {
                this.message = "Start time must be before end time";
                return false;
            }

            if (end.getDay() === 6 || end.getDay() === 0) {
                this.message = "End time cannot be on the weekend";
                return false;
            }

            if (start.getDay() === 6 || start.getDay() === 0) {
                this.message = "Start time cannot be on the weekend";
                return false;
            }

            if (start.getHours() < 8 || start.getHours() > 18) {
                this.message = "Start time must be between 8am and 6pm";
                return false;
            }

            if (end.getHours() < 8 || end.getHours() > 18) {
                this.message = "End time must be between 8am and 6pm";
                return false;
            }
            return true;
        } catch (e) {
            console.log(e);
            this.message = "Error validating time";
            return false;
            // Handle any errors...
        }
    }
    validHireDate(hireDate)
    {
        try {
            if(!hireDate)
            {
                this.setMessage("Hire date is required");
                return false;
            }
            const hd = new Date(hireDate+ "T00:00:01");
            const currentDate = new Date();
            if(hd>currentDate)
            {
                this.setMessage("Hire date must be before today");
                return false;
            }
            if(hd.getDay() === 6 || hd.getDay() === 0)
            {
                this.setMessage("Hire date cannot be on the weekend");
                return false;
            }   
            return true;
        }
        catch (err) {
            console.log(err);
            this.setMessage("Error validating hire date");
            return false;
            // Handle any errors...
        }
    }
    validate(emp)
    {
        try {
            if(emp["emp_no"]==="" || emp["emp_no"]===undefined)
            {
                this.setMessage("Employee number is required");
                return false;
            }
            if(emp["emp_name"]==undefined || emp["emp_name"]===""){
                this.setMessage("Employee name is required");
                return false;
            }
            const dept = this.dl.getDepartment(this.company,emp["dept_id"]);
            if(dept===undefined)
            {
                this.setMessage("Department does not exist");
                return false;
            }
            m = this.dl.getEmployee(emp["mng_id"]);
            if(m===undefined)
            {
                this.setMessage("Manager does not exist");
                return false;
            }
            return this.validHireDate(emp["hire_date"]);

        }catch (err){
            console.log(err);
            this.setMessage("Error validating employee");
            return false;
        }
    }
    validStartTime(ts)
    {
        try {
            if(!ts){
                this.setMessage("Start time is required");
                return false;
            }
            const startTime= new Date(ts);
            const currentDate = new Date();
            if(startTime>currentDate)
            {
                this.setMessage("Start time must be before today");
                return false;
            }
            if(startTime.getDay() !== 1 && 
                !this.equalDate(startTime,currentDate))  
            {

                this.setMessage("Start Time must be a monday");
                return false;
            }
            return true;
        }
        catch (err) {
            console.log(err);
            this.setMessage("Error validating start time");
            return false;
        }

    }

    validEndTime(ts,te) {
        try{
            const startTime= new Date(ts);
            const endTime = new Date(te);

            if(startTime===undefined||endTime===undefined)
            {
                this.setMessage("Start and end times are required");
                return false;
            }
            if(startTime>endTime)
            {
                this.setMessage("End Time cannot be before Start Time");
                return false;
            }
            if (endTime.getDay() == 0 || endTime.getDay() == 6) {
                this.setMessage("End Time cannot be on the weekend");
                return false;
            }
            if (startTime.getDay() == 0 || startTime.getDay() == 6) {
                errorMessage = "Start Time cannot be on the weekend";
                this.setMessage("Start Time cannot be on the weekend");
                return false;
            }
                    // end time must be between the hours of 08:00:00 and 18:00:00.
            if (endTime.getHours() < 8 || endTime.getHours() > 18) {
                this.setMessage("End Time must be between 8am and 6pm");
                return false;
            }
            // start time must be between the hours of 08:00:00 and 18:00:00.
            if (startTime.getHours() < 8 || startTime.getHours() > 18) {
                this.setMessage("Start Time must be between 8am and 6pm");
                return false;
            }
            return true;
        }catch (err){
            console.log(err);
            this.setMessage("Error validating end time");
            return false;
        }
    }

    validateTimecard(tc){
        try {
           emp = this.dl.getEmployee(tc["emp_id"]);
           // emp_id must exist
           if(emp===undefined)
           {
               this.setMessage("Employee not found");
               return false;
           }
           if(!Validi)
           // start time must be valid
              if(!this.validEndTime(tc["start_time"],tc["end_time"]))
              {
                return false;
              }

        }catch (err){
            console.log(err);
            this.setMessage("Error validating timecard");
            return false;
        }
    }

    equalDate (d1,d2){
        return (d1.getFullYear() === d2.getFullYear() &&
                d1.getMonth() === d2.getMonth() &&
                d1.getDate() === d2.getDate()); 
    }
    getMessage() {
        return this.message;
    }
    setMessage(message) {
        this.message = message;
        console.log(message);
    }
}
module.exports = Service;