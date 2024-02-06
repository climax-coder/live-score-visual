"use client";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { CounterType, FilterType } from "@/types/types";
import { AppDispatch, useAppSelector } from "@/store/store";
import { goToPage } from "@/store/paginationSlice";
import { setFilter } from "@/store/filterSlice";
import MemoizedFilterItem from "./filterItem";
import countSportsData from "@/utils/countSportsData";
import styled from "styled-components";

const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  display: none;
  gap: 0.25rem;

  @media (min-width: 1024px) {
    display: flex;
  }
`;

const FiltersList = styled.div`
  display: none;
  gap: 0.25rem;

  @media (min-width: 1024px) {
    display: flex;
  }
`;

export default function DesktopFilter() {
  const selectedFilter: FilterType = useAppSelector(
    (state) => state.filterReducer.selectedFilter
  );
  const dispatch = useDispatch<AppDispatch>();
  const counters: CounterType = useMemo(() => countSportsData(dispatch), []);

  const onClickFilter = (filter: string): void => {
    dispatch(setFilter(filter));
    dispatch(goToPage(1));
  };

  return (
    <FiltersContainer>
      {Object.values(FilterType).map((filterType) => (
        <MemoizedFilterItem
          key={filterType}
          selectedFilter={selectedFilter}
          filterType={filterType}
          count={counters?.[filterType]}
          onClick={onClickFilter}
        />
      ))}
    </FiltersContainer>
  );
}
