import React from "react";
import { Box, Stack, VStack, HStack, Avatar, Center } from "native-base";
import {
  capture,
  Layout,
  NameTag,
  Heading,
  useWindowSize,
  IconByName,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import { useParams, useLocation } from "react-router-dom";
import manifest from "../manifest.json";

function CommingSoon({ footerLinks }) {
  const [width, Height] = useWindowSize();
  const params = useParams();
  let location = useLocation();
  const { t } = useTranslation();
  const Title =
    params["title"] == "ScoreCard"
      ? "Score Card"
      : location.pathname.split("/")[1];

  React.useEffect(() => {
    capture("PAGE");
  }, []);

  return (
    <Layout
      _header={{
        title: t("SETTING"),
      }}
      _appBar={{
        languages: manifest.languages,
        isLanguageIcon: true,
        isShowNotificationButton: false,
        titleComponent: <NameTag />,
        LeftIcon: (
          <HStack>
            <img
            width={"100px"}
            src={require("../../src/assets/TSHeader.png")}
            />
          </HStack>
        ),
      }}
      _footer={footerLinks}
    >
      <Box>
        <Center width={width}>
          <VStack space="">
            <Box>
              <Heading>{t("COMING_SOON")}</Heading>
            </Box>
            <VStack space={2} pt={"25px"} pb={"25px"}>
              <Center>
                <div
                  style={{
                    padding: "35px",
                    border: "2px dashed #6461D2",
                    borderRadius: "100px",
                  }}
                >
                  <IconByName
                    name="ToolsFillIcon"
                    isDisabled={true}
                    _icon={{
                      size: 70,
                    }}
                    rounded="full"
                  />
                </div>
              </Center>
            </VStack>
            <VStack>
              <Center>
                <HStack space={"2"}></HStack>
              </Center>
            </VStack>
          </VStack>
        </Center>
      </Box>
    </Layout>
  );
}
export default CommingSoon;
