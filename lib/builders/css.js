import { readFileSync } from "fs"
import postcss from "postcss"
import postcssrc from "postcss-load-config"
import atImport from "postcss-import"
import presetEnv from "postcss-preset-env"

export default async (stylesheetPath) => {
  let css = readFileSync(stylesheetPath).toString()

  try {
    const { plugins, options } = await postcssrc()

    options.from = stylesheetPath

    const result = await postcss(plugins).process(css, options)
    return result.css
  } catch (err) {
    const result = await postcss([
      atImport(),
      presetEnv({
        features: {
          "custom-media-queries": true,
        },
        stage: 2,
      }),
    ]).process(css, { from: stylesheetPath })

    return result.css
  }
}
