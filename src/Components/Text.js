import styled from "styled-components";

const Text = styled.div`
  & {
    font-family: "Dosis", sans-serif;
    font-size: ${props => props.fontSize};
    line-height: ${props => `calc(${props.fontSize} / 1.2 * 1.3)`};
    font-weight: ${props => props.fontWeight};
    color: ${props =>
      props.active ? "#50aff0 !important" : `${props.color} !important`};
    padding: 5px 0px;
    word-break: break-word;
  }

  @media only screen and (max-width: 648px) {
    & {
      font-size: ${props => `calc(${props.fontSize} / 1.2)`};
      line-height: ${props => `calc(${props.fontSize} / 1.2 * 1.3)`};
    }
  }

  @media only screen and (max-width: 476px) {
    & {
      font-size: ${props => `calc(${props.fontSize} / 1.5)`};
      line-height: ${props => `calc(${props.fontSize} / 1.2 * 1.3)`};
    }
  }
`;

Text.defaultProps = {
  // color: "#7b7b7b",
  fontSize: "22px",
  fontWeight: "500",
  active: false
};

export default Text;
