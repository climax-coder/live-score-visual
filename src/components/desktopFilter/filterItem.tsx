import { memo } from "react";
import styled, { css } from "styled-components";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import { FilterType } from "@/types/types";

interface FilterButtonProps {
  isSelected: boolean;
  customStyles?: string;
}

const FilterButton = styled.button<FilterButtonProps>`
  display: flex;
  align-items: center;
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

  ${({ customStyles }) =>
    customStyles &&
    css`
      ${customStyles}
    `}
`;

const FilterLabel = styled.span`
  font-weight: 500;
`;

const FilterCount = styled.span`
  font-size: 0.75rem;
  margin-left: 0.25rem;
`;

interface FilterItemProps {
  selectedFilter: FilterType;
  filterType: FilterType;
  count: number;
  onClick: (filter: string) => void;
  customStyles?: string;
}

function FilterItem({
  selectedFilter,
  filterType,
  count,
  onClick,
  customStyles,
}: FilterItemProps) {
  const isSelected = selectedFilter === filterType;

  return (
    <FilterButton
      data-testid={`filter-button-${filterType}`}
      isSelected={isSelected}
      customStyles={customStyles}
      onClick={() => onClick(filterType)}
    >
      <FilterLabel data-testid={`filter-label-${filterType}`}>
        {capitalizeFirstLetter(filterType)}
      </FilterLabel>
      <FilterCount data-testid={`filter-count-${filterType}`}>
        ({count})
      </FilterCount>
    </FilterButton>
  );
}

export default memo(FilterItem);
