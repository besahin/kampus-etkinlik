import { Router } from "express";
import {
  getEvents,
  getEventById,
  createEvent
} from "../controllers/event-controller.js";

const router = Router();

// app.js'te app.use("/events", router) dendiği için buradaki "/" aslında /events demek
router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/", createEvent);

export default router;