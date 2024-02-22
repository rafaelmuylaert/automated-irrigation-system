/** @jsxImportSource @emotion/react */
import { jsx } from "theme-ui";
import { useColorMode } from "theme-ui";

export default (props) => {
  const [mode, setMode] = useColorMode()
  return (
    <button
      className="toggler"
      onClick={(e) => {
        const next = mode === 'dark' ? 'light' : 'dark'
        setMode(next)
      }}
    >
      <div sx={{ color: "text" }}>
        {mode === "light" ?
          <img width="20px" src={require('../../../assets/moon.svg').default} alt="dark" /> :
          <img width="20px" src={require('../../../assets/sun.svg').default} alt="light" />
        }
      </div>
    </button>
  );
};

