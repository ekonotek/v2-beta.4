import { resolver } from "@blitzjs/rpc"
// import { ImageTypes } from ".prisma/client"
// import db from "../../../db"
import { z } from "zod"
import aws from "aws-sdk"

const UploadImage = z.object({
  fileName: z.string(),
  fileType: z.string(),
})

const s3Bucket = process.env.S3_BUCKET

export default resolver.pipe(
  resolver.zod(UploadImage),
  resolver.authorize(),
  // async (input, elfile) => {
  //   // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  //   const image = await db.image.create({ data: input })
  //   // const image = {}
  //   console.log(input)
  //   return image
  // }
  async ({ fileName, fileType }) => {
    // AWS_ACCESS_KEY_ID
    // AWS_SECRET_ACCESS_KEY
    const s3 = new aws.S3({
      signatureVersion: "v4",
      region: "us-east-1",
    })

    const s3Params = {
      Bucket: s3Bucket,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: "public-read",
    }

    const signedRequest = await s3.getSignedUrl("putObject", s3Params)

    const url = `https://${s3Bucket}.s3.amazonaws.com/${fileName}`
    return {
      signedRequest,
      url,
    }
  }
)
