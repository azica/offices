import cn from "classnames";
import React from "react";
import { Link, useLocation } from "react-router-dom";

import { ArrowLeftIcon, ArrowRightIcon } from "@/assets/icons";

import styles from "./Pagination.module.scss";

const Pagination: React.FC<Model.Pagination> = ({ currentPage, totalPages }) => {
  const { pathname, search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const scrollTo = () => {
    window.scrollTo({ top: 150, behavior: "smooth" });
  };

  const getPageLink = (page: number) => {
    queryParams.set("page", page.toString());
    return `${pathname}?${queryParams.toString()}`;
  };

  const renderPageLink = (page: number) => (
    <li key={page} className={cn(styles.item, page === currentPage && styles.active)}>
      <Link to={getPageLink(Number(page))} onClick={scrollTo}>
        {page}
      </Link>
    </li>
  );

  const renderNavigationItem = (key: string, content: React.ReactNode, page: number) => (
    <li key={key} className={styles.item}>
      {page ? (
        <Link to={getPageLink(page)} onClick={scrollTo}>
          {content}
        </Link>
      ) : (
        content
      )}
    </li>
  );

  const renderPaginationLinks = () => {
    const maxVisiblePages = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    const links = [renderNavigationItem("prev", <ArrowLeftIcon />, currentPage > 1 ? currentPage - 1 : 0)];

    for (let page = startPage; page <= endPage; page++) {
      links.push(renderPageLink(page));
    }
    if (totalPages > 10) {
      links.push(renderNavigationItem("dots", "...", 0));
      links.push(renderPageLink(totalPages));
    }

    links.push(renderNavigationItem("next", <ArrowRightIcon />, currentPage < totalPages ? currentPage + 1 : 0));

    return links;
  };

  return (
    <nav className={styles.pagination}>
      <ul className={styles.list}>{renderPaginationLinks()}</ul>
    </nav>
  );
};

export default Pagination;
