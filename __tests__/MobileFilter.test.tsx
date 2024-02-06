import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import configureStore from "redux-mock-store";
import MobileFilter from "@/components/mobileFilter";
import { FilterType } from "@/types/types";
import { setFilter } from "@/store/filterSlice";

const mockStore = configureStore();

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

const store = mockStore(initialState);

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("MobileFilter Component", () => {
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(store.dispatch);
  });

  afterEach(() => {
    (useDispatch as jest.Mock).mockClear();
  });

  it("renders the mobile filter dropdown with the correct selected value", () => {
    const { getByDisplayValue } = render(
      <Provider store={store}>
        <MobileFilter />
      </Provider>
    );

    expect(getByDisplayValue("All (179)")).toBeInTheDocument();
  });

  it("dispatches the setFilter action when a new filter is selected", () => {
    const { getByDisplayValue } = render(
      <Provider store={store}>
        <MobileFilter />
      </Provider>
    );

    fireEvent.change(getByDisplayValue("All (179)"), {
      target: { value: FilterType.Result },
    });

    const actions = store.getActions();
    expect(actions).toContainEqual(setFilter(FilterType.Result));
  });
});
