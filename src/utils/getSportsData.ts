import { Action, Dispatch } from '@reduxjs/toolkit';
import { FilterType, StatusType, GameData } from '@/types/types';
import { setTotalPages } from '@/store/paginationSlice';
import getFilterAsStatus from '@/utils/getFilterAsStatus';
import { DATA_PER_PAGE } from '@/utils/constants';

const StatusMap = new Map([
  ["finished", { type: StatusType.Finished, label: "ENDED" }],
  ["inprogress", { type: StatusType.Inprogress, label: "LIVE" }],
  ["notstarted", { type: StatusType.NotStarted, label: "UPCOMING" }],
]);

export default function getSportsData(
  selectedFilter: FilterType,
  currentPage: number,
  dispatch: Dispatch<Action>,
): GameData[] {
  const sports = require('@/data/sports.json') as GameData[];
  const filteredSportsData = filterSportsData(sports, selectedFilter);
  const paginatedData = paginateSportsData(filteredSportsData, currentPage, dispatch);
  const convertedData = convertSportsData(paginatedData);
  return convertedData;
}

function filterSportsData(sports: GameData[], selectedFilter: FilterType): GameData[] {
  const statusFilter = getFilterAsStatus(selectedFilter);
  const filteredData = sports.filter((item) => statusFilter.includes(item.status.type));
  return filteredData;
}

function paginateSportsData(sports: GameData[], currentPage: number, dispatch: Dispatch<Action>): GameData[] {
  const totalDataCount = sports.length;
  const pageCount = Math.ceil(totalDataCount / DATA_PER_PAGE);
  dispatch(setTotalPages(pageCount));

  if (currentPage < 1 || currentPage > pageCount) {
    return [];
  }

  const start = (currentPage - 1) * DATA_PER_PAGE;
  const end = start + DATA_PER_PAGE;

  const paginatedData = sports.slice(start, end);
  return paginatedData;
}

function convertSportsData(sports: GameData[]): GameData[] {
  const convertedData = sports.map((game) => ({
    ...game,
    status: StatusMap.get(game.status.type) ?? { type: game.status.type, label: game.status.type.toUpperCase() },
    homeTeam: {
      name: game.homeTeam.name,
      score: game.homeScore.current ?? 0,
    },
    awayTeam: {
      name: game.awayTeam.name,
      score: game.awayScore.current ?? 0,
    },
  }));
  return convertedData;
}