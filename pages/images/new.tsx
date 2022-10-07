import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "app/core/layouts/Layout"
import createImage from "app/images/mutations/createImage"
import { ImageForm, FORM_ERROR } from "app/images/components/ImageForm"

const NewImagePage = () => {
  const router = useRouter()
  const [createImageMutation] = useMutation(createImage)

  return (
    <Layout title={"Create New Image"}>
      <h1>Create New Image</h1>

      <ImageForm
        submitText="Create Image"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateImage}
        initialValues={{ name: "", nameFile: "" }}
        onSubmit={async (values) => {
          try {
            const image = await createImageMutation(values)
            router.push(Routes.ShowImagePage({ imageId: image.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.ImagesPage()}>
          <a>Images</a>
        </Link>
      </p>
    </Layout>
  )
}

NewImagePage.authenticate = true

export default NewImagePage
