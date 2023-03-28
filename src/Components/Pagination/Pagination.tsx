import React, { FC } from "react";
import ReactPaginate from "react-paginate";
import styles from "@/styles/Pagination.module.css";

type Props = {
  pages: number;
  onPageChange: (selected: number) => void;
  totalItems: number;
  itemsPerPage: number;
  initialPage?: number;
};

export const Pagination: FC<Props> = ({
  pages,
  onPageChange,
  totalItems,
  itemsPerPage,
  initialPage = 0,
}) => {
  return totalItems > itemsPerPage ? (
    <ReactPaginate
      breakLabel="..."
      className={styles.pagination}
      nextLabel="Siguiente"
      forcePage={initialPage}
      previousLabel="Anterior"
      activeClassName={styles.active_page}
      onPageChange={({ selected }) => onPageChange(selected)}
      pageRangeDisplayed={5}
      pageCount={pages}
      renderOnZeroPageCount={() => null}
    />
  ) : (
    <></>
  );
};
