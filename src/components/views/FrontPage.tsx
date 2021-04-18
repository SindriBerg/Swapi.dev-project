import React, { useEffect, useState } from "react";
import { Box, Flex, Link, Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { NavLink, Route, Switch, useLocation } from "react-router-dom";
import { APIService } from "../../service";
import { People } from "../../models/types";
import { versions } from "node:process";
import { PeoplePage } from "./PeoplePage";
interface MyNavLinkProps {
  to: string;
  label: string;
}
const MyNavLink = observer(function MyNavLink(props: MyNavLinkProps) {
  const location = useLocation();
  const active = location.pathname === props.to;
  return (
    <Flex
      flex={1}
      align="center"
      justify="center"
      color={active ? "red.400" : "gray.400"}
    >
      <Link as={NavLink} to={props.to}>
        {props.label}
      </Link>
    </Flex>
  );
});

const TopNavBar = observer(function TopNavBar() {
  return (
    <Flex bgColor="starWarsYellow.100" justify="space-around" align="center">
      <MyNavLink to="/people" label="People" />
      <MyNavLink to="/" label="Movies" />
      <MyNavLink to="/" label="Planets" />
      <MyNavLink to="/" label="Starships" />
      <MyNavLink to="/" label="Vehicles" />
      <MyNavLink to="/" label="Species" />
    </Flex>
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
