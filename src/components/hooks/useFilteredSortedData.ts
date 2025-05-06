import { useMemo } from "react";
import { Property, Owner } from "../../types";

export const useFilteredSortedData = <T extends Property | Owner>(
  data: T[],
  sortBy: string,
  filterBy?: Record<string, any>
): T[] => {
  return useMemo(() => {
    let result = [...data];

    // Apply filters
    if (filterBy) {
      Object.entries(filterBy).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          result = result.filter((item: any) =>
            item[key as keyof typeof item]
              ?.toString()
              .toLowerCase()
              .includes(value.toString().toLowerCase())
          );
        }
      });
    }

    // Sort by field
    switch (sortBy) {
      case "value":
        return result.sort((a: any, b: any) => b.value - a.value);
      case "netWorth":
        return result.sort(
          (a: any, b: any) => b.netWorth?.estimate - a.netWorth?.estimate
        );
      default:
        return result;
    }
  }, [data, sortBy, filterBy]);
};
