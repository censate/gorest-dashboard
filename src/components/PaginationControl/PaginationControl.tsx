import type { PaginationMeta } from "../../types";
import "./PaginationControl.css";

interface PaginationControlProps {
  pagination: PaginationMeta;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

export const PaginationControl = ({
  pagination,
  perPage,
  onPageChange,
  onPerPageChange,
}: PaginationControlProps) => {
  const getPageNumbers = () => {
    const total = pagination.pages;
    const current = pagination.page;
    const pages: (number | string)[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      if (current > 3) pages.push("...");

      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (current < total - 2) pages.push("...");
      pages.push(total);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination-control">
      <div className="pagination-pages">
        <button
          className="pagination-btn"
          disabled={pagination.page === 1}
          onClick={() => onPageChange(pagination.page - 1)}
        >
          ← Предыдущая
        </button>
        <div className="pagination-numbers">
          {pageNumbers.map((num, idx) =>
            num === "..." ? (
              <span key={`dots-${idx}`} className="page-dots">
                …
              </span>
            ) : (
              <button
                key={num}
                className={`page-num ${pagination.page === num ? "active" : ""}`}
                onClick={() => onPageChange(num as number)}
              >
                {num}
              </button>
            ),
          )}
        </div>
        <button
          className="pagination-btn"
          disabled={pagination.page === pagination.pages}
          onClick={() => onPageChange(pagination.page + 1)}
        >
          Следующая →
        </button>
      </div>
      <div className="per-page-select">
        <span className="per-page-label">На странице:</span>
        <div className="per-page-buttons">
          {[10, 25, 50].map((num) => (
            <button
              key={num}
              className={`per-page-option ${perPage === num ? "active" : ""}`}
              onClick={() => onPerPageChange(num)}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
