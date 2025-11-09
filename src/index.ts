import express from "express";
import { AppDataSource } from "./data-source";
import { Employee } from "./entity/Employee";

const app = express();
app.use(express.json()); 

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    const employeeRepo = AppDataSource.getRepository(Employee); 

    app.post("/employees", async (req, res) => {
        const employee = employeeRepo.create(req.body);
        const result = await employeeRepo.save(employee);
        res.json(result);
    }); 

    app.get("/employees", async (_req, res) => {
        const employees = await employeeRepo.find();
        res.json(employees);
    }); 
    
     app.get("/employees/:id", async (req, res) => {
        const employee = await employeeRepo.findOneBy({ id: Number(req.params.id) });
        if (employee) {
            res.json(employee);
        } else {
            res.status(404).json({ message: "Employee not found" });
        }
     }); 

     app.put("/employees/:id", async (req, res) => {
        const employee = await employeeRepo.findOneBy({ id: Number(req.params.id) });
        if (employee) {
            employeeRepo.merge(employee, req.body);
            const result = await employeeRepo.save(employee);
            res.json(result);
        } else {
            res.status(404).json({ message: "Employee not found" });
        }
    }); 

    app.delete("/employees/:id", async (req, res) => {
        const result = await employeeRepo.delete(req.params.id);
        res.json(result);
    }); 

    app.listen(3000, () => {
        console.log("Server started on port 3000");
    });
  })
  .catch((error) => console.log("Error connecting to DB", error)); 