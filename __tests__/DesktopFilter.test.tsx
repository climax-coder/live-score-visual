import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider, useDispatch, useSelector } from "react-redux";
import configureStore from "redux-mock-store";
import DesktopFilter from "@/components/desktopFilter";
import { FilterType } from "@/types/types";

const mockStore = configureStore();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("DesktopFilter Component", () => {
  let store;

  beforeEach(() => {
    const initialState = {
      filterReducer: {
        selectedFilter: FilterType.All,
        counters: {
          all: 179,
          result: 93,
          live: 18,
          upcoming: 65,
        },
      },
    };
    store = mockStore(initialState);
    (useDispatch as jest.Mock).mockReturnValue(store.dispatch);
    (useSelector as jest.Mock).mockImplementation((selector) =>
      selector(store.getState())
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders filter items with counts and responds to click events", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <DesktopFilter />
      </Provider>
    );

    const resultFilterButton = getByTestId("filter-button-result");
    const resultFilterLabel = getByTestId("filter-label-result");
    const resultFilterCount = getByTestId("filter-count-result");

    expect(resultFilterLabel).toHaveTextContent("Result");
    expect(resultFilterCount).toHaveTextContent("(93)");

    fireEvent.click(resultFilterButton);

    const actions = store.getActions();
    expect(actions).toContainEqual(
      expect.objectContaining({
        type: "filter/setFilter",
        payload: FilterType.Result,
      })
    );

    expect(actions).toContainEqual(
      expect.objectContaining({
        type: "pagination/goToPage",
        payload: 1,
      })
    );
  });
});
