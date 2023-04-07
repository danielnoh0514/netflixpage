import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import {
  getAiringTv,
  getLatestTv,
  getPopularTv,
  getTopRatedTv,
  ITv,
  randTv,
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
  @media (max-width: 1300px) {
    height: 90vh;
    font-size: 1vw;
    background-size: cover;
  }

  @media (max-width: 1250px) {
    height: 80vh;
  }

  @media (max-width: 1150px) {
    height: 70vh;
  }

  @media (max-width: 1000px) {
    height: 60vh;
  }

  @media (max-width: 950px) {
    height: 50vh;
  }

  @media (max-width: 800px) {
    height: 40vh;
  }

  @media (max-width: 530px) {
    height: 30vh;
  }

  @media (max-width: 400px) {
    height: 20vh;
  }
`;
const Title = styled.h2`
  position: absolute;
  display: block;
  top: 55vh;

  font-size: 3.2vw;
  font-weight: 800;
  @media (max-width: 1300px) {
    font-size: 5vw;
  }

  @media (max-width: 1250px) {
    font-size: 5vw;
  }

  @media (max-width: 1150px) {
    font-size: 5vw;
    top: 25vh;
  }

  @media (max-width: 1000px) {
    font-size: 5vw;
    top: 25vh;
  }

  @media (max-width: 950px) {
    font-size: 5vw;
    top: 25vh;
  }

  @media (max-width: 800px) {
    font-size: 5vw;
    top: 15vh;
  }

  @media (max-width: 530px) {
    font-size: 5vw;
    top: 10vh;
  }

  @media (max-width: 400px) {
    font-size: 5vw;
    top: 8vh;
  }
`;

const Overview = styled.p`
  position: absolute;
  top: 73vh;
  font-size: 25px;
  width: 30vw;
  font-weight: 600;
  @media (max-width: 1300px) {
    font-size: 1.3vw;
    top: 50vh;
  }

  @media (max-width: 1250px) {
    font-size: 1.3vw;
    top: 50vh;
  }

  @media (max-width: 1150px) {
    font-size: 1.3vw;
    top: 40vh;
  }

  @media (max-width: 1000px) {
    font-size: 1.3vw;
    top: 40vh;
  }

  @media (max-width: 950px) {
    font-size: 1.3vw;
    top: 35vh;
  }

  @media (max-width: 800px) {
    font-size: 1.5vw;
    top: 23vh;
  }

  @media (max-width: 530px) {
    font-size: 1.5vw;
    top: 15vh;
  }

  @media (max-width: 400px) {
    font-size: 1.5vw;
    top: 12vh;
  }
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoImg = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-size: cover;
  font-size: 10vw;
`;

function Tv() {
  const { data, isLoading } = useQuery<ITv>(["latest", 0], getLatestTv);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {data?.results[0].backdrop_path ? (
            <Banner
              bgPhoto={imagePath(
                data?.results[0]?.backdrop_path || "No Image Found"
              )}
            >
              <Title>{data?.results[0].name}</Title>
              <Overview>
                {data?.results[0].overview.length > 250
                  ? data?.results[0].overview.substring(0, 250) + "..."
                  : data?.results[0].overview}
              </Overview>
            </Banner>
          ) : (
            <NoImg>No Data Found</NoImg>
          )}

          <Span style={{ top: -5 }}>Upcoming</Span>
          <TvList
            sliderHeight={0}
            name={"nowplayingTv"}
            number={0}
            input={getLatestTv}
            value={0}
            key={0}
          />

          <Span style={{ top: 250 }}>Latest</Span>
          <TvList
            sliderHeight={130}
            name={"latestTv"}
            number={130}
            input={getAiringTv}
            value={1}
            key={1}
          />

          <Span style={{ top: 500 }}>Popular</Span>
          <TvList
            sliderHeight={260}
            name={"popular"}
            number={260}
            input={getPopularTv}
            value={2}
            key={2}
          />

          <Span style={{ top: 750 }}>Top Rated</Span>
          <TvList
            sliderHeight={390}
            name={"topratedTv"}
            number={390}
            input={getTopRatedTv}
            value={2}
            key={3}
          />
        </>
      )}
    </Wrapper>
  );
}

export default Tv;
