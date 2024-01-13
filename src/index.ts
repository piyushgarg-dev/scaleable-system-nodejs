import express from "express";
import { Queue } from "bullmq";
import { addUserToCourseQuery } from "./utils/course";
import { mockSendEmail } from "./utils/email";

const app = express();
const PORT = process.env.PORT ?? 8000;

const emailQueue = new Queue("email-queue", {
  connection: {
    host: "redis-17528355-piyushgarg-2e77.a.aivencloud.com",
    port: 23898,
    username: "default",
    password: "AVNS_CViKExNgbBwxnUSjWR0",
  },
});

app.get("/", (req, res) => {
  return res.json({ status: "success", message: "Hello from Express Server" });
});

app.post("/add-user-to-course", async (req, res) => {
  console.log("Adding user to course");
  // Critical
  await addUserToCourseQuery();

  await emailQueue.add(`${Date.now()}`, {
    from: "piyushgarg.dev@gmail.com",
    to: "student@gmail.com",
    subject: "Congrats on enrolling in Twitter Course",
    body: "Dear Student, You have been enrolled to Twitter Clone Course.",
  });

  return res.json({ status: "success", data: { message: "Enrolled Success" } });
});

app.listen(PORT, () => console.log(`Express Server Started on PORT:${PORT}`));
