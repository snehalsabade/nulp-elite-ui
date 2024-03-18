import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { frameworkService } from "@shiksha/common-lib";
const Framework = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Example of API Call
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      // Headers
      const headers = {
        "Content-Type": "application/json",
        Cookie: `connect.sid=${getCookieValue("connect.sid")}`,
      };
      const url = `https://nulp.niua.org/api/channel/v1/read/0130701891041689600`;
      try {
        const response = await frameworkService.getChannel(url, headers);
        console.log(response.data.result);
        setData(response.data.result);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
      try {
        const url = `http://localhost:3000/api/framework/v1/read/nulp?categories=board,gradeLevel,medium,class,subject`;

        const response = await frameworkService.getSelectedFrameworkCategories(
          url,
          headers
        );
        console.log(response.data.result);
        setData(response.data.result);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
      // try {
      //   const url = `https://nulp.niua.org/api/framework/v1/read/nulp`;

      //   const response = await frameworkService.getFrameworkCategories(
      //     url,
      //     headers
      //   );
      //   console.log(response.data.result);
      //   setData(response.data.result);
      // } catch (error) {
      //   setError(error.message);
      // } finally {
      //   setIsLoading(false);
      // }
      try {
        const url = `https://nulp.niua.org/learner/data/v1/system/settings/get/courseFrameworkId`;

        const response = await frameworkService.getCourseFramework(
          url,
          headers
        );
        console.log(response.data.result);
        setData(response.data.result);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };
  // Function to get cookie value by name
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

  return (
    <Box textAlign="center" padding="10">
      <Heading as="h1" size="2xl" marginBottom="4">
        Welcome to Our Learning Portal Content
      </Heading>
      <Text fontSize="xl" marginBottom="8">
        Enhance your knowledge and skills with our diverse range of courses and
        content.
      </Text>
      <Button colorScheme="blue" size="lg">
        Explore Courses
      </Button>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {Object.keys(data).map((key) => (
        <div key={key}>
          <p>
            {key}: {JSON.stringify(data[key])}
          </p>
        </div>
      ))}
    </Box>
  );
};

export default Framework;
