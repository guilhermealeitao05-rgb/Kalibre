import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
import { FONTE } from "./tokens";

// Inter variável (100–900), arquivo local em public/fonts.
loadFont({
  family: FONTE,
  url: staticFile("fonts/Inter.ttf"),
  weight: "100 900",
});
