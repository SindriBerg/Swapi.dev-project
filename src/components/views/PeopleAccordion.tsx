import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import {
  Box,
  Image,
  Badge,
  Avatar,
  AvatarBadge,
  VStack,
  Tag,
  HStack,
  TagLabel,
  TagRightIcon,
  Text,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  ExpandedIndex,
  Flex,
  Center,
  Spinner,
  SimpleGrid,
  GridItem,
  Link,
} from "@chakra-ui/react";
import {
  ResourceTypes,
  Gender,
  People,
  Film,
  Planet,
} from "../../models/types";
import { APIService, APITypeMap, api } from "../../service";
import { isPropertySignature } from "typescript";
import { MyNavLink } from "./FrontPage";

interface PeopleItemProps {
  data: People;
  imgPath: string;
  expanded: boolean;
}

interface ResourceFetcherProps<K extends keyof APITypeMap> {
  //The type is of APITypeMap
  type: K;
  //Path to the API
  path: string;
  component: React.FunctionComponent<{ resource: APITypeMap[K] }>;
}

//Component to fetch a resource from the API.
//Data in the API is often stored in arrays with direct links
//to an API URL call.

//It takes the type of K which extends APITypeMap
//Its props let me render a component where its props is a resource
//and the resource type is of the type of APITypeMap.

//This component will let me directly access data from the API
//and basically do what I want to with the data.
export const ResourceFetcher = observer(function ResourceFetcher<
  K extends keyof APITypeMap
>(props: ResourceFetcherProps<K>) {
  const [resource, setResource] = useState<APITypeMap[K]>();
  useEffect(() => {
    api.fetchResource<K>(props.path).then((res) => setResource(res));
  }, []);
  //Return spinner if no resource
  if (resource === undefined) return <Spinner />;
  return <props.component resource={resource} />;
});

//Component to display the different People from the API in an accordion
export const PeopleItem = observer(function PeopleItem(props: PeopleItemProps) {
  const data = props.data;
  return (
    <AccordionItem
      backgroundColor="black"
      textColor="starWarsYellow.100"
      _hover={{ backgroundColor: "blackAlpha.800" }}
      _focus={{ border: "none" }}
      border="none"
    >
      <AccordionItem>
        <AccordionButton
          justifyContent="space-between"
          _expanded={{
            backgroundColor: "starWarsYellow.100",
            textColor: "black",
          }}
          _focus={{ border: "none" }}
          alignItems="stretch"
        >
          <Box alignItems="center" display="flex" flexDirection="row" flex={1}>
            <Center flex={1}>
              <Image height="10vh" src={props.imgPath + ".jpg"} />
            </Center>
            <Text
              textAlign="left"
              flex={2}
              as="span"
              fontWeight="bold"
              pl="1"
              border="black"
            >
              <Link
                href={`https://en.wikipedia.com/wiki/${props.data.name}`}
                isExternal
                textTransform="capitalize"
              >
                {data.name}
              </Link>
            </Text>
          </Box>
          <Box
            display="flex"
            flex={3}
            alignItems="center"
            justifyContent="start"
          >
            <ResourceFetcher
              type={"planet"}
              component={(props) => (
                <Text as="span">Homeworld: {props.resource.name} </Text>
              )}
              path={props.data.homeworld}
            />
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel backgroundColor="starWarsYellow.100" textColor="black">
          <SimpleGrid columns={2}>
            <GridItem>
              <Heading size="md" fontWeight="bold">
                General info
              </Heading>
              <Box>
                {props.data.gender === Gender.NA ? (
                  <Text textTransform="capitalize">
                    Gender: Most likely a robot..
                  </Text>
                ) : (
                  <Text textTransform="capitalize">
                    Gender: {props.data.gender}
                  </Text>
                )}
                <Text textTransform="capitalize">
                  Weight: {props.data.mass} kgs
                </Text>
                <Text textTransform="capitalize">
                  Skin color: {props.data.skin_color}
                </Text>
                <Text textTransform="capitalize">
                  Hair color:{props.data.hair_color}
                </Text>
                <Text>Birth year: {props.data.birth_year}</Text>
                <Text textTransform="capitalize">
                  Eye color: {props.data.eye_color}
                </Text>
              </Box>
            </GridItem>
            <GridItem>
              <Heading size="md" fontWeight="bold">
                Films
              </Heading>
              <Box>
                {props.data.films.map((f) => {
                  return (
                    <ResourceFetcher
                      type={"film"}
                      component={(props) => (
                        <Flex>
                          <Link
                            label={props.resource.title}
                            href={`https://en.wikipedia.com/wiki/${props.resource.title}`}
                            isExternal
                          >
                            {props.resource.title}
                          </Link>
                        </Flex>
                      )}
                      path={f}
                      key={f}
                    />
                  );
                })}
              </Box>
            </GridItem>
          </SimpleGrid>
        </AccordionPanel>
      </AccordionItem>
    </AccordionItem>
  );
});

interface DisplayPeopleProps {
  data: People[];
}

//Top level Accordion wrapper for the People items.
export const DisplayPeople = observer(function DisplayPeople(
  props: DisplayPeopleProps
) {
  const [expanded, setExpanded] = useState<ExpandedIndex>();

  return (
    <Accordion allowToggle onChange={(i) => setExpanded(i)}>
      {props.data.map((p, i) => {
        return (
          <PeopleItem
            expanded={expanded === i}
            data={p}
            imgPath={`/people_images/${p.name}`}
          />
        );
      })}
    </Accordion>
  );
});
