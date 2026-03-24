import { Suspense } from "react";
import ResheduleAppointment from "./rescheduleAppointment";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResheduleAppointment />
    </Suspense>
  );
}