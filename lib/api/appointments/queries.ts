import { db } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type AppointmentId, appointmentIdSchema, appointments } from "@/lib/db/schema/appointments";

export const getAppointments = async () => {
  const { session } = await getUserAuth();
  const a = await db.select().from(appointments).where(eq(appointments.userId, session?.user.id!));
  return { appointments: a };
};

export const getAppointmentById = async (id: AppointmentId) => {
  const { session } = await getUserAuth();
  const { id: appointmentId } = appointmentIdSchema.parse({ id });
  const [a] = await db.select().from(appointments).where(and(eq(appointments.id, appointmentId), eq(appointments.userId, session?.user.id!)));
  return { appointment: a };
};
