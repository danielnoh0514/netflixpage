import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { IMovies } from "../api";
import { imagePath } from "../utils";

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Rows = styled(motion.div)`
  position: absolute;
  width: 100vw;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
`;
const slideVar = {
  start: (custom: boolean) => ({
    x: custom ? window.innerWidth : -window.innerWidth,
  }),
  visible: { x: 1 },
  exit: (custom: boolean) => ({
    x: custom ? -window.innerWidth : window.innerWidth,
  }),
};

const Box = styled(motion.div)<{ bgPhoto: string }>`
  height: 18vh;
  background-color: white;
  color: red;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  cursor: pointer;
  background-position: center center;
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

const Wrapper = styled.div`
  margin-top: 40vh;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40%;
  height: 90%;
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
  height: 37%;
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
  top: -55vh;
  width: 12vw;
  right: -22vw;
  font-size: 1vw;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const Slider = styled(motion.div)`
  position: relative;
`;

const Button = styled(motion.button)`
  position: absolute;
  width: 50px;
  height: 18vh;
  top: 40vh;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.5);

  &:first-child {
    left: 0;
  }
  &:last-child {
    right: 0;
  }
`;

const btnVar = {
  start: { opacity: 0, backgroundColor: "rgba(0,0,0,0.5)" },
  hover: { opacity: 1, backgroundColor: "rgba(0,0,0,0.5)" },
};

const Svg = styled(motion.svg)``;

const BigRating = styled.span`
  position: relative;
  top: -57vh;
  left: 17vw;
  font-weight: 600;
  font-size: 1vw;
`;

const BigPoster = styled.div<{ bgPhoto: string }>`
  position: relative;
  width: 20vw;
  height: 70%;
  top: -8vh;
  right: -1vw;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
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

const BigDate = styled.span`
  position: relative;
  top: -60vh;
  left: 22vw;

  font-weight: 600;
  font-size: 1vw;
`;

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

function Search() {
  const history = useHistory();
  const location = useLocation();
  const search = new URLSearchParams(location.search).get("keyword");
  const overlayClick = (movieId: string) => history.push(`/search`);
  const onBoxClick = (movieId: number) => {
    history.push(`/search/${movieId}`);
  };
  function searchInfo() {
    return fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=d20eea6a9e7e472eef44a70d5027d38d&language=en-US&query=${search}`
    ).then((response) => response.json());
  }
  const { data, isLoading } = useQuery<IMovies>(["result"], searchInfo);

  const { scrollY } = useScroll();

  const movieMatch = useRouteMatch<{ id: string }>("/search/:id");
  const movieClick =
    movieMatch?.params.id &&
    data?.results.find((movie) => movie.id + "" === movieMatch.params.id);

  const [slide, setSlide] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const offset = 6;
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
          <Slider>
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
                  .slice(offset * slide, offset * slide + offset)
                  .map((movie) =>
                    movie.backdrop_path ? (
                      <Box
                        layoutId={movie.id + ""}
                        onClick={() => onBoxClick(movie.id)}
                        variants={boxVar}
                        whileHover={"hover"}
                        initial={"start"}
                        key={movie.id}
                        transition={{ type: "tween" }}
                        bgPhoto={imagePath(movie.backdrop_path)}
                      >
                        <Info transition={{ type: "tween" }} variants={infoVar}>
                          {movie.title}
                        </Info>
                      </Box>
                    ) : null
                  )}
              </Rows>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            <Button
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
              <>
                <Overlay
                  onClick={() => overlayClick(movieMatch.params.id)}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigMovie
                  layoutId={movieMatch.params.id}
                  style={{
                    top: scrollY.get() + 50,
                  }}
                >
                  {movieClick && (
                    <>
                      {" "}
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black,transparent), url(${imagePath(
                            movieClick.backdrop_path
                          )}`,
                        }}
                      />{" "}
                      <BigTitle>{movieClick.title}</BigTitle>
                      <BigPoster
                        bgPhoto={imagePath(movieClick.poster_path) || ""}
                      ></BigPoster>
                      <BigDate>
                        {movieClick.first_air_date || movieClick.release_date}
                      </BigDate>
                      <BigRating>
                        Rating:
                        {"⭐️".repeat(Math.floor(movieClick.vote_average / 2))}
                      </BigRating>
                      <BigOverview>
                        {movieClick.overview.length > 250
                          ? movieClick.overview.substring(0, 250) + "..."
                          : movieClick.overview}
                      </BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Search;
