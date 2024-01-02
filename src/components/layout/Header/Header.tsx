import cn from "classnames";
import { memo, useEffect, useState } from "react";
import { useLocation, useNavigate, Link, useParams } from "react-router-dom";

import { BellIcon, ExitIcon, LogoIcon } from "@/assets/icons";
import { Profile } from "@/blocks/index";
import { getDecodedOfficeId, clearLocalStorage, getTokensFromStorage } from "@/helpers/index";
import { useActions, useAppSelector, useUser, useUserIsSystemAdmin } from "@/store/hooks";

import styles from "./Header.module.scss";
import { menu, menu2 } from "./mockData";

export const Header = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation();
  const [currentMenu, setCurretMenu] = useState<Model.MenuItem[]>([]);
  const token = getTokensFromStorage();

  const { setUser } = useActions();
  const user = useUser();
  const isSystemAdmin = useUserIsSystemAdmin();
  const { hasNewStatus } = useAppSelector((state) => state.office);

  useEffect(() => {
    isSystemAdmin && setCurretMenu(menu);

    if (token) {
      const officeId = getDecodedOfficeId(String(token.access));
      if (officeId) {
        const updatedMenu = menu2.map((menu) => ({
          ...menu,
          path: `${menu.path}/${officeId || id}`,
        }));
        setCurretMenu(updatedMenu);
      }
    }
  }, [setCurretMenu, id, isSystemAdmin]);

  const logoutHandle = () => {
    setUser(null);
    clearLocalStorage();
    navigate("/auth");
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.headerContainer} container`}>
        <Link to={currentMenu.length > 0 ? currentMenu[0].path : menu[0].path} className={styles.logo}>
          <LogoIcon />
        </Link>
        <div className={styles.buttons}>
          {currentMenu.map(({ path, title, id }) => {
            return (
              <Link
                key={id}
                className={cn(styles.button, {
                  [styles.notific]: title === "Конторы" && hasNewStatus,
                  [styles.active]: pathname.split("/").includes(path) || pathname.startsWith(`/${path}`),
                })}
                to={path}>
                {title}
              </Link>
            );
          })}
        </div>
        <div className={styles.leftSide}>
          <div className={styles.icon}>
            <BellIcon />
          </div>
          {user && <Profile fullName={user.fullName} role={user?.role as Model.Role[]} img={user?.image} />}
          <div className={styles.icon} onClick={logoutHandle}>
            <ExitIcon className={styles.exit} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
