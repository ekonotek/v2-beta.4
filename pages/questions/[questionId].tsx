import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "app/core/layouts/Layout"
import getQuestion from "app/questions/queries/getQuestion"
import deleteQuestion from "app/questions/mutations/deleteQuestion"
import updateChoice from "app/choices/mutations/updateChoice"

export const Question = () => {
  const router = useRouter()
  const questionId = useParam("questionId", "string")
  const [deleteQuestionMutation] = useMutation(deleteQuestion)
  const [question, { refetch }] = useQuery(getQuestion, { id: questionId })
  const [updateChoiceMutation] = useMutation(updateChoice)

  const handleVote = async (id: string) => {
    try {
      await updateChoiceMutation({ id })
      refetch()
    } catch (error) {
      alert("Error updating choice " + JSON.stringify(error, null, 2))
    }
  }
  return (
    <>
      <Head>
        {/* <title>Question {question.id}</title> */}
        <title>{question.text}</title>
      </Head>

      <div>
        <h1>{question.text}</h1>
        {/* <pre>{JSON.stringify(question, null, 2)}</pre> */}
        <ul>
          {question.Choice.map((choice) => (
            <li key={choice.id}>
              {choice.text} - {choice.votes} votes
              {/* <button>Vote</button> */}
              <button onClick={() => handleVote(choice.id)}>Vote</button>
            </li>
          ))}
        </ul>
        <Link href={Routes.EditQuestionPage({ questionId: question.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteQuestionMutation({ id: question.id })
              router.push(Routes.QuestionsPage())
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

const ShowQuestionPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.QuestionsPage()}>
          <a>Questions</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Question />
      </Suspense>
    </div>
  )
}

ShowQuestionPage.authenticate = true
ShowQuestionPage.getLayout = (page) => (
  <Suspense fallback="Loading...">
    <Layout>{page}</Layout>
  </Suspense>
)

export default ShowQuestionPage
