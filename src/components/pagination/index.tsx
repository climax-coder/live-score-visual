"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/store/store";
import { PaginationState } from "@/types/types";
import { goToNextPage, goToPrevPage, goToPage } from "@/store/paginationSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import styled, { css } from "styled-components";

interface PaginationButtonProps {
  isSelected: boolean;
}

const buttonStyles = css<PaginationButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: medium;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
  background-color: ${({ isSelected }) =>
    isSelected ? "#f1f5f9" : "transparent"};
  color: ${({ isSelected }) => (isSelected ? "#4f46e5" : "#4b5563")};
  box-shadow: ${({ isSelected }) =>
    isSelected
      ? "0 8px 9px -4px rgba(59, 113, 202, 0.3), 0 4px 18px 0 rgba(59, 113, 202, 0.2)"
      : "none"};
  &:hover {
    background-color: #f1f5f9;
    color: #4f46e5;
  }
`;

const PaginationContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
`;

const PaginationInput = styled.input`
  width: 3rem;
  text-align: center;
  border: 2px solid #dddddd;
  border-radius: 5px;
  margin: 0 12px;
  padding: 4px 8px;
  font-size: 1rem;
  color: #333333;
  &:focus {
    outline: none;
    border-color: #4f46e5;
  }
`;

const PageIndicator = styled.p`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #333333;
  margin: 0;
`;

const PaginationButton = styled.button.attrs<PaginationButtonProps>(
  () => ({})
)<PaginationButtonProps>`
  ${buttonStyles}
  &:disabled {
    color: #dddddd;
    cursor: not-allowed;
    background-color: transparent;
    box-shadow: none;
  }
  background-color: ${({ isSelected }) =>
    isSelected ? "#f1f5f9" : "transparent"};
  color: ${({ isSelected }) => (isSelected ? "#4f46e5" : "#4b5563")};
  box-shadow: ${({ isSelected }) =>
    isSelected
      ? "0 8px 9px -4px rgba(59, 113, 202, 0.3), 0 4px 18px 0 rgba(59, 113, 202, 0.2)"
      : "none"};
  &:hover {
    background-color: #f1f5f9;
    color: #4f46e5;
  }
`;

export default function Pagination() {
  const { currentPage, totalPages }: PaginationState = useAppSelector(
    (state) => state.paginationReducer
  );

  const [clientMax, setClientMax] = useState(totalPages);
  useEffect(() => {
    setClientMax(totalPages);
  }, [totalPages]);

  const dispatch = useDispatch<AppDispatch>();

  const onClickPrev = (): void => {
    if (currentPage > 1) dispatch(goToPrevPage());
  };
  const onClickNext = (): void => {
    if (currentPage < totalPages) dispatch(goToNextPage());
  };

  const onChangePage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newPage = parseInt(e.target.value);
    if (newPage <= totalPages && newPage >= 1) {
      dispatch(goToPage(newPage));
    }
  };

  return (
    <PaginationContainer aria-label="Pagination">
      <PaginationButton
        onClick={onClickPrev}
        aria-label="Previous"
        disabled={currentPage === 1}
        isSelected={currentPage === 1}
      >
        <FontAwesomeIcon icon={faChevronLeft} size="lg" />
      </PaginationButton>
      <PaginationInput
        data-testid="paginationInput"
        type="number"
        value={currentPage}
        onChange={onChangePage}
        min={1}
        max={clientMax}
      />
      <PageIndicator data-testid="nextValue" suppressHydrationWarning>
        <span>/</span> {totalPages}
      </PageIndicator>
      <PaginationButton
        onClick={onClickNext}
        aria-label="Next"
        disabled={currentPage === totalPages}
        isSelected={currentPage === totalPages}
      >
        <FontAwesomeIcon icon={faChevronRight} size="lg" />
      </PaginationButton>
    </PaginationContainer>
  );
}
