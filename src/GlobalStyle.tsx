import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyle = createGlobalStyle`
  ${normalize}
  * {
  margin: 0;
  font-family: 'Noto Sans KR', sans-serif;
  box-sizing: border-box;
}

html {
  font-family: 'Noto Sans KR', sans-serif;
}

body {
  font-family: 'Noto Sans KR', sans-serif;
}

h1 {
  margin: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
select,
textarea {
  background-color: transparent;
  border: 0;

  &:focus {
    outline: none;
    box-shadow: none;
  }
}

button:focus,
input:focus,
select:focus,
textarea:focus {
  outline: none;
  box-shadow: none;
}

//* input type search 설정시 나오는 X 버튼 제거
input::-webkit-search-decoration,
input::-webkit-search-cancel-button,
input::-webkit-search-results-button,
input::-webkit-search-results-decoration{
    display:none;
}
`;

export default GlobalStyle;
