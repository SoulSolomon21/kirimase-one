import { db } from "@/lib/db";
import { and, eq } from "drizzle-orm";
import { 
  AppointmentId, 
  NewAppointmentParams,
  UpdateAppointmentParams, 
  updateAppointmentSchema,
  insertAppointmentSchema, 
  appointments,
  appointmentIdSchema 
} from "@/lib/db/schema/appointments";
import { getUserAuth } from "@/lib/auth/utils";

export const createAppointment = async (appointment: NewAppointmentParams) => {
  const { session } = await getUserAuth();
  const newAppointment = insertAppointmentSchema.parse({ ...appointment, userId: session?.user.id! });
  try {
    const [a] =  await db.insert(appointments).values(newAppointment).returning();
    return { appointment: a };
  } catch (err) {
    return { error: (err as Error).message ?? "Error, please try again" };
  }
};

export const updateAppointment = async (id: AppointmentId, appointment: UpdateAppointmentParams) => {
  const { session } = await getUserAuth();
  const { id: appointmentId } = appointmentIdSchema.parse({ id });
  const newAppointment = updateAppointmentSchema.parse({ ...appointment, userId: session?.user.id! });
  try {
    const [a] =  await db
     .update(appointments)
     .set(newAppointment)
     .where(and(eq(appointments.id, appointmentId!), eq(appointments.userId, session?.user.id!)))
     .returning();
    return { appointment: a };
  } catch (err) {
    return { error: (err as Error).message ?? "Error, please try again" };
  }
};

export const deleteAppointment = async (id: AppointmentId) => {
  const { session } = await getUserAuth();
  const { id: appointmentId } = appointmentIdSchema.parse({ id });
  try {
    const [a] =  await db.delete(appointments).where(and(eq(appointments.id, appointmentId!), eq(appointments.userId, session?.user.id!)))
    .returning();
    return { appointment: a };
  } catch (err) {
    return { error: (err as Error).message ?? "Error, please try again" };
  }
};

