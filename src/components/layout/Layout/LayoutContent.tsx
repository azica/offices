import { useState, useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";

import { basicPaths } from "../../../shared/routes";

const LayoutContent = () => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("fadeIn");
  const lastItem = location.pathname.split("/").at(-1);

  useEffect(() => {
    if (
      location.pathname === displayLocation.pathname ||
      (displayLocation.pathname.includes("/auth") && !location.pathname.includes("/create-office")) ||
      lastItem === "applications" ||
      lastItem === "employees" ||
      lastItem === "clients"
    ) {
      setDisplayLocation(location);
    } else {
      setTransistionStage("fadeOut");
    }
  }, [location, displayLocation]);

  return (
    <div
      className={transitionStage}
      onAnimationEnd={() => {
        if (transitionStage === "fadeOut") {
          setTransistionStage("fadeIn");
          setDisplayLocation(location);
        }
      }}>
      <Routes location={displayLocation}>
        {basicPaths.map(({ id, path, element, children }) => {
          return children ? (
            <Route key={id} path={path} element={element}>
              <Route index element={children[0].element} />
              {children.map((child) => (
                <Route key={child.id} path={child.path} element={child.element} />
              ))}
            </Route>
          ) : (
            <Route key={id} path={path} element={element} />
          );
        })}
      </Routes>
    </div>
  );
};

export default LayoutContent;
