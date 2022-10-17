import { useRouter } from "next/router"
import Layout from "app/core/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"
import { BlitzPage, Routes } from "@blitzjs/next"
import { Suspense } from "react"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Suspense fallback="Loading...">
      <Layout title="Sign Up">
        <SignupForm onSuccess={() => router.push(Routes.Home())} />
      </Layout>
    </Suspense>
  )
}

export default SignupPage
