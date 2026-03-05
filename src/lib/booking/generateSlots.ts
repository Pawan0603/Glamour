function toMinutes(time: string): number {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}

function toTime(minutes: number): string {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;

    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function generateAvailableSlots(
    busySlots: string[],
    opening: string,
    closing: string,
    interval: number,
    serviceDuration: number
) {
    const open = toMinutes(opening);
    const close = toMinutes(closing);

    const busy = busySlots.map((slot) => {
        const [start, end] = slot.split("-");
        return {
            start: toMinutes(start),
            end: toMinutes(end),
        };
    });

    const slots: string[] = [];

    for (let time = open; time + serviceDuration <= close; time += interval) {
        const end = time + serviceDuration;

        const isBusy = busy.some(
            (slot) => time < slot.end && end > slot.start
        );

        if (!isBusy) {
            slots.push(toTime(time));
        }
    }

    return slots;
}