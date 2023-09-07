import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createAppointment,
  deleteAppointment,
  updateAppointment,
} from "@/lib/api/appointments/mutations";
import { 
  appointmentIdSchema,
  insertAppointmentParams,
  updateAppointmentParams 
} from "@/lib/db/schema/appointments";

export async function POST(req: Request) {
  try {
    const validatedData = insertAppointmentParams.parse(await req.json());
    const { appointment, error } = await createAppointment(validatedData);
    if (error) return NextResponse.json({ error }, { status: 500 });
    revalidatePath("/appointments"); // optional - assumes you will have named route same as entity
    return NextResponse.json(appointment, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json({ error: err }, { status: 500 });
    }
  }
}


export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updateAppointmentParams.parse(await req.json());
    const validatedParams = appointmentIdSchema.parse({ id });

    const { appointment, error } = await updateAppointment(validatedParams.id, validatedData);

    if (error) return NextResponse.json({ error }, { status: 500 });
    return NextResponse.json(appointment, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedParams = appointmentIdSchema.parse({ id });
    const { appointment, error } = await deleteAppointment(validatedParams.id);
    if (error) return NextResponse.json({ error }, { status: 500 });

    return NextResponse.json(appointment, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
