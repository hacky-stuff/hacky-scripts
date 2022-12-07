import { styles } from "https://deno.land/x/ansi_styles@1.0.1/mod.ts";

const wrap = (colorStyle: any) => (s: string) => `${colorStyle.open}${s}${colorStyle.close}`

export default ({
  blue: wrap(styles.blueBright),
  red: wrap(styles.redBright),
  yellow: wrap(styles.yellowBright),
  green: wrap(styles.greenBright),
})
