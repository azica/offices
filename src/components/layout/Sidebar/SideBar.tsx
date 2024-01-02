import cn from "classnames";
import { useState, type FC, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import styles from "./SideBar.module.scss";

export const SideBar: FC<Model.SidebarMenu> = ({ menu, children, scrollbar, isTabs }) => {
  const { pathname, search } = useLocation();
  const [fullPath, setFullPath] = useState(pathname + search);
  const { listItem, wrapper, list, active, scroll } = styles;

  useEffect(() => {
    setFullPath(pathname + search);
  }, [pathname, search]);

  return (
    <aside className={cn(wrapper, { [scroll]: scrollbar })}>
      <ul className={list}>
        {menu.map(({ id, path, title, count }, index) => {
          const isActive = fullPath === path || pathname === path || (!search && index === 0 && isTabs);
          return (
            <li key={id}>
              <Link to={path} className={cn(listItem, { [active]: isActive })}>
                {title}
                {count !== undefined && count >= 0 ? <span>{count}</span> : ""}
              </Link>
            </li>
          );
        })}
      </ul>
      {children}
    </aside>
  );
};

export default SideBar;
