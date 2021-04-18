import React from "react";
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
} from "@chakra-ui/react";
import { ResourceTypes, Gender } from "../../models/types";
interface ResourceCardProps {
  //resource: ResourceTypes;
}

const foo: ResourceTypes = {
  name: "Luke Skywalker",
  height: "1",
  mass: "77",
  hairColor: "#faf0be",
  skinColor: "Orange",
  eyeColor: "brown",
  birthYear: "1995",
  gender: Gender.Male,
  homeworld: "Tatooine",
  films: ["1", "2"],
  species: ["Human"],
  vehicles: ["N/A"],
  starships: ["N/A"],
  created: new Date(),
  edited: new Date(),
  url: "N/A",
};

//TODO: Replace foo with props with data from API
export const ResourceCard = observer(function ResourceCard(
  props: ResourceCardProps
) {
  return (
    <Box
      border="1px solid transparent"
      backgroundColor="blackAlpha.500"
      _hover={{
        border: "1px solid white",
        transition: "all 0.3s linear",
        boxShadow: "xl",
        borderRadius: "10",
      }}
      borderRadius="5"
      padding="2"
      margin="2"
      className="Card"
    >
      <Image
        borderRadius="5"
        margin="5"
        src="/people_images/LukeSkywalker.jpg"
        h="15vh"
      />
      <HStack>
        <Tag
          borderRadius="full"
          textColor="white"
          backgroundColor={foo.eyeColor}
        >
          <TagLabel>Eye Color</TagLabel>
        </Tag>
        <Tag borderRadius="full" backgroundColor={foo.hairColor}>
          <TagLabel>Hair Color</TagLabel>
        </Tag>
      </HStack>
      <Heading size="sm" fontWeight="bold">
        {foo.name}
      </Heading>
      <Heading textTransform="capitalize" size="sm">
        {foo.gender}
      </Heading>
      <Box>
        <Heading size="sm" fontWeight="bold">
          Movies
        </Heading>
        <Text></Text>
      </Box>
    </Box>
  );
});
