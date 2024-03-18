import React from "react";
import {
  View,
  Heading,
  Text,
  Box,
  h6,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "native-base";
import data from "./FAQData.json"; // Import your data JSON file

const FAQPage = () => {
  return (
    <View>
      {/* Loop through categories */}
      {data.categories.map((category, index) => (
        <View key={index}>
          <Box>
            {/* Render category name */}
            <Heading fontSize="xl" p="4" pb="3">
              {category.name}
            </Heading>
          </Box>
          {/* Render dropdown for FAQs */}
          {category.faqs.map((faq, faqIndex) => (
            <View key={faqIndex}>
              <h6>{faq.topic}</h6>
              <div dangerouslySetInnerHTML={{ __html: faq.description }}></div>
              {/* Render description (with HTML parsing) */}
              {/* <Text>{faq.description}</Text> */}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default FAQPage;
