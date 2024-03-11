import React from "react";
import "./App.css";
import Sample from "pages/Sample";
import Home from "pages/Home";
import Courses from "pages/Courses";
import Contents from "pages/Contents";
import Framework from "pages/Frmework";
import User from "pages/User";
import { extendTheme, NativeBaseProvider } from "native-base";
// import dotenv from "dotenv";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registration from "pages/Registration";
import CardComponent from "./components/CardComponent";

// import { DEFAULT_THEME, initializeI18n } from "@shiksha/common-lib";
// dotenv.config();
function App() {
  // const theme = extendTheme(DEFAULT_THEME);

  const routes = [
    {
      moduleName: "nulp_elite",
      path: "/home",
      component: Home,
    },
    {
      moduleName: "nulp_elite",
      path: "/Contents",
      component: Contents,
    },
    {
      moduleName: "nulp_elite",
      path: "/Courses",
      component: Courses,
    },
    {
      moduleName: "nulp_elite",
      path: "/Framework",
      component: Framework,
    },
    {
      moduleName: "nulp_elite",
      path: "/User",
      component: User,
    },
    {
      moduleName: "nulp_elite",
      path: "/registration",
      component: Registration,
    },
    {
      moduleName: "nulp_elite",
      path: "/card",
      component: CardComponent,
    },
  ];
  // const LoginComponent = React.lazy(() => import("core/Login"));

  return (
    <NativeBaseProvider>
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
      </Router>
    </NativeBaseProvider>
  );
}

export default App;
