import { GridFilterModel } from "@mui/x-data-grid";

export function onHandleFilterChange<T extends { search: string }>(
    filterModel: GridFilterModel,
    options: T,
    setOptions: (opts: T) => void
) {
    const search = filterModel?.quickFilterValues?.[0] || "";
    setOptions({...options, search})
}