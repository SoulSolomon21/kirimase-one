import { text, date, timestamp, serial, varchar, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { users } from "./auth";

export const appointments = pgTable('appointments', {
  id: serial("id").primaryKey(),
  status: text("status").notNull(),
  appointmentDate: date("appointment_date").notNull(),
  counselorName: text("counselor_name").notNull(),
  clientName: text("client_name").notNull(),
  time: timestamp("time").notNull(),
  userId: varchar("user_id", { length: 256 }).references(() => users.id, { onDelete: "cascade" }).notNull(),
}, (appointments) => {
  return {
    clientNameIndex: uniqueIndex('client_name_idx').on(appointments.clientName),
  }
});
 

// Schema for appointments - used to validate API requests
export const insertAppointmentSchema = createInsertSchema(appointments);
export const insertAppointmentParams = createSelectSchema(appointments, {
  appointmentDate: z.coerce.date(),
  time: z.coerce.date()
}).omit({ 
  id: true,
  userId: true
});
export const updateAppointmentSchema = createSelectSchema(appointments);
export const updateAppointmentParams = createSelectSchema(appointments, {
  appointmentDate: z.coerce.date(),
  time: z.coerce.date()
}).omit({ 
  userId: true
});
export const appointmentIdSchema = updateAppointmentSchema.pick({ id: true });

// Types for appointments - used to type API request params and within Components
export type Appointment = z.infer<typeof updateAppointmentSchema>;
export type NewAppointment = z.infer<typeof insertAppointmentSchema>;
export type NewAppointmentParams = z.infer<typeof insertAppointmentParams>;
export type UpdateAppointmentParams = z.infer<typeof updateAppointmentParams>;
export type AppointmentId = z.infer<typeof appointmentIdSchema>["id"];
