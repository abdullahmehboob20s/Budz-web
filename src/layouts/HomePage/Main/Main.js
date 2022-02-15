import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "redux/blockchain/blockchainActions";
import { fetchData } from "redux/data/dataActions";
import * as s from "styles/globalStyles";
import styled from "styled-components";
import i1 from "assets/images/zipzip.png";
import factory from "assets/images/factory.png";
import icon from "assets/images/logo.png";
import Stats from "layouts/Stats/Stats";
import useMediaQuery from "hooks/useMediaQuery";
import egg from "assets/images/egg.png";
import treasure from "assets/images/treasure.png";
import book from "assets/images/book.png";
import { Link } from "styles/globalStyles";
import Elements from "layouts/HomePage/Elements/Elements";
import Footer from "layouts/Footer/Footer";
import SideBySideSection from "components/SideBySideSection/SideBySideSection";

export const StyledButton = styled.button`
  padding: 18px;
  border-radius: 0px;
  border: none;
  background-color: #12763a;
  padding: 10px;
  font-weight: bold;
  font-size: 24px;
  color: #fff;
  width: 160px;
  height: 80px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(0, 0, 0, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }

  @media (max-width: 500px) {
    font-size: 20px;
    height: auto;
    padding: 16px 10px;
  }
`;

export const StyledImg = styled.img`
  width: 1882px;
  height: 615px;
`;

export const LogoImg = styled.img`
  width: 500px;
  height: 500px;

  @media (max-width: 450px) {
    width: 100%;
    height: auto;
  }
`;

const ConnectWalletSection = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.2rem;
`;

function Main() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState("Maybe it's your lucky day.");
  const [claimingNft, setClaimingNft] = useState(false);
  const isBellow500px = useMediaQuery("(max-width : 500px)");

  const claimNFTs = (_amount) => {
    if (_amount <= 0) {
      return;
    }
    setFeedback("Minting your CryptoBudzzz...");
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(blockchain.account, _amount)
      .send({
        gasLimit: "285000",
        //to: "0x6020371b0e8a2fc259a6b111d178bba9c966a4a4",
        from: blockchain.account,
        value: blockchain.web3.utils.toWei(
          ((Number(data.cost) / 1e18) * _amount).toString(),
          "ether"
        ),
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          "WOW, you now own a CryptoBud. go visit OpenSea to view it."
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  useEffect(() => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  }, [blockchain.smartContract, dispatch]);

  return (
    <s.Screen style={{ backgroundColor: "var(--white)" }} minHeight={"100vh"}>
      {blockchain.account === "" || blockchain.smartContract === null ? (
        <s.Container
          flex={1}
          ai={"center"}
          jc={isBellow500px ? "center" : "flex-end"}
          image={factory}
          padding={isBellow500px ? "0 0 0 0" : "0 0 60px 0"}
        >
          {/* <LogoImg alt={"logo"} src={icon} /> */}
          {/* <s.SpacerSmall /> */}
          <ConnectWalletSection>
            <s.TextTitle style={{ textAlign: "center" }}>
              Mint a CryptoBudzzz
            </s.TextTitle>
            <s.SpacerSmall />
            <s.SpacerSmall />
            <s.TextDescription style={{ textAlign: "center" }}>
              Connect to the Ethereum network
            </s.TextDescription>
            <s.SpacerSmall />
            <StyledButton
              onClick={(e) => {
                e.preventDefault();
                dispatch(connect());
              }}
            >
              CONNECT
            </StyledButton>
          </ConnectWalletSection>
          <s.SpacerSmall />
          {blockchain.errorMsg !== "" ? (
            <s.TextDescription style={{ textAlign: "center" }}>
              {blockchain.errorMsg}
            </s.TextDescription>
          ) : null}
        </s.Container>
      ) : (
        <div style={{ marginTop: "80px" }}>
          <s.Container position="relative" flex={1}>
            <s.Container position="relative" padding="90px 0 0 0">
              <s.Container
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                }}
                jc={"space-between"}
                ai={"center"}
                padding="20px 0 50px 0"
              >
                <s.TextTitle
                  style={{
                    textAlign: "center",
                    fontSize: 28,
                    fontWeight: "bold",
                  }}
                >
                  Mint a CryptoBud
                </s.TextTitle>

                <s.Wrapper>
                  <div
                    style={{
                      background: "white",
                      width: "100%",
                      maxWidth: "fit-content",
                      margin: "0 auto",
                      padding: "1rem",
                    }}
                  >
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <StyledButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          claimNFTs(1);
                        }}
                      >
                        {claimingNft ? "BUSY" : "MINT 1"}
                      </StyledButton>
                      <s.SpacerSmall />

                      <StyledButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          claimNFTs(2);
                        }}
                      >
                        {claimingNft ? "BUSY CLAIMING" : "MINT 2"}
                      </StyledButton>

                      <s.SpacerSmall />

                      <StyledButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          claimNFTs(3);
                        }}
                      >
                        {claimingNft ? "BUSY CLAIMING" : "MINT 3"}
                      </StyledButton>
                    </s.Container>
                  </div>
                </s.Wrapper>
              </s.Container>
              <s.Container
                ai={"center"}
                jc={"center"}
                fd={"row"}
                style={{
                  flexWrap: "wrap",
                  overflow: "hidden",
                  maxHeight: "500px",
                  minHeight: "500px",
                }}
              >
                <StyledImg alt={"example"} src={i1} />
              </s.Container>
            </s.Container>

            {/* <s.SpacerSmall /> */}

            <Stats
              totalSupply={data.totalSupply}
              cryptoCost={data.cost / 1e18}
            />
            <s.SpacerMedium />

            <s.Container flex={1} ai={"center"} jc={"center"}>
              {/* <s.TextTitle
              style={{ textAlign: "center", fontSize: 35, fontWeight: "bold" }}
            >
              {data.totalSupply}/10000
            </s.TextTitle>
            <s.SpacerMedium /> */}

              {Number(data.totalSupply) == 10000 ? (
                <>
                  <s.TextTitle style={{ textAlign: "center" }}>
                    The sale has ended.
                  </s.TextTitle>
                  <s.SpacerSmall />
                  <s.TextDescription style={{ textAlign: "center" }}>
                    You can still find CryptoBudzzz on{" "}
                    <a
                      target={"_blank"}
                      href={
                        "https://testnets.opensea.io/collection/cryptobudz-v3"
                      }
                    >
                      Opensea.io
                    </a>
                  </s.TextDescription>
                </>
              ) : (
                <>
                  {/* <s.TextTitle style={{ textAlign: "center" }}>
                  1 CryptoBud costs {data.cost / 1e18} ETH.
                </s.TextTitle>
                <s.SpacerXSmall />
                <s.TextDescription style={{ textAlign: "center" }}>
                  Excluding gas fee.
                </s.TextDescription> */}
                  <s.TextDescription style={{ textAlign: "center" }}>
                    {feedback}
                  </s.TextDescription>
                  {/* <s.SpacerMedium /> */}
                  {/* <s.Wrapper>
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <StyledButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          claimNFTs(1);
                        }}
                      >
                        {claimingNft ? "BUSY" : "MINT 1"}
                      </StyledButton>
                      <s.SpacerSmall />

                      <StyledButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          claimNFTs(2);
                        }}
                      >
                        {claimingNft ? "BUSY CLAIMING" : "MINT 2"}
                      </StyledButton>

                      <s.SpacerSmall />

                      <StyledButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          claimNFTs(3);
                        }}
                      >
                        {claimingNft ? "BUSY CLAIMING" : "MINT 3"}
                      </StyledButton>
                    </s.Container>
                  </s.Wrapper> */}
                  {isBellow500px ? (
                    <s.SpacerLarge />
                  ) : (
                    <>
                      <s.SpacerLarge />
                      {/* <s.SpacerLarge /> */}
                    </>
                  )}
                  <s.Container
                    jc={"center"}
                    ai={"center"}
                    style={{ width: "70%" }}
                  >
                    <s.TextDescription
                      style={{ textAlign: "center", fontSize: 9 }}
                    >
                      Please make sure you are connected to the right network
                      (Ethereum Mainnet) and the correct address. Please note:
                      Once you make the purchase, you cannot undo this action.
                    </s.TextDescription>
                    <s.SpacerSmall />
                    <s.TextDescription
                      style={{ textAlign: "center", fontSize: 9 }}
                    >
                      We have set the gas limit to 285000 for the contract to
                      successfully mint your NFT. We recommend that you don't
                      change the gas limit.
                    </s.TextDescription>
                  </s.Container>
                  <s.SpacerSmall />
                </>
              )}
            </s.Container>
          </s.Container>

          <div id="About">
            <SideBySideSection
              sideImg={egg}
              imageTo="flex-end"
              content={
                <>
                  <h1 className="fs-40px font-poppins weight-7 mb-35px">
                    What is a Cool Pet?
                  </h1>

                  <h5 className="font-roboto-mono fs-24px weight-4 lh-1_4 mb-25px">
                    Every Cool Pet hatches from an egg, then evolves into its
                    final form with your help. Just like Cool Cats, every Cool
                    Pet is unique!
                  </h5>
                  <h5 className="font-roboto-mono fs-24px weight-4 lh-1_4">
                    The food and items you use to interact with your egg will
                    determine your creature’s look and element.
                  </h5>
                </>
              }
            />
          </div>
          <div id="How-to-Get">
            <SideBySideSection
              sideImg={treasure}
              wrapperPadding={isBellow500px ? `50px 0` : `150px 0`}
              background="#e5e5e5"
              reverse={true}
              imageTo="flex-start"
              content={
                <>
                  <h1 className="fs-40px font-poppins weight-7 mb-35px">
                    How Do I Get Items?
                  </h1>

                  <h5 className="font-roboto-mono fs-24px weight-4 lh-1_4 mb-25px">
                    Items come from loot crates you can purchase from the Cool
                    Cats Marketplace. You can purchase loot crates with $MILK.
                  </h5>
                  <h5 className="font-roboto-mono fs-24px weight-4 lh-1_4">
                    You can earn $MILK by doing daily quests with your Cool Pet.
                    If you’re a Cool Cat holder, you can also earn $MILK each
                    day just by claiming it.
                  </h5>
                </>
              }
            />
          </div>
          <div id="Elements">
            <Elements />
          </div>
          <div id="Learn-More">
            <SideBySideSection
              sideImg={book}
              wrapperPadding={isBellow500px ? `50px 0` : `150px 0`}
              background="#e5e5e5"
              imgWidth={isBellow500px ? "150px !important" : `45%`}
              imageTo="center"
              content={
                <>
                  <h1 className="fs-40px font-poppins weight-7 mb-35px">
                    Looking for More Info?
                  </h1>

                  <h5 className="font-roboto-mono fs-24px weight-4 lh-1_4 ">
                    Find details in our{" "}
                    <Link color="var(--link-blue)" href="#">
                      Cool Hub
                    </Link>{" "}
                    on questing, the Cool Shop, the marketplace, and much more
                    about how things work in the world of Cooltopia.
                  </h5>
                </>
              }
            />
          </div>

          <Footer />
        </div>
      )}
    </s.Screen>
  );
}

export default Main;
