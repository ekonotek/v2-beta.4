// @ts-check
const { withBlitz } = require("@blitzjs/next")

/**
 * @type {import('@blitzjs/next').BlitzConfig}
 **/
const config = {
  images: {
    domains: ["artscouters.s3.amazonaws.com"], // hightlight-line
  },
}

module.exports = withBlitz(config)
