import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "redux/blockchain/blockchainActions";
import { fetchData } from "redux/data/dataActions";
import * as s from "styles/globalStyles";
import styled from "styled-components";
import i1 from "assets/images/zipzip.png";
import icon from "assets/images/logo.png";
import Stats from "layouts/Stats/Stats";
import useMediaQuery from "hooks/useMediaQuery";

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

function Hero() {
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
    <s.Screen
      style={{ backgroundColor: "var(--white)" }}
      minHeight={isBellow500px ? "fit-content" : "100vh"}
    >
      {blockchain.account === "" || blockchain.smartContract === null ? (
        <s.Container
          flex={isBellow500px ? 0 : 1}
          ai={"center"}
          jc={isBellow500px ? "unset" : "center"}
        >
          <LogoImg alt={"logo"} src={icon} />
          <s.SpacerSmall />
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
          <s.SpacerSmall />
          {blockchain.errorMsg !== "" ? (
            <s.TextDescription style={{ textAlign: "center" }}>
              {blockchain.errorMsg}
            </s.TextDescription>
          ) : null}
        </s.Container>
      ) : (
        <s.Container flex={1}>
          <s.Container style={{ minHeight: 80 }} jc={"center"} ai={"center"}>
            <s.TextTitle
              style={{ textAlign: "center", fontSize: 28, fontWeight: "bold" }}
            >
              Mint a CryptoBud
            </s.TextTitle>
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
          {/* <s.SpacerSmall /> */}

          <Stats totalSupply={data.totalSupply} cryptoCost={data.cost / 1e18} />
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
                <s.SpacerMedium />
                <s.Wrapper>
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
                </s.Wrapper>
                {isBellow500px ? (
                  <s.SpacerLarge />
                ) : (
                  <>
                    <s.SpacerLarge />
                    <s.SpacerLarge />
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
      )}
    </s.Screen>
  );
}

export default Hero;
