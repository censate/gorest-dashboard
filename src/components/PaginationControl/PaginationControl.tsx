import { Pagination } from "@consta/uikit/Pagination";
import { Select } from "@consta/uikit/Select";
import type { PaginationMeta } from "../../types";
import "./PaginationControl.css";

interface PaginationControlProps {
  pagination: PaginationMeta;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

const perPageOptions = [
  { label: "10", value: 10 },
  { label: "25", value: 25 },
  { label: "50", value: 50 },
];

export const PaginationControl = ({
  pagination,
  perPage,
  onPageChange,
  onPerPageChange,
}: PaginationControlProps) => {
  return (
    <div className="pagination-control">
      <Pagination
        items={pagination.pages}
        value={pagination.page}
        onChange={onPageChange}
        size="s"
      />
      <Select
        items={perPageOptions}
        value={perPageOptions.find((opt) => opt.value === perPage)}
        onChange={(option) => onPerPageChange(option?.value || 10)}
        getItemKey={(item) => String(item.value)}
        size="s"
        className="pagination-control__select"
      />
    </div>
  );
};
