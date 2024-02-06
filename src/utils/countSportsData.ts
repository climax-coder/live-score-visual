import sportsData from '../data/sports.json';
import { AppDispatch } from '@/store/store';
import { CounterType } from '@/types/types';
import { setCounters } from '@/store/filterSlice';

export default function countSportsData(dispatch: AppDispatch): CounterType {
  const initialCounters: CounterType = {
    all: 0,
    result: 0,
    live: 0,
    upcoming: 0,
  };
  const counters = sportsData.reduce((acc, match) => {
    const statusType = match.status.type;

    return {
      ...acc,
      all: acc.all + 1,
      result: statusType === 'finished' ? acc.result + 1 : acc.result,
      live: statusType === 'inprogress' ? acc.live + 1 : acc.live,
      upcoming: statusType === 'notstarted' ? acc.upcoming + 1 : acc.upcoming,
    };
  }, initialCounters);

  dispatch(setCounters(counters));

  return counters;
}