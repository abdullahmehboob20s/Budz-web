import SideBySideSection from "components/SideBySideSection/SideBySideSection";
import Hero from "layouts/HomePage/Hero/Hero";
import React from "react";
import egg from "assets/images/egg.png";
import treasure from "assets/images/treasure.png";
import book from "assets/images/book.png";
import { Link } from "styles/globalStyles";
import Elements from "layouts/HomePage/Elements/Elements";
import Footer from "layouts/Footer/Footer";
import Navbar from "layouts/Navbar/Navbar";
import useMediaQuery from "hooks/useMediaQuery";

function HomePage() {
  const isBellow500px = useMediaQuery("(max-width : 500px)");

  return (
    <div>
      <Navbar />
      <Hero />
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
                Every Cool Pet hatches from an egg, then evolves into its final
                form with your help. Just like Cool Cats, every Cool Pet is
                unique!
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
                Items come from loot crates you can purchase from the Cool Cats
                Marketplace. You can purchase loot crates with $MILK.
              </h5>
              <h5 className="font-roboto-mono fs-24px weight-4 lh-1_4">
                You can earn $MILK by doing daily quests with your Cool Pet. If
                you’re a Cool Cat holder, you can also earn $MILK each day just
                by claiming it.
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
                on questing, the Cool Shop, the marketplace, and much more about
                how things work in the world of Cooltopia.
              </h5>
            </>
          }
        />
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
