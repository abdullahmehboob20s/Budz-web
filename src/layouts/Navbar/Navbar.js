import React from "react";
import styled from "styled-components";
import { Wrapper } from "styles/globalStyles";
import navbar_brand from "assets/images/navbar_brand.png";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import hamburger from "assets/images/hamburger.png";
import { GrFormClose } from "react-icons/gr";
import { useState } from "react";
import OutsideClickDetector from "hooks/OutsideClickDetector";

const NavbarWrapper = styled.div`
  background-color: #14396d;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  z-index: 100;
  display: flex;
  align-items: center;
`;

const NavbarBrand = styled.img`
  width: 150px;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Links = styled.div`
  display: flex;
  align-items: center;

  & > :not(:last-child) {
    margin-right: 2.5rem;
  }

  @media (max-width: 750px) {
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    height: 100%;
    background-color: white;
    flex-direction: column;
    justify-content: unset;
    align-items: unset;
    padding: 2rem;
    box-shadow: -5px 0 10px rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease;
    z-index: 105;
    transform: ${({ open }) =>
      open ? "translateX(0px)" : "translateX(300px)"};

    a {
      color: black !important;
      font-size: 18px;
      width: fit-content;
    }

    & > :not(:last-child) {
      margin-right: 0rem;
      margin-bottom: 1.7rem;
    }
  }
`;

const Hamburger = styled.img`
  width: 35px;
  cursor: pointer;
  display: none;

  @media (max-width: 750px) {
    display: block;
  }
`;

const CrossIcon = styled.button`
  cursor: pointer;
  display: none;
  color: black;
  width: fit-content;
  cursor: pointer;

  @media (max-width: 750px) {
    display: block;
  }
`;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = OutsideClickDetector(() => {
    setIsOpen(false);
  });

  return (
    <NavbarWrapper>
      <Wrapper>
        <Section>
          <Link to="/">
            <NavbarBrand src={navbar_brand} alt="" />
          </Link>

          <Links open={isOpen} ref={sidebarRef}>
            <CrossIcon onClick={() => setIsOpen(!isOpen)}>
              <GrFormClose size={35} />
            </CrossIcon>
            <ScrollLink
              smooth={true}
              delay={0.5}
              offset={-100}
              to="About"
              className="fs-16px pointer font-roboto-mono white weight-5"
              onClick={() => setIsOpen(false)}
            >
              About
            </ScrollLink>
            <ScrollLink
              smooth={true}
              delay={0.5}
              to="How-to-Get"
              className="fs-16px pointer font-roboto-mono white weight-5"
              onClick={() => setIsOpen(false)}
            >
              How to Get
            </ScrollLink>
            <ScrollLink
              smooth={true}
              delay={0.5}
              to="Elements"
              className="fs-16px pointer font-roboto-mono white weight-5"
              onClick={() => setIsOpen(false)}
            >
              Elements
            </ScrollLink>
            <ScrollLink
              smooth={true}
              delay={0.5}
              to="Learn-More"
              className="fs-16px pointer font-roboto-mono white weight-5"
              onClick={() => setIsOpen(false)}
            >
              Learn More
            </ScrollLink>
          </Links>

          <div className={`black-screen ${isOpen ? "show" : ""}`}></div>

          <Hamburger
            src={hamburger}
            onClick={() => setIsOpen(!isOpen)}
            alt=""
          />
        </Section>
      </Wrapper>
    </NavbarWrapper>
  );
}

export default Navbar;
