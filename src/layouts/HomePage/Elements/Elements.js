import React from "react";
import { Wrapper } from "styles/globalStyles";
import element1 from "assets/images/element-1.png";
import element2 from "assets/images/element-2.png";
import element3 from "assets/images/element-3.png";
import element4 from "assets/images/element-4.png";
import styled from "styled-components";
import useMediaQuery from "hooks/useMediaQuery";

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 60px 80px;

  @media (max-width: 760px) {
    gap: 30px 10px;
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ElementCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  img {
    width: 100%;
  }
`;

const Card = ({ img, title, titleColor = "black" }) => {
  const isBellow500px = useMediaQuery("(max-width : 500px)");

  return (
    <ElementCard>
      <img src={img} className="mb-20px" alt="" />
      <h2
        className={`font-poppins ${
          isBellow500px ? "fs-26px" : "fs-36px"
        }  weight-7`}
        style={{ color: titleColor }}
      >
        {title}
      </h2>
    </ElementCard>
  );
};

function Elements() {
  const isBellow500px = useMediaQuery("(max-width : 500px)");

  return (
    <div>
      <Wrapper padding={isBellow500px ? "50px 0" : "150px 0"}>
        <h1
          className={`fs-40px weight-7 black text-center ${
            isBellow500px ? "mb-50px" : "mb-100px"
          } font-poppins lh-1_3`}
        >
          The Four Elements...For Now, At Least!
        </h1>

        <Cards>
          <Card img={element1} title="WATER" titleColor="#38c9f6" />
          <Card img={element2} title="GRASS" titleColor="#7fbf5e" />
          <Card img={element3} title="FIRE" titleColor="#fc7e0a" />
          <Card img={element4} title="AIR" titleColor="#a16bcc" />
        </Cards>
      </Wrapper>
    </div>
  );
}

export default Elements;
