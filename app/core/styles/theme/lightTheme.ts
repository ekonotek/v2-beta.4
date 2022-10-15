import { createTheme, responsiveFontSizes } from "@mui/material"

// colors
const primary = "#D1552F"
const secondary = "#F17445"
const black = "#343a40"
const darkBlack = "rgb(36, 40, 44)"
const background = "#fff"
const warningLight = "rgba(253, 200, 69, .3)"
const warningMain = "rgba(253, 200, 69, .5)"
const warningDark = "rgba(253, 200, 69, .7)"
const inherit = "#FF9B36"
// const white = "#FFFFFF"
// const gray = "#4F4947"

// border
const borderWidth = 2
const borderColor = "rgba(0, 0, 0, 0.13)"

// breakpoints
const xl = 1920
const lg = 1280
const md = 960
const sm = 600
const xs = 0

// spacing
const spacing = 8

const lightTheme = createTheme({
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
    info: {
      main: inherit,
    },
    common: {
      black,
    },
    // neutral: {
    //   main: white,
    // },
    // gray: {
    //   main: gray,
    // },
    warning: {
      light: warningLight,
      main: warningMain,
      dark: warningDark,
    },
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
    background: {
      default: background,
    },
  },
  // Box: {
  //   padding: 0,
  //   margin: 0,
  // },
  // breakpoints: {
  //   // Define custom breakpoint values.
  //   // These will apply to Material-UI components that use responsive
  //   // breakpoints, such as `Grid` and `Hidden`. You can also use the
  //   // theme breakpoint functions `up`, `down`, and `between` to create
  //   // media queries for these breakpoints
  //   values: {
  //     xl,
  //     lg,
  //     md,
  //     sm: 1068,
  //     xs: 0,
  //   },
  // },
  // border: {
  //   borderColor: borderColor,
  //   borderWidth: borderWidth,
  // },
  // overrides: {
  //   MuiExpansionPanel: {
  //     root: {
  //       position: "static",
  //     },
  //   },
  //   MuiTableCell: {
  //     root: {
  //       paddingLeft: spacing * 2,
  //       paddingRight: spacing * 2,
  //       borderBottom: `${borderWidth}px solid ${borderColor}`,
  //       [`@media (max-width:  ${sm}px)`]: {
  //         paddingLeft: spacing,
  //         paddingRight: spacing,
  //       },
  //     },
  //   },
  //   MuiDivider: {
  //     root: {
  //       backgroundColor: borderColor,
  //       height: borderWidth,
  //     },
  //   },
  //   // MuiPrivateNotchedOutline: {
  //   //   root: {
  //   //     borderWidth: borderWidth,
  //   //   },
  //   // },
  //   MuiListItem: {
  //     divider: {
  //       borderBottom: `${borderWidth}px solid ${borderColor}`,
  //     },
  //   },
  //   MuiDialog: {
  //     paper: {
  //       width: "100%",
  //       maxWidth: 430,
  //       marginLeft: spacing,
  //       marginRight: spacing,
  //     },
  //   },
  //   MuiTooltip: {
  //     tooltip: {
  //       backgroundColor: darkBlack,
  //     },
  //   },
  //   MuiExpansionPanelDetails: {
  //     root: {
  //       [`@media (max-width:  ${sm}px)`]: {
  //         paddingLeft: spacing,
  //         paddingRight: spacing,
  //       },
  //     },
  //   },
  // },
  typography: {
    // useNextVariants: true,
    fontFamily: "Roboto Slab",
    h1: {
      fontSize: "32px",
    },
    h2: {
      fontSize: "30px",
    },
    h3: {
      fontSize: "26px",
    },
    h4: {
      fontSize: "24px",
    },
    h5: {
      fontSize: "22px",
    },
    h6: {
      fontSize: "20px",
    },
    body1: {
      fontSize: "16px",
    },
  },
})

export default responsiveFontSizes(lightTheme)
