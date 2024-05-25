import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import BoxCard from "components/Card";
import { getAllContents } from "services/contentService";
import Header from "components/header";
import Footer from "components/Footer";
import { Link, useNavigate } from "react-router-dom";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import Box from "@mui/material/Box";
import data from "../../assets/contentSerach.json";
import SearchBox from "components/search";
import * as frameworkService from "../../services/frameworkService";
import Container from "@mui/material/Container";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import DomainCarousel from "components/domainCarousel";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import domainWithImage from "../../assets/domainImgForm.json";
import { t } from "i18next";
import Alert from "@mui/material/Alert";
import appConfig from "../../configs/appConfig.json";
const urlConfig = require("../../configs/urlConfig.json");
import ToasterCommon from "../ToasterCommon";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 8,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const responsiveCard = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 8,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const AllContent = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [domain, setDomain] = useState();
  const [selectedDomain, setSelectedDomain] = useState();

  const [channelData, setChannelData] = React.useState(true);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [itemsArray, setItemsArray] = useState([]);
  const navigate = useNavigate();
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 767);
  };
  const handleSearch = (query) => {
    // Implement your search logic here

    console.log("Search query:", query);
  };
  const handleDomainFilter = (query) => {
    // Implement your search logic here
    setSelectedDomain(query);
    console.log("Search query:", selectedDomain);
    // fetchData();
  };
  useEffect(() => {
    fetchData();
    fetchDomains();
  }, []);
  useEffect(() => {
    fetchData();
  }, [selectedDomain]);

  const showErrorMessage = (msg) => {
    setToasterMessage(msg);
    setTimeout(() => {
      setToasterMessage("");
    }, 2000);
    setToasterOpen(true);
  };

  const fetchData = async () => {
    setError(null);
    let data = JSON.stringify({
      request: {
        filters: {
          se_boards: [selectedDomain],
          primaryCategory: [
            "Collection",
            "Resource",
            "Content Playlist",
            "Course",
            "Course Assessment",
            "Digital Textbook",
            "eTextbook",
            "Explanation Content",
            "Learning Resource",
            "Lesson Plan Unit",
            "Practice Question Set",
            "Teacher Resource",
            "Textbook Unit",
            "LessonPlan",
            "FocusSpot",
            "Learning Outcome Definition",
            "Curiosity Questions",
            "MarkingSchemeRubric",
            "ExplanationResource",
            "ExperientialResource",
            "Practice Resource",
            "TVLesson",
            "Course Unit",
            "Exam Question",
          ],
          visibility: ["Default", "Parent"],
        },
        limit: 100,
        sort_by: { lastPublishedOn: "desc" },
        fields: [
          "name",
          "appIcon",
          "mimeType",
          "gradeLevel",
          "identifier",
          "medium",
          "pkgVersion",
          "board",
          "subject",
          "resourceType",
          "primaryCategory",
          "contentType",
          "channel",
          "organisation",
          "trackable",
          "primaryCategory",
        ],
        facets: [
          "se_boards",
          "se_gradeLevels",
          "se_subjects",
          "se_mediums",
          "primaryCategory",
        ],
        offset: 0,
      },
    });

    const headers = {
      "Content-Type": "application/json",
    };
    // console.log(data.result.content)

    try {
      const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.CONTENT.SEARCH}?orgdetails=${appConfig.ContentPlayer.contentApiQueryParams.orgdetails}&licenseDetails=${appConfig.ContentPlayer.contentApiQueryParams.licenseDetails}`;

      const response = await getAllContents(url, data, headers);
      const sortedData = response?.data?.result?.content?.sort((a, b) => {
        // Sort "Course" items first, then by primaryCategory
        if (a.primaryCategory === "Course" && b.primaryCategory !== "Course") {
          return -1; // "Course" comes before other categories
        } else if (
          a.primaryCategory !== "Course" &&
          b.primaryCategory === "Course"
        ) {
          return 1; // Other categories come after "Course"
        } else {
          return a.primaryCategory.localeCompare(b.primaryCategory);
        }
      });
      setData(sortedData);
    } catch (error) {
      showErrorMessage(t("FAILED_TO_FETCH_DATA"));
    }
  };
  const getCookieValue = (name) => {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return "";
  };

  const fetchDomains = async () => {
    setError(null);
    const rootOrgId = sessionStorage.getItem("rootOrgId");
    const defaultFramework = localStorage.getItem("defaultFramework");
    // Headers
    const headers = {
      "Content-Type": "application/json",
      Cookie: `connect.sid=${getCookieValue("connect.sid")}`,
    };
    try {
      const url = `${urlConfig.URLS.PUBLIC_PREFIX}${urlConfig.URLS.CHANNEL.READ}/${rootOrgId}`;
      const response = await frameworkService.getChannel(url, headers);
      // console.log("channel---",response.data.result);
      setChannelData(response.data.result);
    } catch (error) {
      console.log("error---", error);
      showErrorMessage(t("FAILED_TO_FETCH_DATA"));
    } finally {
    }
    try {
      const url = `${urlConfig.URLS.PUBLIC_PREFIX}${urlConfig.URLS.FRAMEWORK.READ}/${defaultFramework}?categories=${urlConfig.params.framework}`;

      const response = await frameworkService.getSelectedFrameworkCategories(
        url,
        headers
      );

      response.data.result.framework.categories[0].terms?.map((term) => {
        if (domainWithImage) {
          domainWithImage.result.form.data.fields.map((imgItem) => {
            if ((term && term.code) === (imgItem && imgItem.code)) {
              term["image"] = imgItem.image ? imgItem.image : "";
              pushData(term);
              itemsArray.push(term);
            }
          });
        }
      });
      setDomain(response.data.result.framework.categories[0].terms);
    } catch (error) {
      console.log("nulp--  error-", error);
      showErrorMessage(t("FAILED_TO_FETCH_DATA"));
    } finally {
      console.log("nulp finally---");
    }
  };
  // Function to push data to the array
  const pushData = (term) => {
    setItemsArray((prevData) => [...prevData, term]);
  };

  const renderItems = (items, category) => {
    return items.map((item) => (
      <Grid
        item
        xs={isMobile ? 12 : 12}
        md={isMobile ? 12 : 6}
        lg={isMobile ? 12 : 2}
        key={item.id}
        style={{ marginBottom: "10px" }}
      >
        <BoxCard
          items={item}
          onClick={() => handleCardClick(item.identifier, item.primaryCategory)}
        ></BoxCard>
      </Grid>
    ));
  };

  const handleCardClick = (contentId, courseType) => {
    if (courseType === "Course") {
      navigate("/joinCourse", { state: { contentId } });
    } else {
      navigate("/player");
    }
  };

  return (
    <>
      <Header />
      {toasterMessage && <ToasterCommon response={toasterMessage} />}
      {/* <Box sx={{ background: "#2D2D2D", padding: "20px" }} className="xs-hide">
        <p
          style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "#fff",
            paddingBottom: "5px",
            margin: "0",
          }}
        >
          {t("EXPLORE_CONTENT_RELATED_TO_YOUR_DOMAIN")}
        </p>
        <p
          style={{
            fontSize: "16px",
            fontWeight: "700",
            color: "#C1C1C1",
            margin: "0",
            paddingBottom: "30px",
          }}
        >
          {t("LEARN_FROM_WELL_CURATED")}
        </p>
        <SearchBox onSearch={handleSearch} />
      </Box>  */}
      {/* <Box sx={{ fontWeight: "600", fontSize: "16px", padding: "10px" }}>
        {t("FILTER_BY_POPULAR_DOMAIN")}
      </Box> */}
      {domain && (
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          <DomainCarousel
            onSelectDomain={handleDomainFilter}
            domains={domain}
          />
        </Carousel>
      )}

      <Container maxWidth="xl" role="main" className="pb-30 allContent">
        {/* <Box className="text-heading lg-d-flex my-20">
          You are viewing content for :
          <Box className="text-primary">Mobility and accessibliy</Box>
        </Box> */}
        {error && (
          <Alert severity="error" className="my-10">
            {error}
          </Alert>
        )}
        {data &&
          Object?.entries(
            data?.reduce((acc, item) => {
              if (!acc[item.primaryCategory]) {
                acc[item.primaryCategory] = [];
              }
              acc[item.primaryCategory].push(item);
              return acc;
            }, {})
          ).map(([category, items]) => (
            // console.log(data,"hi"),

            <React.Fragment key={category}>
              <Box
                className="d-flex mr-20"
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  style={{
                    display: "inline-block",
                    margin: "33px 0px 20px",
                  }}
                  className="h4-title "
                >
                  <SummarizeOutlinedIcon style={{ verticalAlign: "top" }} />{" "}
                  <Box
                    style={{
                      display: "inline-block",
                    }}
                    className="h3-title"
                  >
                    {category}{" "}
                  </Box>{" "}
                </Box>
                <Box>
                  {items?.length > 4 && (
                    <Link to={`/view-all/${category}`} className="viewAll">
                      {t("VIEW_ALL")}
                    </Link>
                  )}
                </Box>
              </Box>
              {isMobile ? (
                <Carousel
                  swipeable={false}
                  draggable={false}
                  showDots={true}
                  responsive={responsiveCard}
                  ssr={true}
                  infinite={true}
                  autoPlaySpeed={1000}
                  keyBoardControl={true}
                  customTransition="all .5"
                  transitionDuration={500}
                  containerClass="carousel-container"
                  removeArrowOnDeviceType={["tablet", "mobile"]}
                  dotListClass="custom-dot-list-style"
                  itemClass="carousel-item-padding-40-px"
                >
                  {expandedCategory === category
                    ? items.map((item) => (
                        <Grid item xs={6} md={6} lg={2} key={item.id}>
                          <BoxCard
                            items={item}
                            onClick={() =>
                              handleCardClick(
                                item.identifier,
                                item.primaryCategory
                              )
                            }
                          ></BoxCard>
                        </Grid>
                      ))
                    : items.slice(0, 4).map((item) => (
                        <Grid item xs={6} md={6} lg={2} key={item.id}>
                          <BoxCard
                            items={item}
                            onClick={() =>
                              handleCardClick(
                                item.identifier,
                                item.primaryCategory
                              )
                            }
                          ></BoxCard>
                        </Grid>
                      ))}
                </Carousel>
              ) : (
                <Grid container spacing={2}>
                  {expandedCategory === category
                    ? renderItems(items, category)
                    : renderItems(items.slice(0, 5), category)}
                </Grid>
              )}
            </React.Fragment>
          ))}
      </Container>
      <FloatingChatIcon />
      <Footer />
    </>
  );
};

export default AllContent;
