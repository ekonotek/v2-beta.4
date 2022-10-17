import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "app/core/layouts/Layout"
import createImage from "app/images/mutations/createImage"
import { ImageForm, FORM_ERROR } from "app/images/components/ImageForm"
import { CreateImageComponent } from "app/core/components/common/CreateImageComponent"
import { Suspense } from "react"

const NewImagePage = () => {
  const router = useRouter()
  const [createImageMutation] = useMutation(createImage)

  return (
    <Suspense fallback="Loading...">
      <Layout title={"Create New Image"}>
        <CreateImageComponent />

        <p>
          <Link href={Routes.ImagesPage()}>
            <a>Images</a>
          </Link>
        </p>
      </Layout>
    </Suspense>
  )
}

NewImagePage.authenticate = true

export default NewImagePage
