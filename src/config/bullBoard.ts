import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
import { Queue } from "bullmq";

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

export const signupQueue = new Queue("signupQueue", {
  connection: {
    host: "127.0.0.1",
    port: 6379
  }
});

createBullBoard({
  queues: [new BullMQAdapter(signupQueue)],
  serverAdapter
});

export { serverAdapter };