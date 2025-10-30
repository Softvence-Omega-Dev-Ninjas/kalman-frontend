
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationControlsProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function PaginationControls({
  page,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = []

    // pagination 
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages)
      } else if (page >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages)
      }
    }

    return pages
  }

  const pages = getPageNumbers()

  return (
    <div className="flex justify-center mt-10">
      <Pagination>
        <PaginationContent className="gap-1">
          {/* Previous Button */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => onPageChange(Math.max(1, page - 1))}
              className={`rounded-md !p-2 text-sm transition cursor-pointer bg-primary !text-white !opacity-90 ${
                page === 1 ? "pointer-events-none opacity-50" : "hover:bg-muted"
              }`}
            />
          </PaginationItem>

          {/* Page Numbers */}
          {pages.map((p, idx) =>
            p === "..." ? (
              <PaginationItem key={`ellipsis-${idx}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={p}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    onPageChange(p as number)
                  }}
                  isActive={p === page}
                  className={`w-9 h-9 flex items-center  justify-center rounded-md text-sm font-medium transition ${
                    p === page
                      ? "bg-primary text-white shadow-sm"
                      : "hover:bg-muted  hover:text-primary"
                  }`}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          {/* Next Button */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => onPageChange(Math.min(totalPages, page + 1))}
              className={`rounded-md  !p-2 text-sm transition cursor-pointer bg-primary !text-white !opacity-90 ${
                page === totalPages
                  ? "pointer-events-none opacity-50"
                  : "hover:bg-muted"
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
