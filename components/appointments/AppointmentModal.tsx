"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import AppointmentForm from "./AppointmentForm";
import { Appointment } from "@/lib/db/schema/appointments";
import { PlusIcon } from "lucide-react";

export default function AppointmentModal({ 
  appointment,
  emptyState,
}: { 
  appointment?: Appointment;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!appointment?.id;
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
      { emptyState ? (
          <Button>
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            New Appointment
          </Button>
        ) : (
        <Button
          variant={editing ? "ghost" : "outline"}
          size={editing ? "sm" : "icon"}
        >
          {editing ? "Edit" : "+"}
        </Button> )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="px-5 pt-5">
          <DialogTitle>{ editing ? "Edit" : "Create" } Appointment</DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <AppointmentForm closeModal={closeModal} appointment={appointment} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
