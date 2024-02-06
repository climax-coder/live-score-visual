import getStatusLabel from "@/utils/getStatusLabel";
import { StatusType, StatusObj } from "@/types/types";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

describe("getStatusLabel", () => {
  it("should return the status label if the status type is not NotStarted", () => {
    const status: StatusObj = { type: StatusType.Finished, label: "ENDED" };
    const timestamp: number = 1609459200;
    const label: string = getStatusLabel(status, timestamp);
    expect(label).toBe("ENDED");
  });

  it("should return a formatted date string if the status type is NotStarted", () => {
    const status: StatusObj = { type: StatusType.NotStarted, label: "UPCOMING" };
    const timestamp = 1609459200;
    const label: string = getStatusLabel(status, timestamp);
    const expectedDateStr = dayjs(timestamp * 1000)
      .format("MMM Do HH:mm")
      .toUpperCase();
    expect(label).toBe(expectedDateStr);
  });
});
