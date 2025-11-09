import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connected");

    app.get("/", (req, res) => {
      res.send("TypeORM + Express working!");
    });

    app.listen(3000, () => {
      console.log("✅ Server running on port 3000");
    });
  })
  .catch((error) => console.error("❌ DB error:", error));
