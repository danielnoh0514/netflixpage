import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import {
  getLastestMovies,
  getMovies,
  getUpcomingMovies,
  IMovies,
} from "../api";
import { MovieList } from "../Components/MovieList";
import { imagePath } from "../utils";

const Span = styled.span`
  position: relative;
  color: white;
  font-size: 35px;
`;

const Wrapper = styled.div`
  height: 220vh;
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
  position: absolute;
  display: block;
  top: 480px;
  font-size: 40px;
  font-weight: 800;
`;

const Overview = styled.p`
  position: absolute;
  top: 550px;
  font-size: 13px;
  width: 50%;
  font-weight: 600;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Home() {
  const { data, isLoading } = useQuery<IMovies>(["nowplaying", 1], getMovies);

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
          <Span style={{ top: 0 }}>Now Playing</Span>
          <MovieList name={"nowplaying"} number={0} input={getMovies} key={0} />

          <Span style={{ top: 200 }}>Latest</Span>
          <MovieList
            name={"latest"}
            number={200}
            input={getLastestMovies}
            key={1}
          />

          <Span style={{ top: 400 }}>Top Rated</Span>
          <MovieList
            name={"toprated"}
            number={400}
            input={getUpcomingMovies}
            key={2}
          />
        </>
      )}
    </Wrapper>
  );
}

export default Home;
