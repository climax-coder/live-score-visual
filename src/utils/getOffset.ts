import { STROKE_DASH_ARRAY, MAX_LIVE_STATUS_MINS } from './constants';

function stripNonNumChars(str: string): string {
  return str.replace(/[^0-9]/g, '');
}

export default function getOffset(liveStatus: string): string {
  switch (liveStatus) {
    case "FT":
      return "0";
    case "HT":
      return (STROKE_DASH_ARRAY / 2).toString();
    case "-":
      return STROKE_DASH_ARRAY.toString();
    default:
      const minutes = stripNonNumChars(liveStatus);
      return `calc(${STROKE_DASH_ARRAY} - (${STROKE_DASH_ARRAY} * ${minutes}) / ${MAX_LIVE_STATUS_MINS})`;
  }
}