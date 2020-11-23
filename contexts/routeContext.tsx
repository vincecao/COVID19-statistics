/* eslint-disable react/prop-types */
import React, { useState, createContext, useEffect } from 'react';

export const RouteContext = createContext(null);

interface RouteContextProps {
  route: string;
}

const RouteContextProvider: React.FC<RouteContextProps> = ({ children, route }) => {
  const [pathname, setPathname] = useState('/');

  useEffect(() => {
    if (route) setPathname(route);
  }, [route]);

  return <RouteContext.Provider value={{ pathname }}>{children}</RouteContext.Provider>;
};

export default RouteContextProvider;
