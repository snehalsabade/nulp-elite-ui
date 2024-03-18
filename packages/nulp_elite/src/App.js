import React from "react";
import "./App.css";
import Sample from "pages/Sample";
import Home from "pages/Home";
import Courses from "pages/Courses";
import Coursetest from "pages/CourseTest";

import Contents from "pages/Contents";
import {
  NativeBaseProvider,
  Box,
  Stack,
  VStack,
  Text,
  HStack,
  Button,
  extendTheme,
  Actionsheet,
  ScrollView,
} from "native-base";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DEFAULT_THEME, initializeI18n, H2 } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import Framework from "pages/Frmework";
import User from "pages/User";
import Registration from "pages/Registration";
import UserPrefData from "pages/UserPrefData";
import { ChakraProvider } from "@chakra-ui/react";
import Profile from "pages/Profile";
import SendOtp from "pages/SendOtp";

function App() {
  const [search, setSearch] = React.useState(true);
  const [searchState, setSearchState] = React.useState(false);
  // const theme = extendTheme(DEFAULT_THEME);
  const colors = "";
  const [sortArray, setSortArray] = React.useState([]);

  const routes = [
    {
      moduleName: "nulp_elite",
      path: "/home",
      component: Home,
    },
    {
      moduleName: "nulp_elite",
      path: "/contents",
      component: Contents,
    },
    {
      moduleName: "nulp_elite",
      path: "/all",
      component: Courses,
    },
    {
      moduleName: "nulp_elite",
      path: "/sample",
      component: Sample,
    },
    {
      moduleName: "nulp_elite",
      path: "/profile",
      component: Profile,
    },
    {
      moduleName: "nulp_elite",
      path: "/framework",
      component: Framework,
    },
    {
      moduleName: "nulp_elite",
      path: "/registration",
      component: Registration,
    },
    {
      moduleName: "nulp_elite",
      path: "/userPrefData",
      component: UserPrefData,
    },
    {
      moduleName: "nulp_elite",
      path: "/user",
      component: User,
    },
    {
      moduleName: "nulp_elite",
      path: "/coursetest",
      component: Coursetest,
    },
    {
      moduleName: "nulp_elite",
      path: "/otp",
      component: SendOtp,
    },
  ];

  // return(
  //   // <Box></Box>
  //   <NativeBaseProvider >
  //    <Router routes={routes}>

  //   </Router>
  //    </NativeBaseProvider>
  // // <NativeBaseProvider ><Router><Sample /></Router> </NativeBaseProvider>

  // );
  // <NativeBaseProvider > <Sample /></NativeBaseProvider>;

  // <AppShell routes={routes} AuthComponent={LoginComponent} />;
  return (
    <NativeBaseProvider>
      <ChakraProvider>
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
      </ChakraProvider>
    </NativeBaseProvider>
  );
}

export default App;
