console.log("ENV Loaded:", process.env.DATABASE_URL);
require("dotenv").config();
const express = require("express");
const app = express();
const policyRoutes = require("./routes/policyRoutes");
const lifecycleRoutes = require("./routes/lifecycleRoutes");
const startCron = require("./services/cronJob");

app.use(express.json());
app.use("/api", policyRoutes);
app.use("/api", lifecycleRoutes);

startCron(); // starts daily job

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Data Lifecycle Service running on ${PORT}`));
