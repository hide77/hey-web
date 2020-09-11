import ReactMarkdown from "react-markdown";
import { STYLE_CONFIG } from "hey-config";
import styled from "styled-components";
const Markdown = styled(ReactMarkdown)`
  padding-bottom: 200px;
  & *:not(pre, code) {
    max-width: 760px;
    margin: auto;
    font-family: "IBM Plex Sans";
    font-size: 21px;
    line-height: 40px;
    word-break: break-word;
  }

  & h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #000;
    margin: 30px auto;
    font-size: 20px;
    line-height: 34px;
  }
  h1 {
    font-family: "IBM Plex Sans";
    font-weight: bold;
    font-size: 40px;
    line-height: 48px;
    letter-spacing: ${STYLE_CONFIG.letterSpace}px;
    text-transform: uppercase;
    margin-bottom: 30px;
    padding: 10px 0;
  }
  h2 {
    font-size: 32px;
    line-height: 40px;
  }
  h3 {
    font-size: 26px;
    line-height: 34px;
  }
  p {
    font-size: 21px;
    line-height: 38px;
    color: #5f686b;
  }
  img {
    max-width: 100%;
    display: block;
    margin: 30px auto;
  }
  blockquote {
    border-left: 4px solid #333;
    margin: 30px auto;
    padding: 0 30px;
  }
  ol,
  ul,
  li {
    color: #5f686b;
    font-size: 21px;
    line-height: 38px;
  }
  a {
    text-decoration: underline;
    color: #000;
  }
  code {
    border-radius: 4px;
    padding: 30px;
    font-size: 18px;
    line-height: 26px;
  }
`;

export default Markdown;
