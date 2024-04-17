import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Footer from "components/Footer";
import Header from "components/header";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import TimelapseOutlinedIcon from "@mui/icons-material/TimelapseOutlined";
import Grid from "@mui/material/Grid";
import LibraryAddCheckOutlinedIcon from "@mui/icons-material/LibraryAddCheckOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import CircularProgressWithLabel from "../../components/CircularProgressWithLabel";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import * as util from "../../services/utilService";
import { useNavigate } from "react-router-dom";
import UserPrefPopup from "../UserPrefPopup";

const Profile = () => {
  const { t } = useTranslation();
  const [userData, setUserData] = useState(null);
  const progressValue = 60; // Example value, you can set this dynamically based on your progress
  const navigate = useNavigate();
  const [isPreferenceOpen, setIsPreferenceOpen] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _userId = util.userId();
        const url = `http://localhost:3000/learner/user/v5/read/${_userId}?fields=organisations,roles,locations,declarations,externalIds`;
        const header = "application/json";
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setUserData(data);
        localStorage.setItem(
          "userRootOrgId",
          data?.result?.response?.rootOrgId
        );
        localStorage.setItem(
          "preference",
          JSON.stringify(data?.result?.response?.framework)
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLearningHistoryClick = () => {
    navigate("/learningHistory");
  };

  const handleContinueLearningClick = () => {
    navigate("/continueLearning");
  };

  const handleDownloadCertificateClick = () => {
    navigate("/certificate");
  };

  const handleChangePreference = (data) => {
    setIsPreferenceOpen(data);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectPreference = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Header />

      <Container maxWidth="md" role="main" className="container-pb">
        <Box textAlign="center" padding="10">
          <Card
            sx={{
              marginTop: "10px",
              padding: "10px",
              boxShadow: "0px 4px 4px 0px #00000040",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Box style={{ display: "flex", alignItems: "center" }}>
                <PersonIcon
                  style={{ paddingRight: "10px", fontSize: "28px" }}
                />
                {t("ABOUT_ME")}{" "}
              </Box>
              <ModeEditIcon />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                padding: "20px 10px",
              }}
            >
              <img
                src={require("../../assets/blank.png")}
                style={{ width: "20%" }}
              />
              <CardContent style={{ textAlign: "left", paddingTop: "0" }}>
                {userData && (
                  <>
                    <Typography
                      component="div"
                      variant="h5"
                      style={{
                        color: "#004367",
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      {userData.result.response.firstName}{" "}
                      {userData.result.response.lastName}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                      style={{
                        fontSize: "12px",
                        padding: "10px 0",
                        display: "flex",
                      }}
                    >
                      {t("DESIGNATION")} |{" "}
                      <Box style={{ paddingLeft: "10px" }}> ID: </Box>{" "}
                      {userData.result.response.organisations.orgName}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                      style={{ fontSize: "12px" }}
                    >
                      A manager with the department of Revenue and taxes and has
                      actively contributed to the growth and authenticity of the
                      knowledge curated for the betterment of the department.
                    </Typography>
                    {/* Displaying the framework.board field */}
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                      style={{
                        fontSize: "14px",
                        padding: "10px 0",
                        display: "flex",
                      }}
                    >
                      <Box style={{ fontWeight: "600", paddingRight: "10px" }}>
                        {t("Domain")}:{" "}
                      </Box>{" "}
                      {userData.result.response.framework.board}
                    </Typography>
                  </>
                )}
              </CardContent>
            </Box>
          </Card>

          <Grid container spacing={2} style={{ padding: "5px 0" }}>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  marginTop: "10px",
                  padding: "10px",
                  boxShadow: "0px 4px 4px 0px #00000040",
                  display: "flex",
                  alignItems: "baseline",
                }}
                onClick={handleContinueLearningClick}
              >
                <Box
                  style={{
                    background: "#004367",
                    color: "#fff",
                    padding: "40px",
                    margin: "-10px",
                    borderTopRightRadius: "250px",
                    borderBottomRightRadius: "250px",
                  }}
                >
                  <LibraryAddCheckOutlinedIcon />
                </Box>

                <Box style={{ paddingLeft: "20px" }}>
                  {t("CONTINUE_LEARNNG")}
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  marginTop: "10px",
                  padding: "10px",
                  boxShadow: "0px 4px 4px 0px #00000040",
                  display: "flex",
                  alignItems: "baseline",
                }}
                onClick={handleDownloadCertificateClick}
              >
                <Box
                  style={{
                    background: "#004367",
                    color: "#fff",
                    padding: "40px",
                    margin: "-10px",
                    borderTopRightRadius: "250px",
                    borderBottomRightRadius: "250px",
                  }}
                >
                  <ReceiptLongOutlinedIcon />
                </Box>

                <Box style={{ paddingLeft: "20px" }}>
                  {t("DOWNLOAD_CERTIFICATES")}
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  padding: "10px",
                  boxShadow: "0px 4px 4px 0px #00000040",
                  display: "flex",
                  alignItems: "baseline",
                }}
                onClick={handleLearningHistoryClick}
              >
                <Box
                  style={{
                    background: "#004367",
                    color: "#fff",
                    padding: "40px",
                    margin: "-10px",
                    borderTopRightRadius: "250px",
                    borderBottomRightRadius: "250px",
                  }}
                >
                  <RestoreOutlinedIcon />
                </Box>

                <Box style={{ paddingLeft: "20px" }}>
                  {t("LEARNNG_HISTORY")}
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  padding: "10px",
                  boxShadow: "0px 4px 4px 0px #00000040",
                  display: "flex",
                  alignItems: "baseline",
                }}
                onClick={() => handleChangePreference(true)}
              >
                <Box
                  style={{
                    background: "#004367",
                    color: "#fff",
                    padding: "40px",
                    margin: "-10px",
                    borderTopRightRadius: "250px",
                    borderBottomRightRadius: "250px",
                  }}
                >
                  <SettingsOutlinedIcon />
                </Box>

                <Box
                  style={{ paddingLeft: "20px" }}
                  onClick={handleSelectPreference}
                >
                  {t("CHANGE_PREFERENCES")}{" "}
                  {isModalOpen && (
                    <UserPrefPopup
                      isOpen={isModalOpen}
                      onClose={handleCloseModal}
                    />
                  )}
                </Box>
              </Card>
            </Grid>
          </Grid>

          <Card sx={{ marginTop: "10px", padding: "10px" }}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <TimelapseOutlinedIcon style={{ paddingRight: "10px" }} />
                  {t("LEARNING_TIME")}
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  padding: "20px 10px",
                  fontSize: "14px",
                  color: "#484848",
                }}
              >
                <Box
                  style={{
                    background: "#A7E0FF",
                    padding: "20px 50px",
                    borderRadius: "20px",
                    marginRight: "20px",
                  }}
                >
                  {t("COURSES")}
                  <br />
                  <Typography
                    variant="h7"
                    style={{
                      fontWeight: "700",
                      margin: "9px 0",
                      display: "block",
                    }}
                  >
                    14h 20m
                  </Typography>
                </Box>
                <Box
                  style={{
                    background: "#f7cfb6",
                    padding: "20px 50px",
                    borderRadius: "20px",
                  }}
                >
                  {t("WEBINARS")}
                  <br />
                  <Typography
                    variant="h7"
                    style={{
                      fontWeight: "700",
                      margin: "9px 0",
                      display: "block",
                    }}
                  >
                    10h 15m
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Card>

          <Card sx={{ margin: "15px 0 40px 0", padding: "10px" }}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: "0 0 30px 0",
                }}
              >
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <EmojiEventsOutlinedIcon style={{ paddingRight: "10px" }} />{" "}
                  {t("PERFORMANCE")}
                </Box>
              </Box>

              <Grid container spacing={2}>
                <Grid
                  item
                  xs={6}
                  md={3}
                  className="circular"
                  style={{ paddingRight: "0", textAlign: "right" }}
                >
                  <CircularProgressWithLabel
                    value={progressValue}
                    className="crcular"
                    style={{ width: "80px", height: "80px" }}
                  />
                </Grid>
                <Grid item xs={6} md={3} className="circular">
                  <Typography
                    variant="h7"
                    style={{
                      margin: "9px 0",
                      display: "block",
                      textAlign: "left",
                    }}
                  >
                    {t("CERTIFICATIONS_RECEIVED")}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  md={3}
                  style={{ paddingRight: "0", textAlign: "right" }}
                >
                  <CircularProgressWithLabel value={progressValue} />
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography
                    variant="h7"
                    style={{
                      margin: "9px 0",
                      display: "block",
                      textAlign: "left",
                    }}
                  >
                    {t("COURSES_THAN_LAST_MONTH")}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Box>
      </Container>
      <FloatingChatIcon />
      <Footer />
      {isPreferenceOpen && (
        <UserPrefPopup isPreferenceOpen={isPreferenceOpen} />
      )}
    </div>
  );
};

export default Profile;
