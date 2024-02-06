import countSportsData from "@/utils/countSportsData";
import { setCounters } from "@/store/filterSlice";
import { CounterType } from "@/types/types";

jest.mock("@/store/filterSlice", () => ({
  setCounters: jest.fn(),
}));

jest.mock("@/data/sports.json", () => jest.requireActual("@/data/sports.json"));

describe("countSportsData", () => {
  it("should count the number of sports matches based on their status", () => {
    const mockDispatch = jest.fn();

    const expectedCounters: CounterType = {
      all: 179,
      result: 93,
      live: 18,
      upcoming: 65,
    };

    const counters = countSportsData(mockDispatch);

    expect(counters).toEqual(expectedCounters);
    expect(mockDispatch).toHaveBeenCalledWith(setCounters(expectedCounters));
  });
});
