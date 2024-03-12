import React, { useState, useEffect } from "react";
import {
  Box,
  Image,
  Input,
  Container
} from "@chakra-ui/react";
import CardImage from "./cardImage.svg";
import "./Card.css";
import { learnerService } from "@shiksha/common-lib";

function CardComponent(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchCourseData();
  }, []);

  const fetchCourseData = () => {
    let data = {
      "request": {
        "filters": {
          "audience": [],
          "primaryCategory": [
            "Course",
            "Course Assessment"
          ],
          "channel": [],
          "visibility": []
        },
        "limit": 100,
        "fields": [
          "name",
          "appIcon",
          "medium",
          "subject",
          "resourceType",
          "contentType",
          "organisation",
          "topic",
          "mimeType",
          "trackable",
          "gradeLevel",
          "se_boards",
          "se_subjects",
          "se_mediums",
          "se_gradeLevels"
        ],
        "facets": [
          "subject",
          "audience",
          "medium",
          "gradeLevel",
          "channel"
        ]
      }
    }

    fetch("https://nulp.niua.org/api/content/v1/search", {
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
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Container>
        {user && user.map((item, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="center"
            marginBottom="20px"
            width="300px" 
            height="400px" 
            position="relative" 
          >
            <Box className="card_Parent">
              <Box className="cardImage" position="absolute" top="10px" right="10px">
              </Box>
              <Box className="cardHeader_BG">
                <Box className="cardHeader_Title">
                  {item.name}
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
        ))}
      </Container>
    </Box>
  );
}

export default CardComponent;










// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Image,
//   Badge,
//   Text,
//   Stack,
//   useColorMode,
//   Button,
//   Flex,
//   Input,
//   Spacer,
// } from "@chakra-ui/react";
// import "./Card.css";
// import { Container } from "native-base";
// import CardImage from "./cardImage.svg";

// function Cards(props) {
//   //   const [searchQuery, setSearchQuery] = useState(props.searchQuery);
//   // setSearchQuery(props.searchQuery);
//   // console.log('searchQuery',searchQuery);
//   const [user, setUser] = useState();

//   const fetchData = () => {
//     // let query = [];
//     // if (searchQuery) {
//     //   query = [searchQuery];
//     // }
//     let data = {
//       "request": {
//           "filters": {
//               "audience": [],
//               "primaryCategory": [
//                   "Course",
//                   "Course Assessment"
//               ],
//               "channel": [],
//               "visibility": []
//           },
//           "limit": 100,
//           "fields": [
//               "name",
//               "appIcon",
//               "medium",
//               "subject",
//               "resourceType",
//               "contentType",
//               "organisation",
//               "topic",
//               "mimeType",
//               "trackable",
//               "gradeLevel",
//               "se_boards",
//               "se_subjects",
//               "se_mediums",
//               "se_gradeLevels"
//           ],
//           "facets": [
//               "subject",
//               "audience",
//               "medium",
//               "gradeLevel",
//               "channel"
//           ]
//       }
//   };
  
//     fetch("https://sunbirdsaas.com/api/content/v1/search", {
//       params : {orgdetails : orgName,email,
//         framework : nulp},
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => {
//         console.log("response", response);
//         return response.json();
//       })
//       .then((data) => {
//         setUser(data.result.content);
//         console.log("data123", data.result.content);
//       });
//   };

//   useEffect(() => {
//     // if (props.searchQuery) {
//     //   setSearchQuery(props.searchQuery);
//     // }
//     fetchData();
//   }, [props.searchQuery]);

//   return (
//     <div className="parent">
//       <Container w={"100%"} maxW={"100%"}>
//         <Box display={"flex"} justifyContent={"center"} w={"100%"}>
//           <Box className="card_Parent">
//             <Box className="cardImage">
//               <Image src={CardImage} />
//             </Box>
//             <Box className="cardHeader_BG">
//               <Box className="cardHeader_Title">
//                 Case of Urban Sanitation in India
//               </Box>
//             </Box>
//             <Box className="card_Body">
//               <Box>
//                 <Input
//                   className="card_input"
//                   placeholder="Engineering Staff College India"
//                 />
//               </Box>
//               <Box className="cardTags">
//                 <Box className="card_SingleTags">SWM</Box>
//                 <Box className="card_SingleTags">Sanitation</Box>
//                 <Box className="card_SingleTags">Overview</Box>
//               </Box>
//             </Box>
//           </Box>
//         </Box>
//       </Container>
//     </div>
//   );
// }

// export default Cards;
