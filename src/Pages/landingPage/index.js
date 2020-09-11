import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  FirstSection,
  SecondSection,
  ThirdSection,
  FourthSection,
  FifthSection,
  Footer
} from "./sections";

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <FirstSection />
        <SecondSection />
        <ThirdSection />
        <FourthSection />
        <FifthSection />
        <Footer />
      </React.Fragment>
    );
  }
}
export default LandingPage;
