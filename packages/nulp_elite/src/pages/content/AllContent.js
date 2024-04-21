import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import BoxCard from "components/Card";
import { getAllContents } from "services/contentService";
import Header from "components/header";
import Footer from "components/Footer";
import { Link } from "react-router-dom";
import URLSConfig from "../../configs/urlConfig.json";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import Box from "@mui/material/Box";
import data from "../../assets/contentSerach.json";
import SearchBox from "components/search";
import { frameworkService } from "@shiksha/common-lib";
import Container from "@mui/material/Container";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import DomainCarousel from "components/domainCarousel";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import domainWithImage from "../../assets/domainImgForm.json";

const responsive = {
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
    items: 1,
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
    fetchData();
  };
  useEffect(() => {
    fetchData();
    fetchDomains();
  }, []);

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

    const url = `http://localhost:3000/api/${URLSConfig.URLS.CONTENT.SEARCH}?orgdetails=orgName,email&licenseDetails=name,description,url`;
    try {
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
      setError(error.message);
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
    // Headers
    const headers = {
      "Content-Type": "application/json",
      Cookie: `connect.sid=${getCookieValue("connect.sid")}`,
    };
    try {
      const url = `http://localhost:3000/api/channel/v1/read/0130701891041689600`;
      const response = await frameworkService.getChannel(url, headers);
      // console.log("channel---",response.data.result);
      setChannelData(response.data.result);
    } catch (error) {
      console.log("error---", error);
      setError(error.message);
    } finally {

    }
    try {
      const url = `http://localhost:3000/api/framework/v1/read/nulp?categories=board,gradeLevel,medium,class,subject`;
      const response = await frameworkService.getSelectedFrameworkCategories(
        url,
        headers
      );

     
      response.data.result.framework.categories[0].terms.map((term) => {

        if (domainWithImage) {
          domainWithImage.result.form.data.fields.map((imgItem) => {
            if ((term && term.code) === (imgItem && imgItem.code)) {
              term["image"] = imgItem.image ? imgItem.image : "";
              pushData(term)
              itemsArray.push(term);
            }
          });
        }
      });
      setDomain(response.data.result.framework.categories[0].terms);
    } catch (error) {
      console.log("nulp--  error-", error);
      setError(error.message);
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
        lg={isMobile ? 12 : 3}
        key={item.id}
        style={{ marginBottom: "10px" }}
      >
        <BoxCard items={item}></BoxCard>
      </Grid>
    ));
  };

  return (
    <>
      <Header />
      <Box sx={{ background: "#2D2D2D", padding: "20px" }} className="xs-hide">
        <p
          style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "#fff",
            paddingBottom: "5px",
            margin: "0",
          }}
        >
          Explore content related to your domain.Learn from well curated courses
          and content.
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
          Learn from well curated courses and content.
        </p>
        <SearchBox onSearch={handleSearch} />
      </Box>
      <Box sx={{fontWeight:'600',fontSize:'16px',padding:'10px'}}>Filter by popular domain:</Box>
      {domain &&  <DomainCarousel onSelectDomain={handleDomainFilter}  domains={domain}/>}
     
      <Container maxWidth="xxl" role="main" className="container-pb">
        { data && Object?.entries(
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
            <p style={{ display: "flex", justifyContent: "space-between" }}>
              <Box
                style={{
                  display: "inline-block",
                  fontSize: "14px",
                  color: "#1E1E1E",
                }}
              >
                <SummarizeOutlinedIcon style={{ verticalAlign: "top" }} />{" "}
                <Box
                  style={{
                    borderBottom: "solid 2px #000",
                    display: "inline-block",
                  }}
                >
                  {category}{" "}
                </Box>{" "}
              </Box>
              {items?.length > 4 && (
                <Link
                  to={`/view-all/${category}`}
                  style={{
                    color: "#424242",
                    fontSize: "12px",
                    textAlign: "right",
                    fontWeight: "600",
                  }}
                >
                  View All
                </Link>
              )}
            </p>
            {isMobile ? (
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
                {expandedCategory === category
                  ? items.map((item) => (
                      <Grid item xs={12} md={6} lg={3} key={item.id}>
                        <BoxCard items={item}></BoxCard>
                      </Grid>
                    ))
                  : items.slice(0, 4).map((item) => (
                      <Grid item xs={12} md={6} lg={3} key={item.id}>
                        <BoxCard items={item}></BoxCard>
                      </Grid>
                    ))}
              </Carousel>
            ) : (
              <Grid container spacing={2}>
                {expandedCategory === category
                  ? renderItems(items, category)
                  : renderItems(items.slice(0, 4), category)}
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
