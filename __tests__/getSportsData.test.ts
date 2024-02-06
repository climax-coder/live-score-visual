import { DATA_PER_PAGE } from "@/utils/constants";
import getSportsData from "@/utils/getSportsData";
import { FilterType, StatusType, GameData } from "@/types/types";
import { setTotalPages } from "@/store/paginationSlice";
import { Dispatch } from '@reduxjs/toolkit';

const mockDispatch = jest.fn<Dispatch<any>, any>();
const RESULT_DOCS_COUNT = 93;
const LIVE_DOCS_COUNT = 18;
const UPCOMING_DOCS_COUNT = 65;
const FINISHED_STATUS = StatusType.Finished;
const INPROGRESS_STATUS = StatusType.Inprogress;
const NOT_STARTED_STATUS = StatusType.NotStarted;

jest.mock('@/data/sports.json', () => jest.requireActual('@/data/sports.json'));

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

jest.mock("@/store/paginationSlice", () => ({
  setTotalPages: jest.fn(),
}));

describe("getSportsData Function", () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    (setTotalPages as jest.Mock).mockClear();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const testRequiredFields = (data: GameData) => {
    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("competition");
    expect(data).toHaveProperty("country");
    expect(data).toHaveProperty("timestamp");
    expect(data).toHaveProperty("status");
    expect(data).toHaveProperty("homeTeam");
    expect(data).toHaveProperty("awayTeam");
    expect(data).toHaveProperty("liveStatus");

    expect(data.homeTeam).toHaveProperty("name");
    expect(data.homeTeam).toHaveProperty("score");
    expect(data.awayTeam).toHaveProperty("name");
    expect(data.awayTeam).toHaveProperty("score");
  };

  describe.each([
    [FilterType.Result, FINISHED_STATUS, RESULT_DOCS_COUNT],
    [FilterType.Live, INPROGRESS_STATUS, LIVE_DOCS_COUNT],
    [FilterType.Upcoming, NOT_STARTED_STATUS, UPCOMING_DOCS_COUNT],
    [
      FilterType.All,
      '',
      RESULT_DOCS_COUNT + LIVE_DOCS_COUNT + UPCOMING_DOCS_COUNT,
    ],
  ])("Filter: %s", (filter, status, expectedCount) => {
    it(`should return documents for filter: ${filter}`, () => {
      const currentPage = 1;
      const convertedData = getSportsData(filter, currentPage, mockDispatch);
      if (status) {
        convertedData.forEach((data) => {
          expect(data.status.type).toBe(status);
        });
      } else {
        const statusTypes = new Set(
          convertedData.map((item) => item.status.type)
        );
        expect(statusTypes.size).toBeGreaterThan(0);
      }

      if (convertedData.length > 0) {
        testRequiredFields(convertedData[0]);
      }

      expect(convertedData.length).toBeLessThanOrEqual(DATA_PER_PAGE);
      expect(mockDispatch).toHaveBeenCalledWith(
        setTotalPages(expect.any(Number))
      );
    });
  });
});
