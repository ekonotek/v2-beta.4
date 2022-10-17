import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "app/core/layouts/Layout"
import getTag from "app/tags/queries/getTag"
import updateTag from "app/tags/mutations/updateTag"
import { TagForm, FORM_ERROR } from "app/tags/components/TagForm"

export const EditTag = () => {
  const router = useRouter()
  const tagId = useParam("tagId", "string")
  const [tag, { setQueryData }] = useQuery(
    getTag,
    { id: tagId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateTagMutation] = useMutation(updateTag)

  return (
    <>
      <Head>
        <title>Edit Tag {tag.id}</title>
      </Head>

      <div>
        <h1>Edit Tag {tag.id}</h1>
        <pre>{JSON.stringify(tag, null, 2)}</pre>

        <TagForm
          submitText="Update Tag"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateTag}
          initialValues={tag}
          onSubmit={async (values) => {
            try {
              const updated = await updateTagMutation({
                id: tag.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowTagPage({ tagId: updated.id }))
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

const EditTagPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditTag />
      </Suspense>

      <p>
        <Link href={Routes.TagsPage()}>
          <a>Tags</a>
        </Link>
      </p>
    </div>
  )
}

EditTagPage.authenticate = true
EditTagPage.getLayout = (page) => (
  <Suspense fallback="Loading...">
    <Layout>{page}</Layout>
  </Suspense>
)

export default EditTagPage
