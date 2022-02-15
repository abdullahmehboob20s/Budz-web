import React from "react";
import styled from "styled-components";
import { Wrapper } from "styles/globalStyles";
import {
  FaDiscord,
  FaTwitter,
  FaMediumM,
  FaShoppingCart,
} from "react-icons/fa";
import catFace from "assets/images/cat-face.png";
import { Link } from "react-router-dom";
import useMediaQuery from "hooks/useMediaQuery";

const Parent = styled.div`
  background-color: #39e27d;
`;

const Section = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 100px;
  align-items: center;
  margin-bottom: 1rem;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;

    img {
      display: block;
      margin: 0 auto;
      margin-bottom: 2rem;
    }
  }

  @media (max-width: 550px) {
    margin-bottom: 2rem;
  }
`;

const SocialLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > :not(:last-child) {
    margin-right: 3rem;
  }

  @media (max-width: 550px) {
    & > :not(:last-child) {
      margin-right: 2rem;
    }
  }
`;

const FooterLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;

  a:not(:last-child):after {
    margin-right: 6px;
    margin-left: 6px;
    content: "|";
  }

  @media (max-width: 550px) {
    flex-direction: column;

    a:not(:last-child):after {
      display: none;
    }

    & > a:not(:last-child) {
      margin-bottom: 0.6rem;
    }
  }
`;

function Footer() {
  const isBellow1000px = useMediaQuery("(max-width : 1000px)");

  return (
    <Parent>
      <Wrapper
        padding={isBellow1000px ? "60px 0" : `150px 0`}
        position="relative"
      >
        <Section>
          <img src={catFace} alt="" />
          <SocialLink>
            <a href="#" className="white pointer">
              <FaDiscord size={37} />
            </a>
            <a href="#" className="white pointer">
              <FaTwitter size={32} />
            </a>
            <a href="#" className="white pointer">
              <FaMediumM size={32} />
            </a>
            <a href="#" className="white pointer">
              <FaShoppingCart size={30} />
            </a>
          </SocialLink>
        </Section>

        <FooterLinks>
          <Link
            to="/term-and-conditions"
            className="white relative fs-16px weight-7 font-poppins pointer hover-underline"
          >
            Terms & Conditions
          </Link>
          <Link
            to="/privacy-policy"
            className="white relative fs-16px weight-7 font-poppins pointer hover-underline"
          >
            Privacy Policy
          </Link>
          <Link
            to="/competition-rules"
            className="white relative fs-16px weight-7 font-poppins pointer hover-underline"
          >
            Competition Rules
          </Link>
        </FooterLinks>

        <p className="fs-18px white font-roboto-mono text-center">
          © 2021 Cool Cats LLC
        </p>
      </Wrapper>
    </Parent>
  );
}

export default Footer;
