import cluster from "cluster";
import os from "os";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

try {
  if (cluster.isPrimary) {
    const numCPUs = os.cpus().length;
    console.log("Server running on port: " + PORT);
    console.log(`[CLUSTER] >> Primary ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(`[CLUSTER] >> Worker ${worker.process.pid} died...`);
    });
  } else {
    app.listen(PORT, () => {
      console.log(`[CLUSTER] >> Worker ${process.pid} started.`);
    });
  }
} catch (error) {
  console.error(error);
}
