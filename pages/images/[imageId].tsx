import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "app/core/layouts/Layout"
import getImage from "app/images/queries/getImage"
import deleteImage from "app/images/mutations/deleteImage"

export const Image = () => {
  const router = useRouter()
  const imageId = useParam("imageId", "string")
  const [deleteImageMutation] = useMutation(deleteImage)
  const [image] = useQuery(getImage, { id: imageId })

  return (
    <>
      <Head>
        <title>Image {image.id}</title>
      </Head>

      <div>
        <h1>Image {image.id}</h1>
        <pre>{JSON.stringify(image, null, 2)}</pre>

        <Link href={Routes.EditImagePage({ imageId: image.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteImageMutation({ id: image.id })
              router.push(Routes.ImagesPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowImagePage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.ImagesPage()}>
          <a>Images</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Image />
      </Suspense>
    </div>
  )
}

ShowImagePage.authenticate = true
ShowImagePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowImagePage
