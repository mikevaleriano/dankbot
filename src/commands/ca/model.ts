import { model, Schema } from "mongoose";

export const CaModel = model(
  "ca",
  new Schema(
    {
      name: { type: String, required: true },
      yellow: { type: Number, required: false, default: 1 },
      red: { type: Number, required: false, default: 0 }
    },
    { collection: "niggas" }
  )
);
