import { Pagination } from "react-bootstrap"
import type { PaginazioneProps } from "@/utils/types"

//Passando allPages sto passando direttamente totalPages (non passare totalItems)
//Passando totalItems sto passando il numero totale di elementi che viene convertito in totalPages (non passare allPages)
const PaginazioneCustom = ({
    totalItems,
    currentPage,
    onPageChange,
    allPages
}: PaginazioneProps) => {
    const itemsPerPage = 5
    const totalPages = allPages
        ? allPages
        : Math.ceil(totalItems ?? 1 / itemsPerPage)
    const maxVisiblePages = 7

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber == currentPage) {
            return
        }
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            onPageChange(pageNumber)
        }
    }

    const paginationItems: any = []

    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    for (let number = startPage; number <= endPage; number++) {
        paginationItems.push(
            <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => handlePageChange(number)}
            >
                {number}
            </Pagination.Item>
        )
    }

    if (startPage > 1) {
        paginationItems.unshift(
            <Pagination.Ellipsis key="start-ellipsis" disabled />
        )
        paginationItems.unshift(
            <Pagination.Item
                key={1}
                active={currentPage === 1}
                onClick={() => handlePageChange(1)}
            >
                1
            </Pagination.Item>
        )
    }

    if (endPage < totalPages) {
        paginationItems.push(
            <Pagination.Ellipsis key="end-ellipsis" disabled />
        )
        paginationItems.push(
            <Pagination.Item
                key={totalPages}
                active={currentPage === totalPages}
                onClick={() => handlePageChange(totalPages)}
            >
                {totalPages}
            </Pagination.Item>
        )
    }

    return (
        <div className="paginazione-custom">
            <Pagination className="justify-content-center pb-3">
                <Pagination.First
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                />
                <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                />
                {paginationItems}
                <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                />
                <Pagination.Last
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                />
            </Pagination>
        </div>
    )
}

export default PaginazioneCustom
