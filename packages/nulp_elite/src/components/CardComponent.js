import React, { useState, useEffect } from "react";
import {
  Box,
  Image,
  Badge,
  Text,
  Stack,
  useColorMode,
  Button,
  Flex,
  Input,
  Spacer,
} from "@chakra-ui/react";
import "./Card.css";
import { Container } from "native-base";
import CardImage from "./cardImage.svg";

function Cards(props) {
  //   const [searchQuery, setSearchQuery] = useState(props.searchQuery);
  // setSearchQuery(props.searchQuery);
  // console.log('searchQuery',searchQuery);
  const [user, setUser] = useState();

  const fetchData = () => {
    // let query = [];
    // if (searchQuery) {
    //   query = [searchQuery];
    // }
    let data = {
      request: {
        filters: {
          status: ["Live"],
          medium: ["Kannada"],
          //   query: query,
          channel: "0124487522476933120",
        },
      },
    };
    fetch("https://sunbirdsaas.com/api/content/v1/search", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log("response", response);
        return response.json();
      })
      .then((data) => {
        setUser(data.result.content);
        console.log("data123", data.result.content);
      });
  };

  useEffect(() => {
    // if (props.searchQuery) {
    //   setSearchQuery(props.searchQuery);
    // }
    fetchData();
  }, [props.searchQuery]);

  return (
    <div className="parent">
      <Container w={"100%"} maxW={"100%"}>
        <Box display={"flex"} justifyContent={"center"} w={"100%"}>
          <Box className="card_Parent">
            <Box className="cardImage">
              <Image src={CardImage} />
            </Box>
            <Box className="cardHeader_BG">
              <Box className="cardHeader_Title">
                Case of Urban Sanitation in India
              </Box>
            </Box>
            <Box className="card_Body">
              <Box>
                <Input
                  className="card_input"
                  placeholder="Engineering Staff College India"
                />
              </Box>
              <Box className="cardTags">
                <Box className="card_SingleTags">SWM</Box>
                <Box className="card_SingleTags">Sanitation</Box>
                <Box className="card_SingleTags">Overview</Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Cards;
