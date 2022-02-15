import React from "react";
import styled from "styled-components";
import { Wrapper } from "styles/globalStyles";

const Parent = styled.div`
  background-color: #7790da;
  width: 100%;
`;

const Section = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  position: relative;
  align-items: center;
  padding: 30px 0;

  &::before {
    content: "";
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 6px;
    height: 80%;
    background-color: #fff;
    display: block;

    @media (max-width: 900px) {
      width: 60%;
      height: 4px;
      right: unset;
      left: 50%;
      top: 52%;
      transform: translateY(-50%) translateX(-50%);
    }
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
`;

function Stats({ totalSupply, cryptoCost }) {
  return (
    <Parent>
      <Wrapper>
        <Section>
          <div>
            <h1 className="white fs-64px weight-7 font-poppins text-center mb-10px">
              {cryptoCost} Ξ
            </h1>
            <h3 className="fs-28px white opacity-0_5 text-center font-poppins weight-8 ">
              PER CryptoBud <br />
              <span className="fs-12px">(Excluding gas fee.)</span>
            </h3>
          </div>
          <div>
            <h1 className="white fs-64px weight-7 font-poppins text-center mb-10px">
              {totalSupply} / 10000
            </h1>
            <h3 className="fs-28px white opacity-0_5 text-center font-poppins weight-8">
              MINTED
            </h3>
          </div>
        </Section>
      </Wrapper>
    </Parent>
  );
}

export default Stats;
