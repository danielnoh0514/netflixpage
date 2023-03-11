import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IMovies, ITv } from "../api";
import { imagePath, latest } from "../utils";

const Slider = styled(motion.div)`
  position: relative;
  width: 100vw;
  height: 10vh;
`;

const Rows = styled(motion.div)`
  position: absolute;
  width: 100vw;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  height: 18vh;
  background-color: white;
  color: red;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  cursor: pointer;
  background-position: center center;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const boxVar = {
  start: { scale: 1 },
  hover: {
    scale: 1.2,
    y: -50,
    transition: {
      delay: 0.5,
      duration: 0.1,
    },
  },
};

const Info = styled(motion.div)`
  width: 16.7vw;
  height: 5px;
  background-color: ${(props) => props.theme.black.lighter};
  bottom: 0;
  position: absolute;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  opacity: 0;
  font-size: 10px;
`;

const infoVar = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.1,
    },
  },
};

const slideVar = {
  start: (custom: boolean) => ({
    x: custom ? window.innerWidth : -window.innerWidth,
  }),
  visible: { x: 1 },
  exit: (custom: boolean) => ({
    x: custom ? -window.innerWidth : window.innerWidth,
  }),
};

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  opacity: 0;

  background-color: rgba(0, 0, 0, 0.5);
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 90vh;
  border-radius: 30px;
  overflow: hidden;
  margin: 0 auto;
  right: 0;
  left: 0;
  background-color: #181818;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const BigCover = styled.div`
  position: relative;
  width: 40vw;
  height: 35vh;
  background-size: cover;
  background-position: center center;
`;

const BigTitle = styled.h3`
  position: relative;
  top: -10vh;
  margin-left: 2vw;
  color: ${(props) => props.theme.white.lighter};
  font-size: 2vw;
`;

const BigOverview = styled.p`
  position: relative;
  top: -40vh;
  width: 12vw;
  right: -22vw;
`;

const Button = styled(motion.button)`
  position: absolute;
  z-index: 1;
  width: 50px;
  height: 18vh;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.5);
`;

const btnVar = {
  start: { opacity: 0 },
  hover: { opacity: 1, backgroundColor: "rgba(0,0,0,0.5)" },
};

const Svg = styled(motion.svg)``;

const BigDate = styled.span`
  position: relative;
  top: -52vh;
  left: 22vw;

  font-weight: 600;
  font-size: 1vw;
`;

const BigRating = styled.span`
  position: relative;
  top: -46vh;
  left: 16.9vw;
  font-weight: 600;
  font-size: 1vw;
`;

interface INumber {
  number: number;
  input: any;
  value: number;
  name: string;
  sliderHeight: number;
}

const BigPoster = styled.div<{ bgPhoto: string }>`
  position: relative;
  width: 20vw;
  height: 50vh;
  top: -8vh;
  right: -1vw;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
`;

export function TvList({ name, number, input, value, sliderHeight }: INumber) {
  const [slide, setSlide] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const history = useHistory();
  const onBoxClick = (movieId: number) => {
    history.push(`/tv/${movieId}`);
  };

  const offset = 6;

  const overlayClick = () => history.push("/tv");
  const { scrollY } = useScroll();

  const { data } = useQuery<ITv>([name, value + ""], input);

  const movieMatch = useRouteMatch<{ movieId: string }>("/tv/:movieId");

  const movieClick =
    movieMatch?.params.movieId &&
    data?.results.find((movie) => movie.id === +movieMatch.params.movieId);

  const [back, setBack] = useState(false);

  const slideFunctionBack = () => {
    setBack(false);
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length;
      const totalIndex = Math.floor(totalMovies / offset) - 1;
      setSlide((prev) => (prev === 0 ? totalIndex : prev - 1));
    }
  };
  const slideFunctionFront = () => {
    setBack(true);
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length;
      const totalIndex = Math.floor(totalMovies / offset) - 1;
      setSlide((prev) => (prev === totalIndex ? 0 : prev + 1));
    }
  };

  return (
    <div>
      <Slider style={{ top: sliderHeight }} className="first">
        <AnimatePresence>
          <Button
            style={{ top: number, left: 0 }}
            className={"first"}
            variants={btnVar}
            whileHover={"hover"}
            onClick={() => slideFunctionBack()}
          >
            <Svg
              fill={"white"}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
            </Svg>
          </Button>
        </AnimatePresence>
        <AnimatePresence
          custom={back}
          initial={false}
          onExitComplete={toggleLeaving}
        >
          <Rows
            style={{ top: number }}
            custom={back}
            key={slide}
            variants={slideVar}
            initial={"start"}
            animate={"visible"}
            transition={{ type: "linear", duration: 1 }}
            exit={"exit"}
          >
            {data?.results
              .slice(1)
              .slice(offset * slide, offset * slide + offset)
              .map((movie) => (
                <Box
                  layoutId={name + movie.id + ""}
                  onClick={() => onBoxClick(movie.id)}
                  variants={boxVar}
                  whileHover={"hover"}
                  initial={"start"}
                  key={movie.id + number}
                  transition={{ type: "tween" }}
                  bgPhoto={imagePath(movie.backdrop_path || "")}
                >
                  <Info transition={{ type: "tween" }} variants={infoVar}>
                    {movie.name}
                  </Info>
                </Box>
              ))}
          </Rows>
          <AnimatePresence>
            <Button
              style={{ top: number, right: 0 }}
              className="btn1"
              variants={btnVar}
              whileHover={"hover"}
              onClick={() => slideFunctionFront()}
            >
              <Svg
                fill={"white"}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
              </Svg>
            </Button>
          </AnimatePresence>
        </AnimatePresence>
      </Slider>

      <AnimatePresence>
        {movieMatch ? (
          <>
            <Overlay
              onClick={overlayClick}
              animate={{ opacity: 1, scale: 1 }}
            />

            {movieClick ? (
              <>
                <BigMovie
                  layoutId={movieMatch?.params.movieId}
                  initial={{ scale: 0 }}
                  animate={{ opacity: 1, scale: 1, zIndex: 5000 }}
                  exit={{ scale: 0 }}
                  style={{
                    top: scrollY.get() + 100,
                  }}
                >
                  <BigCover
                    style={{
                      backgroundImage: `linear-gradient(to top, black,transparent), url(${imagePath(
                        movieClick.backdrop_path
                      )}`,
                    }}
                  />
                  <BigTitle>{movieClick.name}</BigTitle>
                  <BigPoster
                    bgPhoto={imagePath(movieClick.poster_path) || ""}
                  ></BigPoster>
                  <BigDate>{movieClick.first_air_date}</BigDate>
                  <BigRating>
                    Rating:
                    {"⭐️".repeat(Math.floor(movieClick.vote_average / 2))}
                  </BigRating>
                  <BigOverview>
                    {movieClick.overview.length > 250
                      ? movieClick.overview.substring(0, 250) + "..."
                      : movieClick.overview}
                  </BigOverview>
                </BigMovie>
              </>
            ) : null}
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
