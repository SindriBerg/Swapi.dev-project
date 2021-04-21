import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import {
  Box,
  SimpleGrid,
  Flex,
  Grid,
  GridItem,
  Center,
  Spinner,
  Text,
  Heading,
} from "@chakra-ui/react";
import { DisplayPeople } from "./PeopleAccordion";
import { People, Planet, ResourceTypes } from "../../models/types";
import { APIService, api } from "../../service";
import { isDefined } from "../../utils";

interface PeoplePageProps {}
export const PeoplePage = observer(function PeoplePage(props: PeoplePageProps) {
  const [peopleArray, setPeopleArray] = useState<People[]>();

  useEffect(() => {
    api.fetchResources("people").then((res) => {
      setPeopleArray(res.results);
    });
  }, [setPeopleArray]);

  useEffect(() => {
    console.log(peopleArray);
  }, [peopleArray]);

  //Make sure we have data before we render anything else.
  if (!peopleArray)
    return (
      <Center>
        <Spinner></Spinner>
      </Center>
    );

  return (
    <Box>
      <Center backgroundColor="black">
        <SimpleGrid m="1">
          <GridItem>
            <Center>
              <Heading textColor="starWarsYellow.100" size="md">
                Here is a list of some of the characters in the Star Wars
                Universe
              </Heading>
            </Center>
          </GridItem>
          <GridItem justifyContent="center">
            <Center>
              <Heading textColor="starWarsYellow.100" size="md">
                Clicking on the links will take you to their wikipedia page
              </Heading>
            </Center>
          </GridItem>
        </SimpleGrid>
      </Center>
      <DisplayPeople data={peopleArray} />;
    </Box>
  );
});
