import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "app/core/layouts/Layout"
import getTag from "app/tags/queries/getTag"
import deleteTag from "app/tags/mutations/deleteTag"

export const Tag = () => {
  const router = useRouter()
  const tagId = useParam("tagId", "string")
  const [deleteTagMutation] = useMutation(deleteTag)
  const [tag] = useQuery(getTag, { id: tagId })

  return (
    <>
      <Head>
        <title>Tag {tag.id}</title>
      </Head>

      <div>
        <h1>Tag {tag.id}</h1>
        <pre>{JSON.stringify(tag, null, 2)}</pre>

        <Link href={Routes.EditTagPage({ tagId: tag.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteTagMutation({ id: tag.id })
              router.push(Routes.TagsPage())
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

const ShowTagPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.TagsPage()}>
          <a>Tags</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Tag />
      </Suspense>
    </div>
  )
}

ShowTagPage.authenticate = true
ShowTagPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowTagPage
