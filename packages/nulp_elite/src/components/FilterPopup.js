// FilterPopup.js
import React, { useState } from "react";

import {
  BodyLarge,
  capture,
  FilterButton,
  IconByName,
  overrideColorTheme,
  Layout,
  Widget,
} from "@shiksha/common-lib";
import { H1, H2 } from "@shiksha/common-lib";
import { Button, Modal, Text, VStack } from "native-base";
// import React from "react";
import { useTranslation } from "react-i18next";
import colorTheme from "../colorTheme";
import { defaultFilterInputs } from "../configs/framework";

const FilterPopup = ({ isOpen, onClose, applyFilters }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    filter1: false,
    filter2: false,
    // Add more filters as needed
  });

  const newDefaultInputs = defaultFilterInputs.map((e) => {
    return {
      ...e,
      ["attributeName"]: ["gradeLevel"].includes(e.attributeName)
        ? "grade"
        : e.attributeName,
      ["type"]: "sting",
    };
  });

  const handleCheckboxChange = (filter) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: !prevFilters[filter],
    }));
  };
  const { t } = useTranslation();
  const handleApplyFilters = () => {
    applyFilters(selectedFilters);
    onClose();
  };
  const [popupModal, setPopupModal] = React.useState(false);
  const colors = overrideColorTheme(colorTheme);

  const handleFilter = (obejct) => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "MyLearnings-Filter",
      filterObject: obejct,
    });
    capture("INTERACT", telemetryData);
    setFilterObject(obejct);
  };
  return (
    <Modal safeAreaTop={true} isOpen={isOpen} onClose={onClose}>
      <Modal.Content
        maxWidth="1024px"
        position="fixed"
        bottom="0"
        w="92%"
        mb="69px"
      >
        <FilterButton
          getObject={handleFilter}
          _box={{ pt: 5, px: 5 }}
          _actionSheet={{ bg: colors.cardBg }}
          _button={{ bg: colors.primaryLight, px: "15px", py: "2" }}
          _filterButton={{
            rightIcon: "",
            bg: colors.white,
            color: colors.primary,
          }}
          resetButtonText={t("COLLAPSE")}
          color={colors.primary}
          filters={newDefaultInputs}
        />
      </Modal.Content>
    </Modal>
  );
};

export default FilterPopup;
