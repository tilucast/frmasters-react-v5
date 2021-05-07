/**@jsx jsx */
import { css, jsx, keyframes } from "@emotion/react";
import { Link } from "@reach/router";
import colors from "./colors";

const spin = keyframes`
    to{
        transform: rotate(360deg);
    }
`;

const Navbar = () => {
  return (
    <header
      css={css`
        background-color: ${colors.secondary};
        padding: 15px;
      `}
    >
      <Link to="/">Adopt Me!</Link>
      <span
        role="img"
        aria-label="Logo"
        css={css`
          font-size: 60px;
          display: inline-block;
          animation: 1.5s ${spin} linear infinite;
          &:hover {
            text-decoration: underline;
          }
        `}
      >
        🙀
      </span>
    </header>
  );
};

export default Navbar;
