const path = require("path");
const { workerData } = require("worker_threads");

require("ts-node").register({ transpileOnly: true });

require(path.resolve(__dirname, './setMetaThumbnailsAndCount.ts'));