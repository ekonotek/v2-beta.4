import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { usePaginatedQuery } from "@blitzjs/rpc";
import { useRouter } from "next/router";
import Layout from "app/core/layouts/Layout";
import getImages from "app/images/queries/getImages";

const ITEMS_PER_PAGE = 100;

export const ImagesList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ images, hasMore }] = usePaginatedQuery(getImages, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <ul>
        {images.map((image) => (
          <li key={image.id}>
            <Link href={Routes.ShowImagePage({ imageId: image.id })}>
              <a>{image.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  );
};

const ImagesPage = () => {
  return (
    <Layout>
      <Head>
        <title>Images</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewImagePage()}>
            <a>Create Image</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ImagesList />
        </Suspense>
      </div>
    </Layout>
  );
};

export default ImagesPage;
