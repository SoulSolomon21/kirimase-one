import AppointmentList from "@/components/appointments/AppointmentList";
import NewAppointmentModal from "@/components/appointments/AppointmentModal";
import { getAppointments } from "@/lib/api/appointments/queries";
import { checkAuth } from "@/lib/auth/utils";

export default async function Appointments() {
  await checkAuth();
  const { appointments } = await getAppointments();  

  return (
    <main className="max-w-3xl mx-auto p-5 sm:p-0 sm:pt-4">
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Appointments</h1>
        <NewAppointmentModal />
      </div>
      <AppointmentList appointments={appointments} />
    </main>
  );
}
