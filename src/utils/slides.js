import bg1 from "../assets/bg1.png";
import bg2 from "../assets/bg2.png";
import bg3 from "../assets/bg3.png";


/* ------------------------- SLIDES DATA ------------------------- */
/* Each slide has EXACTLY 2 overlay shapes: one left, one right */
export const slides = [
  {
    title: "Don’t understand or can’t explain?",
    subtitle: "The Morago app will help, just choose your translator.",
    hero: bg1,
    shapes: [
      {
        side: "left",
        color: "#ff4b72", // pink on left
        size: "90px",
        top: "35%",
        offset: "-45px",
      },
      {
        side: "right",
        color: "#ffb600", // orange on right
        size: "90px",
        top: "45%",
        offset: "-45px",
      },
    ],
  },
  {
    title: "From hospital to realtor",
    subtitle: "Choose from various topics — from paediatrics to hospital.",
    hero: bg2,
    shapes: [
      {
        side: "left",
        color: "#ffb600", // big orange on left
        size: "110px",
        top: "45%",
        offset: "-55px",
      },
      {
        side: "right",
        color: "#ff4b72", // red on right
        size: "70px",
        top: "30%",
        offset: "-35px",
      },
    ],
  },
  {
    title: "First call on us",
    subtitle: "Call and pay only for the minutes you actually used.",
    hero: bg3,
    shapes: [
      {
        side: "left",
        color: "#ff4b72", // red on left
        size: "70px",
        top: "32%",
        offset: "-35px",
      },
      {
        side: "right",
        color: "#ffb600", // orange on right
        size: "90px",
        top: "52%",
        offset: "-45px",
      },
    ],
  },
];

