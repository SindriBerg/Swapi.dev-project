import React from "react";
import { observer } from "mobx-react-lite";

import { Box, SimpleGrid, Flex, Grid, GridItem } from "@chakra-ui/react";
import { ResourceCard } from "./ResourceCard";

interface PeoplePageProps {}
export const PeoplePage = observer(function PeoplePage(props: PeoplePageProps) {
  return (
    <Grid display="flex" flexWrap="wrap" className="SimpleGrid">
      <GridItem>
        <ResourceCard />
      </GridItem>
    </Grid>
  );
});
