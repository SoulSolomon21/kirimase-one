"use client";

import { Appointment, NewAppointmentParams, insertAppointmentParams } from "@/lib/db/schema/appointments";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc/client";
import { Button } from "../ui/button";
import { z } from "zod";
import { useRouter } from "next/navigation";

const AppointmentForm = ({
  appointment,
  closeModal,
}: {
  appointment?: Appointment;
  closeModal: () => void;
}) => {

  const editing = !!appointment?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertAppointmentParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertAppointmentParams),
    defaultValues: appointment ?? {
      status: "",appointmentDate: "",counselorName: "",clientName: "",time: ""
    },
  });

  const onSuccess = () => {
    utils.appointments.getAppointments.invalidate();
    router.refresh();
    closeModal();
  };

  const { mutate: createAppointment, isLoading: isCreating } =
    trpc.appointments.createAppointment.useMutation({
      onSuccess,
    });

  const { mutate: updateAppointment, isLoading: isUpdating } =
    trpc.appointments.updateAppointment.useMutation({
      onSuccess,
    });

  const { mutate: deleteAppointment, isLoading: isDeleting } =
    trpc.appointments.deleteAppointment.useMutation({
      onSuccess,
    });

  const handleSubmit = (values: NewAppointmentParams) => {
    if (editing) {
      updateAppointment({ ...values, id: appointment.id });
    } else {
      createAppointment(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (<FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="appointmentDate"
          render={({ field }) => (<FormItem>
              <FormLabel>Appointment Date</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="counselorName"
          render={({ field }) => (<FormItem>
              <FormLabel>Counselor Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="clientName"
          render={({ field }) => (<FormItem>
              <FormLabel>Client Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (<FormItem>
              <FormLabel>Time</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mr-1"
          disabled={isCreating || isUpdating}
        >
          {editing
            ? `Sav${isUpdating ? "ing..." : "e"}`
            : `Creat${isCreating ? "ing..." : "e"}`}
        </Button>
        {editing ? (
          <Button
            type="button"
            variant={"destructive"}
            onClick={() => deleteAppointment({ id: appointment.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default AppointmentForm;
