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
  top: 55vh;

  font-size: 3.2vw;
  font-weight: 800;
`;

const Overview = styled.p`
  position: absolute;
  top: 73vh;
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
          />

          <Span style={{ top: 180 }}>Latest</Span>
          <MovieList
            name={"latest"}
            number={90}
            sliderHeight={90}
            input={getLastestMovies}
            value={1}
          />

          <Span style={{ top: 350 }}>Top Rated</Span>
          <MovieList
            sliderHeight={180}
            name={"toprated"}
            number={180}
            input={getUpcomingMovies}
            value={2}
          />
        </>
      )}
    </Wrapper>
  );
}

export default Home;
