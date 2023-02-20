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
          <Span style={{ top: -5 }}>Upcoming</Span>
          <TvList
            sliderHeight={0}
            name={"nowplayingTv"}
            number={0}
            input={getLatestTv}
            value={0}
          />

          <Span style={{ top: 85 }}>Latest</Span>
          <TvList
            sliderHeight={90}
            name={"latestTv"}
            number={90}
            input={getAiringTv}
            value={1}
          />

          <Span style={{ top: 175 }}>Popular</Span>
          <TvList
            sliderHeight={180}
            name={"popular"}
            number={180}
            input={getPopularTv}
            value={2}
          />

          <Span style={{ top: 265 }}>Top Rated</Span>
          <TvList
            sliderHeight={270}
            name={"topratedTv"}
            number={270}
            input={getTopRatedTv}
            value={2}
          />
        </>
      )}
    </Wrapper>
  );
}

export default Tv;
