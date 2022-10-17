import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "app/core/layouts/Layout"
import getImage from "app/images/queries/getImage"
import updateImage from "app/images/mutations/updateImage"
import { ImageForm, FORM_ERROR } from "app/images/components/ImageForm"

export const EditImage = () => {
  const router = useRouter()
  const imageId = useParam("imageId", "string")
  const [image, { setQueryData }] = useQuery(
    getImage,
    { id: imageId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateImageMutation] = useMutation(updateImage)

  return (
    <>
      <Head>
        <title>Edit Image {image.id}</title>
      </Head>

      <div>
        <h1>Edit Image {image.id}</h1>
        <pre>{JSON.stringify(image, null, 2)}</pre>

        <ImageForm
          submitText="Update Image"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateImage}
          initialValues={image}
          onSubmit={async (values) => {
            try {
              const updated = await updateImageMutation({
                id: image.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowImagePage({ imageId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditImagePage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditImage />
      </Suspense>

      <p>
        <Link href={Routes.ImagesPage()}>
          <a>Images</a>
        </Link>
      </p>
    </div>
  )
}

EditImagePage.authenticate = true
EditImagePage.getLayout = (page) => (
  <Suspense fallback="Loading...">
    <Layout>{page}</Layout>
  </Suspense>
)

export default EditImagePage
