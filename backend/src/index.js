import express from "express";
import productRoutes from "./api/product.js";
import userRoutes from "./api/user.js";
import adminRouter from "./api/Admin.js";
import categoryRoutes from "./api/category.js";
import errorHandler from "./middleware/errorHandler.js";
import cors from "cors";
import connect from "../connection.js"
const app = express();

connect
// app = something;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/admins", adminRouter);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// (async () => {
//     const batches = await batchService.listAllBatches();
//     console.log(batches);
// })();
