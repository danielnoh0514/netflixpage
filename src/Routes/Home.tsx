import { useQuery } from "@tanstack/react-query";
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
  height: 170vh;
  width: 100%;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  background-repeat: no-repeat;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5%;
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
  top: 35vh;
  font-size: 6vw;

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
  top: 50vh;
  font-size: 1rem;
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

function Home() {
  const { data, isLoading } = useQuery<IMovies>(["nowplaying", 1], getMovies);

  let maxText = false;
  const contextLength = data?.results[0].overview.length;
  if (contextLength !== undefined) {
    if (contextLength > 300) {
      maxText = true;
    } else {
      maxText = false;
    }
  }

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
              <Title>{data?.results[0].title}</Title>
              <Overview>
                {maxText
                  ? data?.results[0].overview.substring(0, 250) + "..."
                  : data?.results[0].overview}
              </Overview>
            </Banner>
          ) : (
            <NoImg>No Data Found</NoImg>
          )}
          <Span style={{ top: -5 }}>Now Playing</Span>
          <MovieList
            name={"nowplayingMovie"}
            sliderHeight={0}
            number={0}
            input={getMovies}
            value={0}
            key={0}
          />

          <Span style={{ top: 180 }}>Latest</Span>
          <MovieList
            name={"latest"}
            number={90}
            sliderHeight={90}
            input={getLastestMovies}
            value={1}
            key={1}
          />

          <Span style={{ top: 350 }}>Top Rated</Span>
          <MovieList
            sliderHeight={180}
            name={"toprated"}
            number={180}
            input={getUpcomingMovies}
            value={2}
            key={2}
          />
        </>
      )}
    </Wrapper>
  );
}

export default Home;
