import React from "react";
import * as s from "styles/globalStyles";
import styled from "styled-components";

const Parent = styled.div`
  background: ${({ background }) => background};
`;

const SectionLeft = styled.div`
  flex: 1;
  max-width: 510px;
  width: 100%;
`;
const SectionRight = styled.div`
  flex: 1;
  display: flex;
  justify-content: ${({ imageTo }) => imageTo};

  @media (max-width: 900px) {
    margin-bottom: 4rem;
    justify-content: center;

    img {
      width: 100%;
    }
  }
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: ${({ reverse }) => (reverse ? "row-reverse" : "row")};

  @media (max-width: 900px) {
    flex-direction: column-reverse;
  }
`;

const Image = styled.img`
  width: ${({ width }) => width};
`;

function SideBySideSection({
  background,
  wrapperPadding = "100px 0",
  content,
  sideImg,
  reverse = false,
  imgWidth = "85%",
  imageTo,
}) {
  return (
    <Parent background={background}>
      <s.Wrapper padding={wrapperPadding}>
        <Section reverse={reverse}>
          <SectionLeft>{content}</SectionLeft>
          <SectionRight imageTo={imageTo}>
            <Image src={sideImg} width={imgWidth} alt="" />
          </SectionRight>
        </Section>
      </s.Wrapper>
    </Parent>
  );
}

export default SideBySideSection;
