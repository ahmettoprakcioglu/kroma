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

.h1-Bold {
  font-size: 51px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
}
.h1-Regular {
  font-family: IBMPlexMono;
  font-size: 51px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
}
.h2-Regular {
  font-family: IBMPlexMono;
  font-size: 38px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
}
.h3-Regular {
  font-family: IBMPlexMono;
  font-size: 28px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
}
.h4-Regular {
  font-family: IBMPlexMono;
  font-size: 21px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
}
.body-Regular {
  font-family: IBMPlexMono;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
}
.info-Regular {
  font-family: IBMPlexMono;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
}
`;

export default GlobalStyles;
