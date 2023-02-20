import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { getLastestMovies, getMovies, IMovies } from "../api";
import Header from "../Components/Header";
import { MovieList } from "../Components/MovieList";
import { imagePath } from "../utils";

const Wrapper = styled.div`
  height: 200vh;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 80px;
  margin-bottom: 10px;
`;

const Overview = styled.p`
  font-size: 20px;
  width: 50%;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Rows = styled(motion.div)`
  position: absolute;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  width: 530px;
  height: 300px;
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
    scale: 1.3,
    y: -150,
    transition: {
      delay: 0.5,
      duration: 0.1,
    },
  },
};

const Info = styled(motion.div)`
  width: 530px;
  height: 30px;
  background-color: ${(props) => props.theme.black.lighter};
  bottom: 0;
  position: absolute;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  opacity: 0;
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
  width: 40vw;
  height: 80vh;
  border-radius: 20px;
  overflow: hidden;
  margin: 0 auto;
  right: 0;
  left: 0;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 700px;
`;

const BigTitle = styled.h3`
  position: relative;
  top: -110px;
  margin-left: 30px;
  color: ${(props) => props.theme.white.lighter};
  font-size: 80px;
`;

const BigOverview = styled.p`
  position: relative;
  top: -80px;
  width: 60%;
  margin-left: 30px;
`;

const Button = styled(motion.button)`
  position: absolute;
  width: 50px;
  height: 300px;
  top: 1650px;
  &.first {
    left: 0;
  }
  &.second {
    right: 0;
  }

  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.5);
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
    top: 1530px;
  }
  &.second {
    top: 2000px;
    left: 0;
  }
`;

function Home() {
  const [slide, setSlide] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClick = (movieId: number) => {
    history.push(`/movies/${movieId}`);
  };

  const offset = 6;

  const overlayClick = () => history.push("/");
  const { scrollY } = useScroll();

  const history = useHistory();
  const movieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");

  const { data, isLoading } = useQuery<IMovies>(
    ["movies", "nowPlaying"],
    getMovies
  );

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
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPhoto={imagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Span className="first">Now Playing</Span>
          <MovieList number={-10} input={getMovies} />

          <Span className="second">Latest</Span>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
