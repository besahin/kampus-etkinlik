import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js";

const app = express();

// Middleware: her isteğin route'a gelmeden önce geçtiği ara adımlar
app.use(cors()); // frontend (localhost:5173) isteklerine izin verir
app.use(express.json()); // gelen JSON gövdesini req.body'ye çevirir

// Sunucu ayakta mı?
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: "2416501054"
  });
});

app.use("/events", eventRoutes);

// Hiçbir adres eşleşmezse
app.use((req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

// Beklenmeyen hatalar (örneğin bozuk JSON) da aynı biçimde dönsün
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: { message: status === 400 ? "Invalid JSON body" : "Server error" }
  });
});

export default app;