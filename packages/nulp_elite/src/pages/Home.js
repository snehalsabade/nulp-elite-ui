// Home.js
import React from "react";
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
  Heading,
} from "native-base";
import {
  Layout,
  IconByName,
  SearchLayout,
  FilterButton,
  overrideColorTheme,
} from "@shiksha/common-lib";
import { Link, useParams } from "react-router-dom";

const Home = () => {
  const [search, setSearch] = React.useState(true);
  const [searchState, setSearchState] = React.useState(false);
  // const theme = extendTheme(DEFAULT_THEME);
  const colors = "";
  const [sortArray, setSortArray] = React.useState([]);

  return (
    <Layout
      isDisabledAppBar={true}
      _header={{
        iconComponent: (
          <Link
            to="/Courses"
            style={{ color: "rgb(63, 63, 70)", textDecoration: "none" }}
          >
            <IconByName size="20px" name="Notification2LineIcon" />
          </Link>
        ),
        title: "User Name",
        // isEnableSearchBtn: true,
        subHeading: "Hello",
      }}
      subHeader={
        <Link
          to="/"
          style={{ color: "rgb(63, 63, 70)", textDecoration: "none" }}
        >
          <HStack space="4" justifyContent="space-between">
            <VStack>
              <SearchLayout
                {...{
                  search,
                  setSearch,
                  // minStringLenght: 3,
                  notFoundMessage: "TYPE_TO_START_SEARCHING_LEARNING",
                  onCloseSearch: setSearchState,
                }}
              ></SearchLayout>
            </VStack>
          </HStack>
        </Link>
      }
      _subHeader={{ bg: "rgb(248, 117, 88)" }}
      _footer={{
        menues: [
          {
            title: "Search",
            icon: "SearchLineIcon",
            route: "/contents",
          },
          {
            title: "Contents",
            icon: "BookOpenLineIcon",
            route: "/all",
          },
          {
            title: "Connections",
            icon: "TeamLineIcon",
            route: "/home",
          },
          {
            title: "Profie",
            icon: "AccountCircleLineIcon",
            route: "/profile",
          },
        ],
      }}
    >
      <Box textAlign="center" padding="10">
        <Heading as="h1" size="2xl" marginBottom="4">
          Welcome to Our Learning Portal
        </Heading>

        <Text fontSize="xl" marginBottom="8">
          Enhance your knowledge and skills with our diverse range of courses
          and content.
        </Text>
        <Button colorScheme="blue" size="lg">
          Explore Courses
        </Button>
      </Box>

      {/* <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/Contents" element={<Contents />} />
       <Route path="/Courses" element={<Courses />} />
       <Route path="/Sample" element={<Sample />} />
 </Routes>     */}
    </Layout>
  );
};

export default Home;
