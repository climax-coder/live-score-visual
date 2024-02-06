"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FilterType, GameData } from "@/types/types";
import { AppDispatch, useAppSelector } from "@/store/store";
import MemoizedCard from "./card";
import getSportsData from "@/utils/getSportsData";
import styled from "styled-components";

const CardsContainer = styled.section`
  background-color: #e5e7eb;
  flex-grow: 1;
`;

const CardsWrapper = styled.div`
  padding: 0 1rem;
  padding-bottom: 1.5rem;
  margin: auto;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(1, 1fr);

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default function Cards() {
  const selectedFilter: FilterType = useAppSelector(
    (state) => state.filterReducer.selectedFilter
  );

  const currentPage: number = useAppSelector(
    (state) => state.paginationReducer.currentPage
  );

  const dispatch = useDispatch<AppDispatch>();
  const [sportsData, setSportsData] = React.useState<GameData[]>([]);

  useEffect(() => {
    const data = getSportsData(selectedFilter, currentPage, dispatch);
    setSportsData(data);
  }, [selectedFilter, currentPage, dispatch]);

  return (
    <CardsContainer>
      <CardsWrapper>
        <CardsGrid>
          {sportsData &&
            sportsData.map((data) => (
              <MemoizedCard key={data.id} game={data} />
            ))}
        </CardsGrid>
      </CardsWrapper>
    </CardsContainer>
  );
}
