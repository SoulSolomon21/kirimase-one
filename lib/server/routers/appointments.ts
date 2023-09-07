import { getAppointmentById, getAppointments } from "@/lib/api/appointments/queries";
import { publicProcedure, router } from "../trpc";
import {
  appointmentIdSchema,
  insertAppointmentParams,
  updateAppointmentParams,
} from "@/lib/db/schema/appointments";
import { createAppointment, deleteAppointment, updateAppointment } from "@/lib/api/appointments/mutations";

export const appointmentsRouter = router({
  getAppointments: publicProcedure.query(async () => {
    return getAppointments();
  }),
  getAppointmentById: publicProcedure.input(appointmentIdSchema).query(async ({ input }) => {
    return getAppointmentById(input.id);
  }),
  createAppointment: publicProcedure
    .input(insertAppointmentParams)
    .mutation(async ({ input }) => {
      return createAppointment(input);
    }),
  updateAppointment: publicProcedure
    .input(updateAppointmentParams)
    .mutation(async ({ input }) => {
      return updateAppointment(input.id, input);
    }),
  deleteAppointment: publicProcedure
    .input(appointmentIdSchema)
    .mutation(async ({ input }) => {
      return deleteAppointment(input.id);
    }),
});
