import { useAppSelector } from "@/store/store";
import { useDispatch } from "react-redux";
import { setFilter } from "@/store/filterSlice";
import { FilterType, CounterType } from "@/types/types";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import styled from "styled-components";

const Select = styled.select`
  padding: 10px;
  border-radius: 8px;
  border: 2px solid #ddd;
  background-color: white;
  color: #333;
  font-size: 16px;
  margin: 10px 0;

  &:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 2px #E6E1E6;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;

const MobileFilter = () => {
  const dispatch = useDispatch();
  const selectedFilter: FilterType = useAppSelector(
    (state) => state.filterReducer.selectedFilter
  );
  const counters: CounterType = useAppSelector(
    (state) => state.filterReducer.counters
  );

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilter(event.target.value as FilterType));
  };

  return (
    <Select value={selectedFilter} onChange={handleSelectChange}>
      {Object.values(FilterType).map((filterType) => (
        <option key={filterType} value={filterType}>
          {`${capitalizeFirstLetter(filterType)} (${counters[filterType] ?? 0})`}
        </option>
      ))}
    </Select>
  );
};

export default MobileFilter;
