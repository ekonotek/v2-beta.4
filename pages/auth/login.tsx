import { BlitzPage } from "@blitzjs/next"
import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"
import { useRouter } from "next/router"
import { Suspense } from "react"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Suspense fallback="Loading...">
      <Layout title="Log In">
        <LoginForm
          onSuccess={(_user) => {
            const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
            return router.push(next)
          }}
        />
      </Layout>
    </Suspense>
  )
}

export default LoginPage
