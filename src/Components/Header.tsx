import { motion, useAnimation, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";

const Nav = styled(motion.div)`
  width: 100%;
  height: 7vh;
  position: fixed;
  z-index: 1;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 3% 6%;
  padding-right: 9%;

  top: 0;
`;

const Col = styled.div`
  height: 100%;

  display: flex;
  align-items: center;
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
  width: 70%;
`;

const Item = styled.li`
  margin-left: 30px;
  font-size: auto;
  color: white;
  position: relative;
`;

const Logo = styled(motion.svg)`
  margin-right: 3%;
  width: 100px;
  fill: ${(props) => props.theme.red};
`;

const svgVar = {
  start: { scale: 1 },
  end: {
    scale: [1, 1.1, 1],
    transition: {
      repeat: Infinity,
      duration: 1.3,
    },
  },
};

const Circle = styled(motion.div)`
  width: 5px;
  height: 5px;
  border-radius: 2.5px;
  position: absolute;
  background-color: ${(props) => props.theme.red};
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: -10px;
`;

const Search = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  color: white;
  svg {
    height: 25px;
  }
`;

const Input = styled(motion.input)`
  position: absolute;
  top: -17px;
  left: -7rem;
  padding: 0.3rem 5%;
  padding-right: 8%;
  transform-origin: right center;
  border: 1px solid white;
  color: white;
  text-align: center;
`;

const navVar = {
  start: { backgroundColor: "rgba(0,0,0,1)" },
  end: { backgroundColor: "rgba(0,0,0,0)" },
};

interface IForm {
  keyword: string;
}

function Header() {
  const navAnimation = useAnimation();
  const { scrollY, scrollYProgress } = useScroll();
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 150) {
        navAnimation.start("start");
      } else navAnimation.start("end");
    });
  }, [scrollY]);

  const [searchOpen, setSearchOpen] = useState(false);
  const inputAnimation = useAnimation();
  const onClick = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({
        scaleX: 1,
      });
    }
    setSearchOpen((prev) => !prev);
  };

  const homeMatch = useRouteMatch("/");
  const tvMatch = useRouteMatch("/tv");

  const history = useHistory();
  const { register, handleSubmit } = useForm<IForm>();

  const onSubmit = ({ keyword }: IForm) => {
    history.push(`/search?keyword=${keyword}`);
    window.location.reload();
  };

  return (
    <Nav variants={navVar} animate={navAnimation}>
      <Col>
        <Logo
          variants={svgVar}
          initial={"start"}
          whileHover={"end"}
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="276.742"
          viewBox="0 0 1024 276.742"
        >
          <path
            d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z"
            fill="#d81f26"
          />
        </Logo>
        <Items>
          <Item>
            <Link to={"/"}>
              홈 {homeMatch?.isExact ? <Circle layoutId={"circle"} /> : null}
            </Link>
          </Item>
          <Item>
            <Link to={"/tv"}>
              시리즈 {tvMatch ? <Circle layoutId={"circle"} /> : null}
            </Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search onSubmit={handleSubmit(onSubmit)}>
          <motion.svg
            onClick={onClick}
            style={{ position: "absolute", zIndex: 1, y: "-0.3vh" }}
            transition={{ type: "linear", duration: 0.25 }}
            animate={{ x: searchOpen ? -109 : 0 }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>

          <Input
            {...register("keyword", { required: true })}
            initial={{ scaleX: 0 }}
            animate={inputAnimation}
            style={{ backgroundColor: "black" }}
            transition={{ type: "linear" }}
            placeholder="제목, 사람, 장르"
          />
        </Search>
      </Col>
    </Nav>
  );
}

export default Header;
