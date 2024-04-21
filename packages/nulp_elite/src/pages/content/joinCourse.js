import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Footer from "components/Footer";
import Header from "components/header";
import Container from "@mui/material/Container";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Grid from "@mui/material/Grid";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";


import data from "../../assets/courseHierarchy.json";

const JoinCourse = () => {
  const { t } = useTranslation();
  const [userData, setUserData] = useState();
  const [batchData, setBatchdata] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  const { contentId } = location.state || {};

  // console.log(data.result.content.batches[0].endDate,"ekta")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://localhost:3000/api/course/v1/hierarchy/${contentId}?orgdetails=orgName,email&licenseDetails=name,description,url`;
        const header = "application/json";
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        const gradeLevel =
          data.result.content.children[0].children[0].gradeLevel;
        console.log(gradeLevel);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    const fetchBatchdata = async () => {
      try {
        const url = "http://localhost:3000/learner/course/v1/batch/list";
        const request = {
          request: {
            filters: {
              status: "1",
              courseId: contentId,
              enrollmentType: "open",
            },
            sort_by: {
              createdDate: "desc",
            },
          },
        };

        const response = await axios.post(url, request);
        const responseData = response.data;

        // Check if response contains content
        if (
          responseData.result.response &&
          responseData.result.response.content
        ) {
          const batchDetails = responseData.result.response.content[0];
          setBatchdata({
            startDate: batchDetails.startDate,
            endDate: batchDetails.endDate,
            enrollmentEndDate: batchDetails.enrollmentEndDate,
          });
        } else {
          console.error("Batch data not found in response");
        }
      } catch (error) {
        console.error("Error fetching batch data:", error);
      }
    };

    fetchData();
    fetchBatchdata();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const handleLinkClick = () => {
    navigate("/player"); // Navigate to "/player" page
  };

  return (
    <div>
      <Header />

      <Container maxWidth="xxl" role="main" className="container-pb">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} lg={4} sx={{ paddingRight: "20px" }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Breadcrumbs
                  aria-label="breadcrumb"
                  style={{
                    padding: "25px 0",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  <Link underline="hover" color="#004367" href="/">
                    {t("COURSES")}
                  </Link>
                  <Link
                    underline="hover"
                    href=""
                    aria-current="page"
                    color="#484848"
                  >
                    {userData?.result?.content?.name}
                  </Link>
                </Breadcrumbs>
              </Grid>
              <Grid item xs={4}>
                <Link
                  href="#"
                  style={{
                    textAlign: "right",
                    marginTop: "20px",
                    display: "block",
                  }}
                ></Link>
              </Grid>
            </Grid>

            <Box>
              <Typography
                variant="h7"
                style={{
                  margin: "0 0 9px 0",
                  display: "block",
                  fontSize: "11px",
                }}
              >
                {t("RELEVANT_FOR")}:
                <Button
                  size="small"
                  style={{
                    background: "#ffefc2",
                    color: "#484848",
                    fontSize: "10px",
                    margin: "0 10px",
                  }}
                >
                  {userData?.result?.content?.children[0]?.children[0]?.board}
                </Button>
                <Button
                  size="small"
                  style={{
                    background: "#ffefc2",
                    color: "#484848",
                    fontSize: "10px",
                  }}
                >
                  {" "}
                  {
                    userData?.result?.content?.children[0]?.children[0]
                      .gradeLevel?.[0]
                  }
                </Button>
              </Typography>
            </Box>
            <Box
              style={{
                background: "#fee9dd",
                padding: "10px",
                borderRadius: "10px",
                color: "#484848",
              }}
            >
              <Typography
                variant="h7"
                style={{
                  margin: "0 0 9px 0",
                  display: "block",
                  fontSize: "16px",
                }}
              >
                {t("BATCH_DETAILS")}:
              </Typography>
              <Box
                style={{
                  background: "#fff",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <Typography
                  variant="h7"
                  style={{
                    fontWeight: "500",
                    margin: "9px 0",
                    display: "block",
                    fontSize: "14px",
                  }}
                >
                  {t("BATCH_START_DATE")}: {formatDate(batchData?.startDate)}
                </Typography>
                <Typography
                  variant="h7"
                  style={{
                    fontWeight: "500",
                    margin: "9px 0",
                    display: "block",
                    fontSize: "14px",
                  }}
                >
                  {t("BATCH_END_DATE")}: {formatDate(batchData?.endDate)}
                </Typography>
                <Typography
                  variant="h7"
                  style={{
                    fontWeight: "500",
                    margin: "9px 0",
                    display: "block",
                    fontSize: "14px",
                  }}
                >
                  {t("LAST_DATE_FOR_ENROLLMENT")}:{" "}
                  {formatDate(batchData?.enrollmentEndDate)}
                </Typography>
              </Box>
            </Box>
            <Box pt={2} style={{ textAlign: "center" }}>
              <Button
                style={{
                  background: "#004367",
                  borderRadius: "10px",
                  color: "#fff",
                  padding: "10px 71px",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                {t("JOIN_COURSE")}
              </Button>
            </Box>
            <Box>
              <Typography
                variant="h7"
                style={{
                  fontWeight: "700",
                  margin: "9px 0",
                  display: "block",
                  fontSize: "14px",
                }}
              >
                {t("DESCRIPTION")}:
              </Typography>
              <Typography
                variant="h7"
                className="twoLineEllipsis"
                style={{
                  margin: "9px 0",
                  display: "block",
                  fontSize: "14px",
                }}
              >
                {userData?.result?.content?.description}
              </Typography>
            </Box>

            <Accordion
              defaultExpanded
              style={{
                background: "#fee9dd",
                borderRadius: "10px",
                marginTop: "10px",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                {t("COURSES_MODULE")}
              </AccordionSummary>
              <AccordionDetails>
                {userData?.result?.content?.children.map((faqIndex) => (
                  <Accordion
                    key={faqIndex.id}
                    style={{ borderRadius: "10px", margin: "10px 0" }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${faqIndex.id}-content`}
                      id={`panel${faqIndex.id}-header`}
                    >
                      {faqIndex.name}
                    </AccordionSummary>
                    {faqIndex.children.map((faqIndexname) => (
                      <AccordionDetails style={{paddingLeft:'35px'}}>
                        <SummarizeOutlinedIcon/> 

                        <Link
                          href="#"
                          key={faqIndexname.id}
                          onClick={handleLinkClick}
                        >
                          {faqIndexname.name}
                        </Link>
                      </AccordionDetails>
                    ))}
                  </Accordion>
                ))}
              </AccordionDetails>
            </Accordion>
            <Accordion
              style={{
                background: "#fee9dd",
                borderRadius: "10px",
                marginTop: "10px",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                {t("CERTIFICATION_CRITERIA")}
              </AccordionSummary>
              <AccordionDetails style={{ background: "#fff" }}>
                <ul>
                  <li>
                    The completion certificate will be issued upon 100%
                    completion
                  </li>
                  <li>
                    The certificate will be issued if you score greater than or
                    equal to 60% in your assessment
                  </li>
                </ul>
              </AccordionDetails>
            </Accordion>
            <Accordion
              style={{
                background: "#fee9dd",
                borderRadius: "10px",
                marginTop: "10px",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                {t("OTHER_DETAILS")}
              </AccordionSummary>
              <AccordionDetails style={{ background: "#fff" }}>
                <Typography
                  variant="h7"
                  style={{
                    fontWeight: "500",
                    margin: "9px 0",
                    display: "block",
                    fontSize: "14px",
                  }}
                >
                  {t("CREATED_ON")}:{" "}
                  {userData &&
                    userData.result &&
                    formatDate(userData.result.content.children[0].createdOn)}
                </Typography>
                <Typography
                  variant="h7"
                  style={{
                    fontWeight: "500",
                    margin: "9px 0",
                    display: "block",
                    fontSize: "14px",
                  }}
                >
                  {t("UPDATED_ON")}:{" "}
                  {userData &&
                    userData.result &&
                    formatDate(
                      userData.result.content.children[0].lastUpdatedOn
                    )}
                </Typography>
                <Typography
                  variant="h7"
                  style={{
                    fontWeight: "500",
                    margin: "9px 0",
                    display: "block",
                    fontSize: "14px",
                  }}
                >
                  {t("CREDITS")}:
                </Typography>
                <Typography
                  variant="h7"
                  style={{
                    fontWeight: "500",
                    margin: "9px 0",
                    display: "block",
                    fontSize: "14px",
                  }}
                >
                  {t("LICENSE_TERMS")}:{" "}
                  {userData?.result?.content?.licenseDetails?.name}
                  {t("FOR_DETAILS")}:{" "}
                  {userData?.result?.content?.licenseDetails?.url}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid
            item
            xs={8}
            className="xs-hide"
            style={{ borderLeft: "solid 1px #898989" }}
          >
            {/* <Link href="" underline="none" className="xs-hide" style="textAlign:'right'"> <ShareOutlinedIcon /> Share Course</Link>
        <Link href="" underline="none" className="lg-hide" style="textAlign:'right'"> <ShareOutlinedIcon /></Link> */}

            <Box
              sx={{
                background: "#EEEEEE",
                textAlign: "center",
                color: "#464665",
                fontSize: "18px",
                height: "600px",
              }}
            >
              <Box sx={{ transform: "translate(0%, 550%)" }}>
                Start learning !
                <Box style={{ fontSize: "14px" }}>
                  Join the course and select any module to start viewing
                  content!
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <FloatingChatIcon />
      <Footer />
    </div>
  );
};

export default JoinCourse;
