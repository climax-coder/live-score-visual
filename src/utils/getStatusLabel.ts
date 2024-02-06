
import { StatusObj, StatusType } from "@/types/types";
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat);

export default function getStatusLabel(status: StatusObj, timestamp: number): string {
  if (status.type !== StatusType.NotStarted) {
    return status.label
  }

  const date = dayjs(timestamp * 1000);
  return date.format('MMM Do HH:mm').toUpperCase();
}