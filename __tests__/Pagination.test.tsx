import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Middleware } from "@reduxjs/toolkit";
import Pagination from "@/components/pagination";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RootState } from "@/store/store";
import { goToNextPage, goToPrevPage, goToPage } from "@/store/paginationSlice";

const middlewares: Middleware[] = [];
const mockStore = configureStore(middlewares);

describe("Pagination Component", () => {
  let store;

  beforeEach(() => {
    const initialState: Partial<RootState> = {
      paginationReducer: {
        currentPage: 1,
        totalPages: 10,
      },
    };
    store = mockStore(initialState);
    store.clearActions();
  });

  it("renders the pagination component", () => {
    render(
      <Provider store={store}>
        <Pagination />
      </Provider>
    );

    expect(screen.getByTestId("paginationInput")).toHaveValue(1);
    expect(screen.getByTestId("nextValue")).toHaveTextContent("/ 10");
  });

  it("navigates to the next page when the next button is clicked", () => {
    render(
      <Provider store={store}>
        <Pagination />
      </Provider>
    );

    fireEvent.click(screen.getByLabelText("Next"));

    const actions = store.getActions();
    expect(actions[0]).toEqual(goToNextPage());
  });

  it("navigates to the previous page when the previous button is clicked", () => {
    store = mockStore({
      paginationReducer: {
        currentPage: 2,
        totalPages: 10,
      },
    });

    render(
      <Provider store={store}>
        <Pagination />
      </Provider>
    );

    fireEvent.click(screen.getByLabelText("Previous"));

    const actions = store.getActions();
    expect(actions[0]).toEqual(goToPrevPage());
  });

  it("changes the page when a new value is entered into the input field", () => {
    render(
      <Provider store={store}>
        <Pagination />
      </Provider>
    );

    fireEvent.change(screen.getByTestId("paginationInput"), {
      target: { value: "5" },
    });

    const actions = store.getActions();
    expect(actions[0]).toEqual(goToPage(5));
  });
});
