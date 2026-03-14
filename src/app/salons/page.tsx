import { Suspense } from "react";
import SalonsPage from "./SalonsPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SalonsPage />
    </Suspense>
  );
}