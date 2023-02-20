import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import {
  getAiringTv,
  getLastestMovies,
  getLatestTv,
  getMovies,
  getPopularTv,
  getTopRatedTv,
  getUpcomingMovies,
  IMovies,
  ITv,
} from "../api";
import { MovieList } from "../Components/MovieList";
import { TvList } from "../Components/TvList";
import { imagePath } from "../utils";

const Span = styled.span`
  color: white;
  font-size: 35px;
  position: relative;
`;

const Wrapper = styled.div`
  height: 260vh;
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

function Tv() {
  const { data, isLoading } = useQuery<ITv>(["latest", 0], getLatestTv);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPhoto={imagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].name}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Span style={{ top: 80 }}>Upcoming</Span>
          <TvList
            name={"nowplaying"}
            number={100}
            input={getLatestTv}
            key={0}
          />

          <div>
            <Span style={{ top: 380 }}>Latest</Span>
            <TvList name={"latest"} number={400} input={getAiringTv} key={1} />
          </div>

          <Span style={{ top: 680 }}>Popular</Span>
          <TvList name={"popular"} number={700} input={getPopularTv} key={2} />

          <Span style={{ top: 980 }}>Top Rated</Span>
          <TvList
            name={"toprated"}
            number={1000}
            input={getTopRatedTv}
            key={2}
          />
        </>
      )}
    </Wrapper>
  );
}

export default Tv;
