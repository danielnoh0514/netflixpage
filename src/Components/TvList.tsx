import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IMovies } from "../api";
import { imagePath, latest } from "../utils";

const Slider = styled(motion.div)`
  position: relative;
  width: 100%;
`;

const Rows = styled(motion.div)`
  position: absolute;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  width: 252px;
  height: 150px;
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
  width: 200px;
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
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;

  width: 450px;
  height: 500px;
  border-radius: 20px;
  overflow: hidden;
  margin: 0 auto;
  right: 0;
  left: 0;
  background-color: #181818;
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 50%;
`;

const BigTitle = styled.h3`
  position: relative;
  top: -10%;
  margin-left: 5%;
  color: ${(props) => props.theme.white.lighter};
  font-size: 100%;
`;

const BigOverview = styled.p`
  position: relative;
  top: 1%;
  width: 80%;
  margin-left: 5%;
  font-size: 70%;
`;

const Button = styled(motion.button)`
  position: absolute;
  width: 50px;
  height: 100px;
  opacity: 0;
  background-color: red;
  border: 1px solid red;
`;

const btnVar = {
  start: { opacity: 0 },
  hover: { opacity: 1, backgroundColor: "rgba(0,0,0,0.5)" },
};

const Svg = styled(motion.svg)``;

const Span = styled.span`
  color: white;
  font-size: 40px;

  position: absolute;
  &.first {
    top: 530px;
  }
  &.second {
    top: 2000px;
    left: 0;
  }
`;

const BigDate = styled.div`
  position: absolute;
  bottom: 0;
  margin-left: 20px;
  margin-bottom: 10px;
`;

const BigRating = styled.span`
  position: absolute;
  bottom: 0;
  right: 0;
  margin-bottom: 10px;
  margin-right: 20px;
`;

interface INumber {
  number: number;
  input: any;
  key: number;
  name: string;
}

const Wrapper = styled.div`
  overflow: hidden;
`;

export function TvList({ name, number, input, key }: INumber) {
  const [slide, setSlide] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClick = (movieId: number) => {
    history.push(`/tv/${movieId}`);
  };

  const offset = 6;

  const overlayClick = () => history.push("/tv");
  const { scrollY } = useScroll();

  const history = useHistory();
  const { data, isLoading } = useQuery<IMovies>([name, key + ""], input);

  const movieMatch = useRouteMatch<{ movieId: string }>("/tv/:movieId");

  const movieClick =
    movieMatch?.params.movieId &&
    data?.results.find((movie) => movie.id + "" === movieMatch.params.movieId);
  const [back, setBack] = useState(false);

  const slideFunctionBack = () => {
    setBack(false);
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length;
      const totalIndex = Math.floor(totalMovies / offset);
      setSlide((prev) => (prev === 0 ? totalIndex : prev - 1));
    }
  };
  const slideFunctionFront = () => {
    setBack(true);
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length;
      const totalIndex = Math.floor(totalMovies / offset);
      setSlide((prev) => (prev === totalIndex ? 0 : prev + 1));
    }
  };

  return (
    <div>
      <Slider style={{ top: number }} className="first">
        <AnimatePresence
          custom={back}
          initial={false}
          onExitComplete={toggleLeaving}
        >
          <Rows
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
                  layoutId={movie.id + ""}
                  onClick={() => onBoxClick(movie.id)}
                  variants={boxVar}
                  whileHover={"hover"}
                  initial={"start"}
                  key={movie.id}
                  transition={{ type: "tween" }}
                  bgPhoto={imagePath(movie.backdrop_path || "")}
                >
                  <Info transition={{ type: "tween" }} variants={infoVar}>
                    {movie.title}
                  </Info>
                </Box>
              ))}
          </Rows>
        </AnimatePresence>
      </Slider>

      <AnimatePresence>
        <Button
          style={{ top: number + 750, left: 0 }}
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
        <Button
          style={{ top: number + 750, right: 0 }}
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

      <AnimatePresence>
        {movieMatch ? (
          <div style={{ width: 100 }}>
            <Overlay
              onClick={overlayClick}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <BigMovie
              layoutId={movieMatch.params.movieId}
              style={{
                top: scrollY.get() + 100,
              }}
            >
              {movieClick && (
                <>
                  <BigCover
                    style={{
                      backgroundImage: `linear-gradient(to top, black,transparent), url(${imagePath(
                        movieClick.backdrop_path
                      )}`,
                    }}
                  />
                  <BigTitle>{movieClick.title}</BigTitle>
                  <BigOverview>{movieClick.overview}</BigOverview>
                  <BigDate>{movieClick.release_date}</BigDate>
                  <BigRating>
                    Rating: {movieClick.vote_average.toFixed(1)}/10
                  </BigRating>
                </>
              )}
            </BigMovie>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
