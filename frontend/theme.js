import type { Theme } from 'theme-ui'
export const theme: Theme = {
  config: {
    initialColorModeName: 'dark',
  },
  colors: {
    text: "white",
    background: "#161A30",
    backgroundSecondary: "#262F4D",
    muted: "#fff",
    modes: {
      light: {
        text: "#262F4D",
        background: "white",
        backgroundSecondary: "white",
        muted: "#444"
      },
      dark: {
        text: "white",
        background: "#161A30",
        backgroundSecondary: "#262F4D",
        muted: "#fff"
      }
    }
  }
};