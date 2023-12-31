var DataLayer = require("../companydata/index.js");
class Service {
    // Constructor for the Service class
    constructor(company) {
        this.company=company;
        this.dl = new DataLayer("eh8319");
        this.message = "Service layer is up!";
    }

    // Company functions:
    /**
     * 
     * @param {*} company 
     * @returns String
     */
    async deleteCompany(company) {
        try {
            const employees=await this.dl.getAllEmployee(company);
            for (let emp of employees) {
                console.log ("employee:",emp);
                const timecards=await this.dl.getAllTimecard(emp.emp_id);
                for (let tc of timecards) {
                    console.log ("timecard:",tc);
                    await this.dl.deleteTimecard(tc.timecard_id);
                }
                await this.dl.deleteEmployee(emp.emp_id);
            }
            const departments=await this.dl.getAllDepartment(company);  
            for (let dept of departments) {
                console.log ("department:",dept);
                await this.dl.deleteDepartment(company,dept.dept_id);
            }
            const resp= await this.dl.deleteCompany(company);
            console.log("deleteCompany",resp);
            return this.responseObject(200,resp);
        }catch (err){
            console.log(err);
            this.setMessage("Error deleting company");
            return this.responseObject(500,err);
        }
    }

    // Department functions:
    /**
     * 
     * @returns department
     */
    async getAllDepartment() {
        try {
            const rows= await this.dl.getAllDepartment(this.company);
            if(rows===undefined || rows===null||rows.length<1)
            {
                //this.setMessage("Error getting all departments");
                return this.responseObject(500,"response from data layer is null");
            }
            return this.responseObject(200,rows);
        }catch (err){
            console.log(err);
            this.setMessage("Error getting all departments");
            return this.responseObject(500,err);
        }
    }

    /**
     * 
     * @param {dept_id} id 
     * @returns department
     */
    async getDepartment(id) {
        if(id<1)
        {
            return this.responseObject(500,"Department id must be greater than 0");
        }
        const rows= await this.dl.getDepartment(this.company, id);
        if(rows===undefined || rows===null || rows.length<1)
        {
            return this.responseObject(500,"Department not found");
        }else{
            return this.responseObject(200,rows[0]);
        }
    }

    /**
     * 
     * @param {Department} department 
     * @returns
     */
    async insertDepartment(department) {
        try {
            console.log("insertDepartment",department);
            const resp= await this.dl.insertDepartment(
                department);
            console.log("insertDepartment",resp);
            if(resp===undefined || resp===null)
            {
                this.setMessage("Error inserting department");
                return this.responseObject(500,"response from data layer is null");
            }else {
                return this.responseObject(200,resp);
            }
        }catch (err){
            this.setMessage("Error inserting department");
            return this.responseObject(500,err);
        }
    }

    /**
     * 
     * @param {Department} department 
     * @returns String
     */
    async updateDepartment(department) {
        try {
            console.log("updateDepartment",
            department);
            const resp= await this.dl.updateDepartment(department);
            
            console.log("updateDepartment",resp);
            if(resp===undefined || resp===null)
            {
                //this.setMessage("Error updating department");
                return this.responseObject(500,"response from data layer is null");
            }else {
                return this.responseObject(200,resp);
            }
        }catch (err){
            console.log(err);
            this.setMessage("Error inserting department");
            return this.responseObject(500,err);
        }
    }

    /**
     * 
     * @param {dept_id} id 
     * @returns String
     */
    async deleteDepartment(id) {
        try {
            const resp= await this.dl.deleteDepartment(this.company,id);
            console.log("deleteDepartment",resp);
            if(resp<1)
            {
                //this.setMessage("Error deleting department");
                return this.responseObject(500,"response from data layer is null");
            }else {
                return this.responseObject(200,resp);
            }
        }catch (err){
            this.setMessage("Error deleting department");
            return this.responseObject(500,err);
        }
    }

    /**
     * 
     * @returns String
     */
    async getAllEmployee() {
        const rows= await this.dl.getAllEmployee(this.company);
        if(rows===undefined || rows===null || rows.length<1)
        {
            return this.responseObject(500,"Employee not found");
        }else{
            return this.responseObject(200,rows);
        }
    }

    /**
     * 
     * @param {emp_id} id 
     * @returns String
     */
    async getEmployee(id) {
        if(id<1)
        {
            return {status:500, resp:"Employee id must be greater than 0"};
        }
        const rows= await this.dl.getEmployee(id);
        if(rows===undefined || rows===null || rows.length<1)
        {
            return this.responseObject(500,"Employee not found");
        }else {
            return this.responseObject(200,rows[0]);
        }
    }

    /**
     * 
     * @param {*} employee 
     * @returns String
     */
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
                return this.responseObject(500,"response from data layer is null");
            }else {
                return this.responseObject(200,resp);
            }
        } catch (err){ 
            console.log(err);
            this.setMessage("Error inserting employee");
            return this.responseObject(500,err);
        }
    }

    /**
     * 
     * @param {*} employee 
     * @returns String
     */
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
                return this.responseObject(500,"response from data layer is null");
            }else {
                return this.responseObject(200,resp);
            }
        } catch (err){
            console.log(err);
            this.setMessage("Error updating employee");
            return this.responseObject(500,err);
        }
    }

    /**
     * 
     * @param {emp_id} id 
     * @returns String
     */
    async deleteEmployee(id) {
        try {
            const resp= await this.dl.deleteEmployee(id);
            console.log("deleteEmployee",resp);
            if(resp<1)
            {
                //this.setMessage("Error deleting employee");
                return this.responseObject(500,"response from data layer is null")
            }else {
                return this.responseObject(200,resp);
            }
        } catch (err){
            console.log(err);
            this.setMessage("Error deleting employee");
            return this.responseObject(500,err);
        }
    }
    
    /**
     * 
     * @param {emp_id} id 
     * @returns String
     */
    async getAllTimecard(id) {
        if (id < 1) {
            return { status: 500, resp: "Employee id must be greater than 0" };
        }
        const rows = await this.dl.getAllTimecard(id);
        if (rows === undefined || rows === null || rows.length < 1) {
            return this.responseObject(500, "Timecard not found");
        } else {
            return this.responseObject(200, rows);
        }
    }

    /**
     * 
     * @param {*} id 
     * @returns String
     */
    async getTimecard(id) {
        if (id < 1) {
            return this.responseObject(500, "Timecard id must be greater than 0");
        }
        const rows = await this.dl.getTimecard(id);
        if (rows === undefined || rows === null || rows.length < 1) {
            return this.responseObject(500, "Timecard not found");
        } else {
            return this.responseObject(200, rows[0]);
        }
    }

    /**
     * 
     * @param {*} timecard 
     * @returns String
     */
    async insertTimecard(timecard) {
        try {
            if (!this.validateTime(timecard["start_time"], timecard["end_time"])) {
                return this.responseObject(400, this.getMessage());
            }
            const resp = await this.dl.insertTimecard(timecard);
            console.log("insertTimecard", resp);
            if (resp === undefined || resp === null) {
                return this.responseObject(500, "response from data layer is null");
            } else {
                return this.responseObject(200, resp);
            }
        } catch (err) {
            console.log(err);
            this.setMessage("Error inserting timecard");
            return this.responseObject(500, err);
        }
    }

    /**
     * 
     * @param {*} timecard 
     * @returns String
     */
    async updateTimecard(timecard) {
        try {
            if (!this.validateTime(timecard["start_time"], timecard["end_time"])) {
                return { status: 400, resp: this.getMessage() };
            }
            const resp = await this.dl.updateTimecard(timecard);
            console.log("updateTimecard", resp);
            if (resp === undefined || resp === null) {
                return this.responseObject(500, "response from data layer is null");
            } else {
                return this.responseObject(200, resp);
            }
        } catch (err) {
            console.log(err);
            this.setMessage("Error updating timecard");
            return this.responseObject(500, err);
        }
    }

    /**
     * 
     * @param {*} id 
     * @returns String
     */
    async deleteTimecard(id) {
        try {
            if (id < 1) {
                return this.responseObject(500, "Timecard id must be greater than 0");
            }
            const resp = await this.dl.deleteTimecard(id);
            console.log("deleteTimecard", resp);
            if (resp < 1) {
                this.setMessage("Error deleting timecard");
                return this.responseObject(500, "response from data layer is null");
            } else {
                return this.responseObject(200, "success");
            }
        } catch (err) {
            console.log(err);
            this.setMessage("Error deleting timecard");
            return this.responseObject(500, err);
        }
    }

    // Helper functions:

    /**
     * 
     * @param {*} startTime 
     * @param {*} endTime 
     * @returns boolean
     */
    validateTime(startTime, endTime) {
        try {
            console.log("validateTime:", startTime, endTime);

            if (!startTime || !endTime) {
                this.setMessage("Start and end times are required");
                return false;
            }

            const start = new Date(startTime);
            const end = new Date(endTime);
            console.log("start:", start, "end:", end);

            if (start >= end) {
                this.setMessage("Start time must be before end time");
                return false;
            }

            console.log("start.day:", start.getDay(), "end.day:", end.getDay());

            if (end.getDay() === 6 || end.getDay() === 0) {
                this.setMessage("End time cannot be on the weekend");
                return false;
            }

            if (start.getDay() === 6 || start.getDay() === 0) {
                this.setMessage("Start time cannot be on the weekend");
                return false;
            }

            console.log("start.getHours:", start.getHours(), "end.getHours:", end.getHours());

            if (start.getHours() < 8 || start.getHours() > 18) {
                this.setMessage("Start time must be between 8am and 6pm");
                return false;
            }

            if (end.getHours() < 8 || end.getHours() > 18) {
                this.setMessage("End time must be between 8am and 6pm");
                return false;
            }

            return true;
        } catch (e) {
            console.log(e);
            this.setMessage("Error validating time");
            return false;
        }
    }

    /**
     * 
     * @param {*} hireDate 
     * @returns boolean
     */
    validHireDate(hireDate) {
        try {
            if (!hireDate) {
                this.setMessage("Hire date is required");
                return false;
            }
            const hd = new Date(hireDate + "T00:00:01");
            const currentDate = new Date();
            if (hd > currentDate) {
                this.setMessage("Hire date must be before today");
                return false;
            }
            if (hd.getDay() === 6 || hd.getDay() === 0) {
                this.setMessage("Hire date cannot be on the weekend");
                return false;
            }
            return true;
        } catch (err) {
            console.log(err);
            this.setMessage("Error validating hire date");
            return false;
        }
    }

    /**
     * 
     * @param {*} status 
     * @param {*} resp 
     * @returns object
     */
    responseObject(status, resp) {
        if (status === 200) {
            return { status: status, resp: { success: resp } };
        } else {
            return { status: status, resp: { error: resp } };
        }
    }

    /**
     * 
     * @param {*} emp 
     * @returns boolean
     */
    validate(emp) {
        try {
            if (emp["emp_no"] === "" || emp["emp_no"] === undefined) {
                this.setMessage("Employee number is required");
                return false;
            }
            if (emp["emp_name"] == undefined || emp["emp_name"] === "") {
                this.setMessage("Employee name is required");
                return false;
            }
            const dept = this.dl.getDepartment(this.company, emp["dept_id"]);
            if (dept === undefined) {
                this.setMessage("Department does not exist");
                return false;
            }
            const m = this.dl.getEmployee(emp["mng_id"]);
            if (m === undefined) {
                this.setMessage("Manager does not exist");
                return false;
            }
            return this.validHireDate(emp["hire_date"]);
        } catch (err) {
            console.log(err);
            this.setMessage("Error validating employee");
            return false;
        }
    }

    /**
     * 
     * @param {*} ts 
     * @returns boolean
     */
    validStartTime(ts) {
        try {
            if (!ts) {
                this.setMessage("Start time is required");
                return false;
            }
            const startTime = new Date(ts);
            const currentDate = new Date();
            if (startTime > currentDate) {
                this.setMessage("Start time must be before today");
                return false;
            }
            if (startTime.getDay() !== 1 && !this.equalDate(startTime, currentDate)) {
                this.setMessage("Start Time must be a monday");
                return false;
            }
            return true;
        } catch (err) {
            console.log(err);
            this.setMessage("Error validating start time");
            return false;
        }
    }

    /**
     * 
     * @param {*} ts 
     * @param {*} te 
     * @returns boolean
     */
    validEndTime(ts, te) {
        try {
            const startTime = new Date(ts);
            const endTime = new Date(te);

            if (startTime === undefined || endTime === undefined) {
                this.setMessage("Start and end times are required");
                return false;
            }
            if (startTime > endTime) {
                this.setMessage("End Time cannot be before Start Time");
                return false;
            }
            if (endTime.getDay() == 0 || endTime.getDay() == 6) {
                this.setMessage("End Time cannot be on the weekend");
                return false;
            }
            if (startTime.getDay() == 0 || startTime.getDay() == 6) {
                this.setMessage("Start Time cannot be on the weekend");
                return false;
            }
            if (endTime.getHours() < 8 || endTime.getHours() > 18) {
                this.setMessage("End Time must be between 8am and 6pm");
                return false;
            }
            if (startTime.getHours() < 8 || startTime.getHours() > 18) {
                this.setMessage("Start Time must be between 8am and 6pm");
                return false;
            }
            return true;
        } catch (err) {
            console.log(err);
            this.setMessage("Error validating end time");
            return false;
        }
    }

    /**
     * 
     * @param {*} tc 
     * @returns boolean
     */
    validateTimecard(tc) {
        try {
            emp = this.dl.getEmployee(tc["emp_id"]);
            // emp_id must exist
            if (emp === undefined) {
                this.setMessage("Employee not found");
                return false;
            }
            if (!Validi) {
                // start time must be valid
                if (!this.validEndTime(tc["start_time"], tc["end_time"])) {
                    return false;
                }
            }
        } catch (err) {
            console.log(err);
            this.setMessage("Error validating timecard");
            return false;
        }
    }

    /**
     * 
     * @param {*} d1 
     * @param {*} d2 
     * @returns boolean
     */
    equalDate(d1, d2) {
        return (
            d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate()
        );
    }

    /**
     * 
     * @returns String
     */
    getMessage() {
        return this.message;
    }

    /**
     * 
     * @param {*} message 
     */
    setMessage(message) {
        this.message = message;
        console.log(message);
    }
}

module.exports = Service;
