import mongoose from "mongoose";

// Schema: bir etkinlik kaydının alanları ve kuralları
const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, minlength: 3, maxlength: 100 },
    category: {
      type: String,
      required: true,
      enum: ["Seminer", "Atölye", "Söyleşi", "Yarışma"]
    },
    capacity: { type: Number, min: 0, default: 0 },
    date: { type: String, required: true },
    time: { type: String, trim: true, default: "" },
    location: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, maxlength: 500, default: "" }
  },
  { timestamps: true } // createdAt ve updatedAt kendiliğinden eklenir
);

// Model adı "Event" -> MongoDB'de collection adı otomatik "events" olur
export const Event = mongoose.model("Event", eventSchema);