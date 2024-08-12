import { createGlobalStyle } from 'styled-components';
const GlobalStyles = createGlobalStyle`

:root {
  --off-white: #fffffe;
  --off-white-two: #fffffb;
  --white: #d9d9d9;
  --black: #000;
  --light-sage: #fcfefb;
  --white-two: #f5f4f3;
  --greyish-brown: #585858;
  --warm-grey: #979493;
  --black-two: #242424;
  --greyish: #a7a7a7;
  --border-radius-sm: 2px;
  --border-radius-md: 4px;
  --border-radius-lg: 8px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  font-family: "IBM Plex Mono", monospace;
  background-color: var(--off-white-two);
  height: 100vh;
}
`;

export default GlobalStyles;
