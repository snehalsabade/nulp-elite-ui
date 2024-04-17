import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  CloseButton,
  Button,
  FormControl,
  FormLabel,
  Select,
  Checkbox,
  Stack,
  Box,
  Icon,
} from "@chakra-ui/react";
import { frameworkService } from "@shiksha/common-lib";
import { ChevronDownIcon } from "@chakra-ui/icons";
import * as util from "../services/utilService";

const UserPrefPopup = ({ isOpen, onClose, onOpen }) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [showCheckboxOptions, setShowCheckboxOptions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [currentPreference, setCurrentPreference] = useState(null);
  const [custodianOrgId, setCustodianOrgId] = useState("");
  const [isRootOrg, setIsRootOrg] = useState(false);
  const [frameworks, setFrameworks] = useState([]);
  const [defaultFramework, setDefaultFramework] = useState([]);
  const [frameworkId, setFrameworkId] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState([]);
  const [data, setData] = useState([]);
  const [userRootOrgId, setUserRootOrgId] = useState();
  const _userId = util.userId();

  useEffect(() => {
    const fetchUserDataAndSetCustodianOrgData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/learner/data/v1/system/settings/get/custodianOrgId"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch custodian organization ID");
        }
        const data = await response.json();
        console.log("Raw API response:", data);
        const custodianOrgId = data?.result?.response?.value;
        setCustodianOrgId(custodianOrgId);
        setUserRootOrgId(localStorage.getItem("userRootOrgId"));
        const rootOrgId = localStorage.getItem("userRootOrgId");
        if (custodianOrgId === rootOrgId) {
          setIsRootOrg(true);
        } else {
          setIsRootOrg(false);
        }

        if (isRootOrg || !isUserLoggedIn) {
          const response = await fetch(
            `http://localhost:3000/api/channel/v1/read/${custodianOrgId}`
          );
          const data = await response.json();
          const frameworks = data?.result?.channel?.frameworks.map(
            (framework) => framework.name
          );
          setFrameworks(frameworks);
        } else {
          const response = await fetch(
            `http://localhost:3000/api/channel/v1/read/${rootOrgId}`
          );
          const data = await response.json();
          const frameworks = data?.result?.channel?.suggested_frameworks.map(
            (framework) => framework.name
          );
          const defaultFramework = data?.result?.channel?.defaultFramework;
          //   const frameworkId = defaultFramework;
          const frameworkData = data?.result?.framework?.categories;
          setFrameworks(frameworks);
          setDefaultFramework(defaultFramework);
          console.log("defaultFramework", defaultFramework);
          console.log("frameworkId", frameworkId);
          getFrameworkCategories(defaultFramework);
          console.log("defaultFramework1", defaultFramework);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (isUserLoggedIn) {
      fetchUserDataAndSetCustodianOrgData();
    } else {
      fetchUserDataAndSetCustodianOrgData();
    }
  }, [onOpen]);

  const getFrameworkCategories = async (defaultFramework) => {
    try {
      const frameworkOptionsResponse = await fetch(
        `http://localhost:3000/api/framework/v1/read/${defaultFramework}?categories=board,gradeLevel,medium,class,subject`
      );

      const frameworkOptions = await frameworkOptionsResponse.json();
      console.log("frameworkOptions", frameworkOptions);
      return frameworkOptions;
    } catch (error) {
      console.error("Error ....:", error);
      throw error;
    }
  };
  useEffect(() => {
    if (!isOpen) return;

    setCurrentPreference(JSON.parse(localStorage.getItem("preference")));
    const selectedPreferenceByUser = JSON.parse(
      localStorage.getItem("preference")
    );
    setSelectedCategory(selectedPreferenceByUser?.board[0]);

    setSelectedSubCategory(selectedPreferenceByUser?.gradeLevel[0]);
    setSelectedLanguages(selectedPreferenceByUser?.medium);
    // setSelectedTopic(selectedPreferenceByUser?.topic[0]);

    getFramework();
  }, [isOpen]);

  const getFramework = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await frameworkService.getFrameworkCategories(
        "http://localhost:3000/api/framework/v1/read/nulp",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response?.data?.result?.framework?.categories;
      console.log("data", data);
      setCategories(data[0].terms);
      setSubCategories(data[1].terms);
      setLanguages(data[3].terms);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageChange = (language) => {
    if (selectedLanguages?.includes(language)) {
      setSelectedLanguages(
        selectedLanguages?.filter((lang) => lang !== language)
      );
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  const isChecked = (language) => {
    return selectedLanguages?.includes(language);
  };

  const handleSelectAll = () => {
    if (selectedLanguages?.length === languages?.terms?.length) {
      setSelectedLanguages([]);
    } else {
      setSelectedLanguages(languages?.terms?.map((language) => language.name));
    }
  };

  const onChangeLanguage = (event) => {
    setSelectedLanguages(event.target.value);
  };

  const updateUserData = async () => {
    setIsLoading(true);
    setError(null);

    const url = "http://localhost:3000/learner/user/v3/update";
    const requestBody = {
      params: {},
      request: {
        framework: {
          board: [selectedCategory],
          medium: selectedLanguages,
          gradeLevel: [selectedSubCategory],
          id: "nulp",
        },
        userId: _userId,
      },
    };
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      let responseData = await response.json();
      getFramework();
      console.log("responseData", responseData);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSavePreferences = () => {
    updateUserData();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Your Preferences</ModalHeader>
        <CloseButton
          position="absolute"
          right="8px"
          top="8px"
          onClick={onClose}
        />
        <ModalBody>
          <FormControl>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              placeholder="Select Category"
            >
              {categories.map((category) => (
                <option key={category?.index} value={category.value}>
                  {category.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <Select
              value={selectedSubCategory}
              onChange={(e) => setSelectedSubCategory(e.target.value)}
              placeholder="Select Subcategory"
            >
              {subCategories?.map((subCategory) => (
                <option key={subCategory.index} value={subCategory.value}>
                  {subCategory.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <Stack direction="column" spacing={2}>
            <Box
              value={selectedLanguages}
              onChange={onChangeLanguage}
              w={"100%"}
              display={"flex"}
              alignItems="center"
              minHeight={"40px"}
              border={"1px solid"}
              borderColor={"gray.200"}
              borderRadius={"12px"}
              onClick={() => setShowCheckboxOptions(!showCheckboxOptions)}
              cursor="pointer"
              position="relative"
              margin={"20px"}
            >
              <Box flex="1" pl={2}>
                {selectedLanguages &&
                  selectedLanguages.map((language) => (
                    <Box
                      placeholder={language.name}
                      key={language.id}
                      bg="gray.100"
                      p={1}
                      m={1}
                      borderRadius="md"
                      display="inline-block"
                    >
                      {language}
                    </Box>
                  ))}
              </Box>
              <Icon
                as={ChevronDownIcon}
                w={6}
                h={6}
                mr={2}
                color="black.500"
                position="absolute"
                right={2}
                top="50%"
                transform="translateY(-50%)"
              />
            </Box>
            {showCheckboxOptions && (
              <>
                <Checkbox
                  isChecked={
                    selectedLanguages?.length === languages?.terms?.length
                  }
                  onChange={handleSelectAll}
                >
                  Select All
                </Checkbox>
                {languages?.terms?.map((language) => (
                  <Checkbox
                    key={language.id}
                    isChecked={isChecked(language.name)}
                    onChange={() => handleLanguageChange(language.name)}
                  >
                    {language.name}
                  </Checkbox>
                ))}
              </>
            )}
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSavePreferences}
            isLoading={isLoading}
          >
            Save
          </Button>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserPrefPopup;
