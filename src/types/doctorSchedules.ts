import { Doctor } from "./doctor";

export interface DoctorSchedule {
  doctorId: string;
  scheduleId: string;
  isBooked: boolean;
  createdAt: string;
  updatedAt: string;
  appointmentId: string | null;
  doctor: Doctor;
  schedule: Schedule;
}

export interface Schedule {
  id: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}
