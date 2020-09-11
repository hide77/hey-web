import styled from "styled-components";

const FlexInline = styled.div`
  display: flex;
  align-items: ${props =>
    props.top ? "flex-start" : props.bottom ? "flex-end" : "center"};
  flex-wrap: wrap;
`;

FlexInline.defaultProps = {
  top: false,
  bottom: false
};

export default FlexInline;
