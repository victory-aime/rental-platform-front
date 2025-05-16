import React, { Suspense } from 'react'
import { SignOut } from '../components/SignOut'

export default function SignOutPage() {
  return (
    <Suspense fallback={null}>
      <SignOut />
    </Suspense>
  )
}
