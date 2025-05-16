import React, { Suspense } from 'react'
import { Error } from '../components/Error'

export default function ErrorPage() {
  return (
    <Suspense>
      <Error />
    </Suspense>
  )
}
