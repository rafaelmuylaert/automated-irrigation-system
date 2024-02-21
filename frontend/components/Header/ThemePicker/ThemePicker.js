/** @jsxImportSource @emotion/react */
import { useColorMode } from "theme-ui";

const ThemePicker = () => {
  const [colorMode, setColorMode] = useColorMode();
  return (
    <button
      className="toggler"
      onClick={() => setColorMode(colorMode === "light" ? "dark" : "light")}
    >
      <div sx={{ color: "text" }}>
        {colorMode === "light" ?
          <img width="20px" src={require('../../../assets/moon.svg').default} alt="dark" /> :
          <img width="20px" src={require('../../../assets/sun.svg').default} alt="light" />
        }
      </div>
    </button>
  );
};

export default ThemePicker;
