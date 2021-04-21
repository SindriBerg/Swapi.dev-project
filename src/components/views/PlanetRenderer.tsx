import { observer } from "mobx-react-lite";
import React, { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";

import { useToggle } from "../../hooks/useToggle";
import {
  Box,
  Center,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
  Image,
  Spinner,
  Stack,
  Link,
  Grid,
  HStack,
} from "@chakra-ui/react";
import { Planet } from "../../models/types";
import { ResourceFetcher } from "./PeopleAccordion";
import _ from "lodash";

interface StarInfo {
  x: number;
  y: number;
  star: number;
}

type PlanetInfo = DisplayPlanetProps & {
  x: number;
  y: number;
  description?: string;
};

//I store the values of the planets in this array, so I more easily can spread them and access their internal props.
const planets: PlanetInfo[] = [
  //Hoth
  {
    description:
      "Hoth was a remote, icy planet that was the sixth planet in the star system of the same name. It notably hosted Echo Base, the temporary headquarters of the Alliance to Restore the Republic, until the Galactic Empire located the Rebels, initiating a major confrontation known as the Battle of Hoth.",
    x: 50,
    y: 50,
    textPositionX: -5,
    textPositionY: -10,
    path: "https://swapi.dev/api/planets/4",
    moons: [
      {
        moon: {
          name: "Unnamed #1",
          moonColor: "gray",
          diameter: 1,
        },
        initialPosX: -10,
        initialPosY: 10,
        rotationDur: 20,
      },
      {
        moon: {
          name: "Unnamed #2",
          moonColor: "gray",
          diameter: 1,
        },
        initialPosX: 15,
        initialPosY: 15,
        rotationDur: 20,
      },
      {
        moon: {
          name: "Unnamed #3",
          moonColor: "gray",
          diameter: 1,
        },
        initialPosX: 20,
        initialPosY: 15,
        rotationDur: 55,
      },
    ],
    planetColor: "#dcf3ff",
  },
  {
    description:
      "Alderaan, located in the Core Worlds, was a terrestrial planet covered with mountains. During the waning decades of the Galactic Republic, it was ruled by Queen Breha Organa and represented in the Galactic Senate by her husband, Senator Bail Prestor Organa.",
    x: 100,
    y: 50,
    planetColor: "#228b22",
    textPositionX: -10,
    textPositionY: -17,
    moons: [
      {
        initialPosX: -20,
        initialPosY: -15,
        moon: {
          diameter: 3,
          moonColor: "gray",
          name: "Alderaan Moon",
        },
        rotationDur: 25,
      },
    ],
    path: "https://swapi.dev/api/planets/2",
  },
  {
    description:
      "Tatooine was a sparsely inhabited circumbinary desert planet located in the galaxy's Outer Rim Territories. It was the homeworld of Anakin and Luke Skywalker, who would go on to shape galactic history. Part of a binary star system, the planet was oppressed by scorching suns, resulting in the world lacking the necessary surface water to sustain large populations. As a result, many residents of the planet instead drew water from the atmosphere via moisture farms. The planet also had little surface vegetation.",

    x: 150,
    y: 50,
    textPositionX: -10,
    textPositionY: -15,
    planetColor: "#e1bf92",
    moons: [
      {
        initialPosX: -20,
        initialPosY: -15,
        moon: {
          diameter: 1.5,
          moonColor: "gray",
          name: "Ghomrassen",
        },
        rotationDur: 30,
      },
    ],
    path: "https://swapi.dev/api/planets/1",
  },
  {
    description:
      "Yavin 4, also known as Yavin, was the jungle-covered fourth moon in orbit around the red gas giant Yavin Prime. Prior to and during the Galactic Civil War, it hosted the headquarters of the Alliance to Restore the Republic, a group of resistance fighters that opposed the dominant Galactic Empire. Following a major battle that took place around Yavin, the Alliance went on the run, and eventually relocated its headquarters to Hoth.",
    x: 200,
    y: 50,
    textPositionX: -10,
    textPositionY: -15,
    planetColor: "#29ab87",
    path: "https://swapi.dev/api/planets/3",
  },
  {
    description:
      "Dagobah was a planet in the Dagobah system, and one of the purest places in the galaxy within the Force. A remote world of swamps and forests, it served as a refuge for Jedi Grand Master Yoda during his exile after the destruction of the Jedi Order. Luke Skywalker received advanced training in the ways of the Force under Jedi Master Yoda on Dagobah, and it was later the place of Yoda's death and transformation into the Force.",
    x: 225,
    y: 50,
    textPositionX: -10,
    textPositionY: -15,
    planetColor: "#006a4e",
    path: "https://swapi.dev/api/planets/5",
  },
  {
    description:
      "Endor, designated IX3244-A, also known as the Forest Moon of Endor or the Sanctuary Moon, was a small forested moon that orbited the Outer Rim planet of the same name and was the homeworld of the sentient Dulok, Ewok, and Yuzzum species, as well as the semi-sentient Gorax and Wistie races.",
    x: 250,
    y: 50,
    textPositionX: -5,
    textPositionY: -10,
    planetColor: "#228b22",
    path: "https://swapi.dev/api/planets/7",
  },
  {
    description:
      "Kamino (pronounced /kə'minoʊ/) was an aquatic planet located in an extragalactic star system that straggled south of the Rishi Maze satellite galaxy and beyond the larger galaxy. It was inhabited by the Kaminoans—a race of tall, elegant beings with long necks who were regarded as a mysterious species that tended to keep to themselves. They were also known for their cloning technology which ultimately led to the creation of a clone army for the Galactic Republic.",
    x: 290,
    y: 50,
    textPositionX: -10,
    textPositionY: -25,
    planetColor: "#2384eb",
    path: "https://swapi.dev/api/planets/10",
  },
  {
    description:
      "Naboo was a bountiful planet in the Chommell sector of the Mid Rim, close to the border of the Outer Rim Territories. It was home to the Gungan species and to a population of humans known as the Naboo. Naboo was pushed to the forefront of galactic politics as the birthplace of the Dark Lord of the Sith Sheev Palpatine, who served as its representative in the Senate of the Galactic Republic.",
    x: 350,
    y: 50,
    moons: [
      {
        initialPosX: -20,
        initialPosY: 30,
        moon: {
          diameter: 1.5,
          moonColor: "gray",
          name: "Ohma-D'un",
        },
        rotationDur: 30,
      },
      {
        initialPosX: 20,
        initialPosY: 30,
        moon: {
          diameter: 1.5,
          moonColor: "gray",
          name: "Onoam",
        },
        rotationDur: 15,
      },
      {
        initialPosX: 30,
        initialPosY: 30,
        moon: {
          diameter: 1.5,
          moonColor: "gray",
          name: "Veruna",
        },
        rotationDur: 50,
      },
    ],
    textPositionX: -8,
    textPositionY: -15,
    planetColor: " #06470c",
    path: "https://swapi.dev/api/planets/8",
  },
  {
    description:
      "Coruscant (pronounced /'kɔɹəsɑnt/ or, more rarely, /kəˈɹʌskənt), originally called Notron, also known as Imperial Center or the Queen of the Core, was a planet located in the Galactic Core. It was generally agreed that Coruscant was, during most of galactic history, the most politically important world in the galaxy. At various times, it was the capital of the Galactic Republic, the Galactic Empire, the New Republic, the Yuuzhan Vong empire, the Galactic Alliance, very briefly the Fel Empire, Darth Krayt's Galactic Empire, and the Galactic Federation Triumvirate. In controlling Coruscant, these governments controlled most of the galaxy in the process.",
    x: 100,
    y: 100,
    moons: [
      {
        initialPosX: 30,
        initialPosY: 30,
        moon: {
          diameter: 1.5,
          moonColor: "gray",
          name: "Centax 3",
        },
        rotationDur: 50,
      },
      {
        initialPosX: -17,
        initialPosY: 30,
        moon: {
          diameter: 1.5,
          moonColor: "gray",
          name: "Unnamed #1",
        },
        rotationDur: 35,
      },
      {
        initialPosX: 35,
        initialPosY: 30,
        moon: {
          diameter: 1,
          moonColor: "gray",
          name: "Unnamed #2",
        },
        rotationDur: 100,
      },
    ],
    textPositionX: -10,
    textPositionY: -15,
    planetColor: "#490000",
    path: "https://swapi.dev/api/planets/9",
  },
  {
    description:
      "Bespin was a gas giant in the star system of the same name. Forming a part of the Anoat sector, its riches manifested in the form of rare tibanna gas. Attracting mining interests and remaining unaffiliated in galactic affairs, Ugnaughts were employed to extract tibanna from repulsorlifted facilities whilst Bespin's mostly human population resided in the open upper levels, exposed to a thin layer of breathable atmosphere in an area known as the `Life Zone`",
    x: 200,
    y: 300,
    textPositionX: -5,
    textPositionY: -140,
    planetColor: "#ca7a43",
    path: "https://swapi.dev/api/planets/6",
    moons: [
      {
        initialPosX: -150,
        initialPosY: 300,
        moon: {
          diameter: 3,
          moonColor: "#5ca08e",
          name: "H'gaard",
        },
        rotationDur: 30,
      },
      {
        initialPosX: 175,
        initialPosY: 500,
        moon: {
          diameter: 2.5,
          moonColor: "#5ca08e",
          name: "Drudonna",
        },
        rotationDur: 100,
      },
    ],
  },
];

//This function creates an empty array with a given length
//The length corresponds to the amount of stars I wish to use
function generateRandomStars(length: number): StarInfo[] {
  const dimension = 1000; //The size of my viewbox
  const sqrt = Math.sqrt(length); //Sqrt of my length, to spread them out equally
  const space = dimension / sqrt; //The space between the stars depending on dimension and the squared root of the length.

  //I return an array with the given length
  //I map the array and use modulus on the index to return the stars in an equal area on the x axis
  //I divide the index with the sqrt to get my y value
  //I multiply both values with the space, and then I add a buffer/flutter/jiggle to the value, so that their placement is random and not uniformly distributed
  return Array.from({ length }).map((__, i) => ({
    x: (i % sqrt) * space + Math.random() * 1000,
    y: (i / sqrt) * space + Math.random() * 100,
    star: _.sample([1, 2, 3])!, //this is to index between the 3 different value of stars I have defined
  }));
}

interface SVGPlanetProps {}

//This is main SVG component to display all my SVG elements.
//The name is not really fitting.
export const SVGPlanet = observer(function SVGPlanet(props: SVGPlanetProps) {
  const [planet, setPlanet] = useState<PlanetInfo>();
  const [stars, setStars] = useState<StarInfo[]>(generateRandomStars(50)); //I generate new stars in this state as an initial state using my function
  const svgRef = useRef<SVGSVGElement>(null);

  function translatePoint(x: number, y: number) {
    const point = svgRef.current?.createSVGPoint();
    point!.x = x;
    point!.y = y;
    return point?.matrixTransform(svgRef.current?.getCTM()!);
  }

  return (
    <Box>
      <Box></Box>
      <SimpleGrid backgroundColor="black">
        <GridItem>
          <Center>
            <Heading textColor="starWarsYellow.100" size="md">
              Here is a rendition of some of the planets in the Star Wars
              Universe
            </Heading>
          </Center>
        </GridItem>
        <GridItem justifyContent="center">
          <Center>
            <Heading textColor="starWarsYellow.100" size="md">
              Their information is fetched from the API, making their sizes
              relative to each other (scaled to fit the viewbox)
            </Heading>
          </Center>
        </GridItem>
        <GridItem>
          <Center>
            <Heading textColor="starWarsYellow.100" size="md">
              They are all rendered in SVG using Framer Motion
            </Heading>
          </Center>
        </GridItem>
        <GridItem>
          <Center>
            <Heading textColor="starWarsYellow.100" size="md">
              The information about their moons is found through
              starwars.fandom.com
            </Heading>
          </Center>
        </GridItem>
        <GridItem>
          <Box position="relative">
            <svg
              ref={svgRef}
              viewBox={"0 0 500 500"}
              style={{ backgroundColor: "black" }}
            >
              <defs>
                <symbol id="star1" viewBox="0 0 750 750" overflow="visible">
                  <motion.path
                    animate={{
                      scale: [0.3, 1, 0.3],
                      fill: [
                        "#ffd27d",
                        "#ffa371",
                        "#a6a8ff",
                        "#fffa86",
                        "#a87bff",
                      ],
                    }}
                    transition={{
                      duration: 5,
                      loop: Infinity,
                      ease: "linear",
                      repeatType: "reverse",
                    }}
                    d="M300,0L320.5,243.6L492.8,70.2L352,270L595.4,247.9L359.1,310.4L559.8,450L338.6,346L402.6,581.9L300,360L197.4,581.9L261.4,346L40.2,450L240.9,310.4L4.6,247.9L248,270L107.2,70.2L279.5,243.6L300,0z"
                  ></motion.path>
                </symbol>
                <symbol id="star2" viewBox="0 0 750 750" overflow="visible">
                  <motion.path
                    animate={{
                      scale: [0.3, 0.5, 0.3],
                      fill: ["#FFFFFF", "#DFB34B", "#FFFFFF"],
                    }}
                    transition={{
                      duration: 5,
                      loop: Infinity,
                      ease: "linear",
                      repeatType: "reverse",
                    }}
                    d="M300,0L320.5,243.6L492.8,70.2L352,270L595.4,247.9L359.1,310.4L559.8,450L338.6,346L402.6,581.9L300,360L197.4,581.9L261.4,346L40.2,450L240.9,310.4L4.6,247.9L248,270L107.2,70.2L279.5,243.6L300,0z"
                  ></motion.path>
                </symbol>
                <symbol id="star3" viewBox="0 0 750 750">
                  <motion.path
                    animate={{
                      scale: [0.2, 0.5, 0.2],
                      fill: ["#DFB34B", "#FFFFFF", "#DFB34B"],
                    }}
                    transition={{ duration: 5, loop: Infinity, ease: "linear" }}
                    d="M300,0L320.5,243.6L492.8,70.2L352,270L595.4,247.9L359.1,310.4L559.8,450L338.6,346L402.6,581.9L300,360L197.4,581.9L261.4,346L40.2,450L240.9,310.4L4.6,247.9L248,270L107.2,70.2L279.5,243.6L300,0z"
                  ></motion.path>
                </symbol>
                <motion.pattern
                  id="images"
                  width="100"
                  height="100"
                  viewBox="0 0 1000 1000"
                  patternUnits="userSpaceOnUse"
                >
                  {stars.map((
                    s //Here I map my stars out into an <use> element
                  ) => (
                    <use
                      x={s.x}
                      y={s.y}
                      width="25"
                      height="25"
                      href={`#star${s.star}`}
                    />
                  ))}
                </motion.pattern>
              </defs>

              <rect width="500" height="500" fill="url(#images)" />
              {planets.map((p) => (
                <motion.g
                  onMouseEnter={() => {
                    const point = translatePoint(p.x, p.y);
                    return setPlanet({ ...p, x: point!.x, y: point!.y });
                  }}
                  onMouseLeave={() => setPlanet(undefined)}
                  transform={`translate(${p.x},${p.y})`}
                >
                  <DisplayPlanet {...p} />
                </motion.g>
              ))}
            </svg>
            {planet && (
              <DisplayPlanetInfo
                path={planet.path}
                x={planet.x}
                y={planet.y}
                planet={planet}
              />
            )}
          </Box>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
});

interface DisplayPlanetInfoProps {
  planet: PlanetInfo;
  path: string;
  x: number;
  y: number;
}
export const DisplayPlanetInfo = observer(function DisplayPlanetInfo(
  props: DisplayPlanetInfoProps
) {
  return (
    <ResourceFetcher
      type="planet"
      path={props.path}
      component={(innerProps) => (
        <Box
          borderRadius={10}
          top={props.y + 30}
          left={props.x}
          position="absolute"
          backgroundColor="starWarsYellow.100"
          display="flex"
          padding={2}
        >
          <Grid>
            <GridItem>
              <Box display="flex" flex={1}>
                <Image
                  mr={1}
                  height="300"
                  src={`/planet_images/${innerProps.resource.name}.jpg`}
                  fallback={<Spinner />}
                />

                <Stack textColor="black">
                  <Text fontWeight="bold" as="u" textColor="black">
                    {innerProps.resource.name}
                  </Text>
                  <Text maxWidth="400px">{props.planet.description}</Text>
                  <Text as="i">
                    Orbital period: {innerProps.resource.orbital_period} days
                  </Text>
                  <Text as="i">
                    Diameter: {innerProps.resource.diameter} km
                  </Text>
                  <Text as="i">Gravity: {innerProps.resource.gravity}</Text>
                  <Text as="i">
                    Population: {innerProps.resource.population}
                  </Text>
                  <Text as="i" textTransform="capitalize">
                    Terrain: {innerProps.resource.terrain}
                  </Text>
                </Stack>
              </Box>
            </GridItem>
            <GridItem>
              <HStack textColor="black">
                <Box>
                  <Text fontWeight="bold" as="u">
                    Characters
                  </Text>
                  {innerProps.resource.residents.length > 1 ? (
                    innerProps.resource.residents.map((r) => (
                      <ResourceFetcher
                        path={r}
                        type="people"
                        component={(rProps) => (
                          <Text>{rProps.resource.name}</Text>
                        )}
                      />
                    ))
                  ) : (
                    <Text>No residents on this planet</Text>
                  )}
                </Box>
                <Box m="1">
                  <Text fontWeight="bold" as="u">
                    Movies
                  </Text>
                  {innerProps.resource.films.length > 1 ? (
                    innerProps.resource.films.map((f) => (
                      <ResourceFetcher
                        path={f}
                        type="film"
                        component={(rProps) => (
                          <Text>{rProps.resource.title}</Text>
                        )}
                      />
                    ))
                  ) : (
                    <Text>No movies connected to this planet (API)</Text>
                  )}
                </Box>
              </HStack>
            </GridItem>
          </Grid>

          {/* <Stack textColor="white">
            <Text fontWeight="bold" as="u">
              General information
            </Text>
          </Stack>
          */}
        </Box>
      )}
    />
  );
});

interface PlanetRendererProps {
  resource?: Planet; //Possible undefined to allow to create planets without a resource
  moons?: DisplayPlanetMoonProps[];
  planetColor: string;
  textPositionY: number;
  textPositionX: number;
  diameter?: number;
}
//This is the component to render the planets.
export const PlanetRenderer = observer(function PlanetRenderer(
  props: PlanetRendererProps
) {
  const [toggleHover, setToggleHover] = useToggle(false);
  const planetScale = 0.001; //scale to adjust their size from the given data

  return (
    <motion.g>
      {toggleHover && (
        <motion.text
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          x={props.textPositionX}
          y={props.textPositionY}
          style={{ fill: "#e9ca6b", fontSize: "5" }}
        >
          {props.resource?.name}
        </motion.text>
      )}
      <motion.g>
        {props.resource ? (
          <motion.circle
            whileHover={{ scale: 1.1 }}
            animate={{
              transition: { duration: 5, loop: Infinity },
            }}
            initial={true}
            r={Number(props.resource?.diameter) * planetScale}
            stroke="#4cc7ff"
            style={{ strokeWidth: 0.6 }}
            fill={props.planetColor}
            key={"foo"}
            onMouseEnter={() => setToggleHover()}
            onMouseOut={() => setToggleHover()}
          />
        ) : (
          <motion.circle
            whileHover={{ scale: 1.1 }}
            animate={{
              transition: { duration: 5, loop: Infinity },
            }}
            initial={true}
            r={Number(props.diameter) * planetScale}
            stroke="#4cc7ff"
            style={{ strokeWidth: 0.6 }}
            fill={props.planetColor}
            key={"foo"}
            onMouseEnter={() => setToggleHover()}
            onMouseOut={() => setToggleHover()}
          />
        )}
      </motion.g>
      {props.moons?.map((moonProps) => {
        return <DisplayPlanetMoon key={moonProps.moon.name} {...moonProps} />;
      })}
    </motion.g>
  );
});

interface DisplayPlanetProps {
  path: string;
  moons?: DisplayPlanetMoonProps[];
  planetColor: string;
  textPositionX: number;
  textPositionY: number;
}
//This component uses the resource fetcher
// to display the planet with the PlanetRenderer component
export const DisplayPlanet = observer(function DisplayPlanet(
  props: DisplayPlanetProps
) {
  return (
    <ResourceFetcher
      type="planet"
      path={props.path}
      component={(innerProps) => (
        <PlanetRenderer
          textPositionX={props.textPositionX}
          textPositionY={props.textPositionY}
          planetColor={props.planetColor}
          moons={props.moons}
          {...innerProps}
        />
      )}
    />
  );
});

interface MoonInformation {
  diameter: number;
  name: string;
  moonColor: string;
}

interface DisplayPlanetMoonProps {
  moon: MoonInformation;
  initialPosX: number;
  initialPosY: number;
  rotationDur: number;
}
export const DisplayPlanetMoon = observer(function DisplayPlanetMoon(
  props: DisplayPlanetMoonProps
) {
  const [toggleHover, setToggleHover] = useToggle(false);
  const mValue = useMotionValue(0);
  const rotation = useTransform(mValue, [0, 360], [0, 360]);
  const reverseRotation = useTransform(rotation, [360, 0], [0, 360]);
  return (
    <motion.g
      transformTemplate={({ rotate, translateX }) => {
        return `rotate(${rotate}) translateX(${translateX})`;
      }}
      initial={{
        translateX: props.initialPosX,
        translateY: props.initialPosY,
      }}
      rotate={rotation}
      animate={{ rotate: 360, translateX: props.initialPosX }}
      transition={{
        duration: props.rotationDur,
        loop: Infinity,
        ease: "linear",
      }}
    >
      {toggleHover && (
        <motion.text
          transformTemplate={({ rotate, translateY }) => {
            return `rotate(${rotate}) translateY(${translateY})`;
          }}
          dominantBaseline="middle"
          initial={{ translateY: -10 }}
          style={{ fontSize: 5 }}
          textAnchor={"middle"}
          fill="#e9ca6b"
          rotate={reverseRotation}
        >
          {props.moon.name}
        </motion.text>
      )}
      <motion.circle
        whileHover={{ scale: 1.5 }}
        r={props.moon.diameter}
        fill={props.moon.moonColor}
        onMouseEnter={() => setToggleHover(true)}
        onMouseOut={() => setToggleHover(false)}
      />
    </motion.g>
  );
});
