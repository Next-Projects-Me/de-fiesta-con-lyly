import { addDays, isWeekend } from 'date-fns';

export function addBusinessDaysCustom(date: Date, numberOfDays: number): Date {
    let result = new Date(date);
    let added = 0;

    while (added < numberOfDays) {
        result = addDays(result, 1);
        if (!isWeekend(result)) {
            added++;
        }
    }

    return result;
}
