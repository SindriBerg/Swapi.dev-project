import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Link,
  Grid,
  GridItem,
  SimpleGrid,
  Image,
  Text,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { NavLink, Route, Switch, useLocation } from "react-router-dom";
import { APIService } from "../../service";
import { People } from "../../models/types";
import { versions } from "node:process";
import { PeoplePage } from "./PeoplePage";
import { SVGPlanet } from "./PlanetRenderer";
interface MyNavLinkProps {
  to: string;
  label: string;
}
export const MyNavLink = observer(function MyNavLink(props: MyNavLinkProps) {
  const location = useLocation();
  const active = location.pathname === props.to;
  return (
    <Flex
      flex={1}
      align="center"
      justify="center"
      color={active ? "red.400" : "gray.400"}
    >
      <Link textColor="starWarsYellow.100" as={NavLink} to={props.to}>
        {props.label}
      </Link>
    </Flex>
  );
});

const TopNavBar = observer(function TopNavBar() {
  return (
    <Flex bgColor="black" justify="space-around" align="center">
      <MyNavLink to="/" label="Frontpage" />
      <MyNavLink to="/people" label="People" />
      <MyNavLink to="/planets" label="Planets" />
    </Flex>
  );
});

interface FrontPageDisplayProps {}
export const FrontPageDisplay = observer(function FrontPageDisplay(
  props: FrontPageDisplayProps
) {
  return (
    <Box>
      <Image width="100%" src="/frontpagelogo.jpg" />
      <Box bgColor="black">
        <Text color="starWarsYellow.100" textAlign="center" fontSize="6xl">
          Welcome to my swapi.dev project
        </Text>
      </Box>
    </Box>
  );
});

interface FrontPageProps {}
export const FrontPage = observer(function FrontPage(props: FrontPageProps) {
  return (
    <Box className="Frontpage box" w="100%" h="100%">
      <Grid className="FP Grid" h="100%">
        <GridItem className="NavBar Item">
          <TopNavBar />
        </GridItem>
        <GridItem className="Switch item">
          <Switch>
            <Route exact path="/">
              <FrontPageDisplay />
            </Route>
            <Route exact path="/planets">
              <SVGPlanet />
            </Route>
            <Route exact path="/people">
              <PeoplePage />
            </Route>
            {/* Router for no location */}
            <Route>404 - Path was not found</Route>
          </Switch>
        </GridItem>
      </Grid>
    </Box>
  );
});
