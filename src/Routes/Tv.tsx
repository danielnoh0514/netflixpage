import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import {
  getAiringTv,
  getLatestTv,
  getPopularTv,
  getTopRatedTv,
  ITv,
} from "../api";
import { TvList } from "../Components/TvList";
import { imagePath } from "../utils";

const Span = styled.span`
  color: white;
  font-size: 35px;
  position: relative;
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
  top: 50vh;
  font-size: 100px;
  font-weight: 800;
`;

const Overview = styled.p`
  position: absolute;
  top: 57vh;
  font-size: 25px;
  width: 30vw;
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

          <Span style={{ top: 250 }}>Latest</Span>
          <TvList
            sliderHeight={130}
            name={"latestTv"}
            number={130}
            input={getAiringTv}
            value={1}
          />

          <Span style={{ top: 500 }}>Popular</Span>
          <TvList
            sliderHeight={260}
            name={"popular"}
            number={260}
            input={getPopularTv}
            value={2}
          />

          <Span style={{ top: 750 }}>Top Rated</Span>
          <TvList
            sliderHeight={390}
            name={"topratedTv"}
            number={390}
            input={getTopRatedTv}
            value={2}
          />
        </>
      )}
    </Wrapper>
  );
}

export default Tv;
