import { DataSource } from "typeorm";
import { Employee } from "./entity/Employee";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "172.20.0.9",
  port: 5432,
  username: "admin",
  password: "volyty123",
  database: "employee_management",
  synchronize: true,
  logging: false,
  entities: [Employee],
});
