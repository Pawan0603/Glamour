import { Suspense } from "react";
import BookAppointmentPage from "./BookAppointmentPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookAppointmentPage />
    </Suspense>
  );
}