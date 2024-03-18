// Courses.js
import React from "react";
import {
  Box,
  VStack,
  Text,
  HStack,
  Button,
  Image,
  Heading,
  useDisclose,
  Menu,
} from "native-base";
import { Layout, IconByName, SearchLayout } from "@shiksha/common-lib";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const [search, setSearch] = React.useState(true);
  const [searchState, setSearchState] = React.useState(false);
  // const theme = extendTheme(DEFAULT_THEME);
  const colors = "";
  const [sortArray, setSortArray] = React.useState([]);
  const [showModalSort, setShowModalSort] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclose();
  const navigate = useNavigate();

  const redirectTo = async (path) => {
    // Perform logout logic here if path is logout
    window.location.href = path;
  };
  return (
    <Layout
      isDisabledAppBar={true}
      _header={{
        rightIcon: (
          <HStack paddingBottom={"25px"}>
            <IconByName name="CloseCircleFillIcon" />
          </HStack>
        ),
        customeComponent: (
          <Box flex={1} minH={"40px"}>
            <HStack>
              <VStack position={"relative"} padding="10px" top={"10px"}>
                <Menu
                  w="160"
                  trigger={(triggerProps) => {
                    return (
                      <Button
                        alignSelf="center"
                        variant="solid"
                        {...triggerProps}
                      >
                        <IconByName size="20px" name="MenuFillIcon" />
                      </Button>
                    );
                  }}
                >
                  <Menu.Item onPress={(item) => redirectTo("/help")}>
                    Help
                  </Menu.Item>
                  <Menu.Item onPress={(item) => redirectTo("/logoff")}>
                    Logout
                  </Menu.Item>
                </Menu>
              </VStack>
              <VStack>
                <Image
                  source={require("../assets/nulp_logo.jpeg")}
                  alt=""
                  size="sm"
                />
              </VStack>
            </HStack>

            <Box position={"absolute"} right={"20px"} top={"10px"}>
              <Menu
                w="160"
                trigger={(triggerProps) => {
                  return (
                    <Button
                      alignSelf="center"
                      variant="solid"
                      {...triggerProps}
                    >
                      Language
                    </Button>
                  );
                }}
              >
                <Menu.Item>English</Menu.Item>
                <Menu.Item> Hindi</Menu.Item>
              </Menu>
            </Box>
          </Box>
        ),
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
    </Layout>
  );
};

export default Courses;
