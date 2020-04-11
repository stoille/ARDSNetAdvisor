import React from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-re-super-tabs";
import CustomTab from "../CustomTab";
import ARDSNetAdvisor from "./ARDSNetAdvisor";
import GasBlend from "./GasBlend";
import About from "./About";
import { HomeGrid } from "./styles";

const Index = () => (
  <HomeGrid>
    <Tabs activeTab="ardsnet-advisor">
      <TabList>
        <Tab
          component={CustomTab}
          label="ARDSNet Ladder"
          id="ardsnet-advisor"
        />
        <Tab component={CustomTab} label="Gas Blend Advisor" id="gas-blend" />
        <Tab component={CustomTab} label="About Application" id="about" />
      </TabList>
      <TabList>
        <TabPanel component={ARDSNetAdvisor} id="ardsnet-advisor" />
        <TabPanel component={GasBlend} id="gas-blend" />
        <TabPanel component={About} id="about" />
      </TabList>
    </Tabs>
  </HomeGrid>
);

export default Index;
