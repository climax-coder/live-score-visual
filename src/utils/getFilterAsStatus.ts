import { FilterType, StatusType } from "@/types/types"

export default function getFilterAsStatus(filterType: FilterType): string[] {
  switch (filterType) {
    case FilterType.Live:
      return [StatusType.Inprogress]
    case FilterType.Upcoming:
      return [StatusType.NotStarted]
    case FilterType.Result:
      return [StatusType.Finished]
    case FilterType.All:
      return [StatusType.Inprogress, StatusType.NotStarted, StatusType.Finished, StatusType.Canceled]
    default:
      return []
  }
}