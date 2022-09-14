import http from "http";
import bodyParser from "body-parser";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import logging from "./config/logging";
import config from "./config/config";
import userRoutes from "./routes/users.route";
import "reflect-metadata";
import { dataSource } from "./config/dataSource";
import productRoutes from "./routes/products.route";
import orderRoutes from "./routes/order.route";
import authRoutes from "./routes/auth.route";

const NAMESPACE = "Server";
const router = express();

dataSource
  .initialize()
  .then(() => {
    console.log("Database connection established!");
  })
  .catch((error) => console.log(error));
/** Log the request */
router.use((req, res, next) => {
  /** Log the req */
  logging.info(
    NAMESPACE,
    `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );

  res.on("finish", () => {
    /** Log the res */
    logging.info(
      NAMESPACE,
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });

  next();
});

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cors());
router.use(helmet());

/** Rules of our API */
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

/** Routes go here */
router.use("/api/users", userRoutes);
router.use("/api/auth", authRoutes);
router.use("/api/products", productRoutes);
router.use("/api/orders", orderRoutes);

/** Error handling */
router.use((req, res, next) => {
  const error = new Error("Not found");

  res.status(404).json({
    message: error.message,
  });
});

const httpServer = http.createServer(router);

httpServer.listen(config.server.port, () =>
  logging.info(
    NAMESPACE,
    `Server is running ${config.server.hostname}:${config.server.port}`
  )
);
