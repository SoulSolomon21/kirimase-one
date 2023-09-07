"use client";
import { Appointment } from "@/lib/db/schema/appointments";
import { trpc } from "@/lib/trpc/client";
import AppointmentModal from "./AppointmentModal";


export default function AppointmentList({ appointments }: { appointments: Appointment[] }) {
  const { data: a } = trpc.appointments.getAppointments.useQuery(undefined, {
    initialData: { appointments },
    refetchOnMount: false,
  });

  if (a.appointments.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {a.appointments.map((appointment) => (
        <Appointment appointment={appointment} key={appointment.id} />
      ))}
    </ul>
  );
}

const Appointment = ({ appointment }: { appointment: Appointment }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{appointment.status}</div>
      </div>
      <AppointmentModal appointment={appointment} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No appointments</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new appointment.
      </p>
      <div className="mt-6">
        <AppointmentModal emptyState={true} />
      </div>
    </div>
  );
};

