type Appointment = {
  barberName: string;
  appointmentTime: string;
  duration: number;
};

type TimeSlot = {
  start: number;
  end: number;
};

export function getBusySlots(data: Appointment[]) {
  // console.log("getBusySlots : data ;", data)
  const barberMap: Record<string, TimeSlot[]> = {};

  function toMinutes(time: string) {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  }

  function toTime(minutes: number) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;

    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  }

  for (const item of data) {
    const start = toMinutes(item.appointmentTime);
    const end = start + item.duration;

    if (!barberMap[item.barberName]) {
      barberMap[item.barberName] = [];
    }

    barberMap[item.barberName].push({ start, end });
  }

  const result: Record<string, string[]> = {};

  for (const barber in barberMap) {
    const slots = barberMap[barber].sort((a, b) => a.start - b.start);

    const merged: TimeSlot[] = [];

    for (const slot of slots) {
      if (!merged.length || slot.start > merged[merged.length - 1].end) {
        merged.push({ ...slot });
      } else {
        merged[merged.length - 1].end = Math.max(
          merged[merged.length - 1].end,
          slot.end
        );
      }
    }

    result[barber] = merged.map(
      (s) => `${toTime(s.start)}-${toTime(s.end)}`
    );
  }

  // console.log("form getBusySlots fun: ", result)
  return result;
}