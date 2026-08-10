'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { caseStudyCookieName, caseStudyPasswordEnvVar } from '@/lib/case-study-auth'

export async function login(slug: string, formData: FormData) {
  const password = formData.get('password') as string
  const expected = process.env[caseStudyPasswordEnvVar(slug)]

  if (expected && password === expected) {
    const cookieStore = await cookies()
    cookieStore.set(caseStudyCookieName(slug), password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })
    redirect(`/case-studies/${slug}`)
  }

  redirect(`/case-studies/${slug}/login?error=1`)
}

export async function logout(slug: string) {
  const cookieStore = await cookies()
  cookieStore.delete(caseStudyCookieName(slug))
  redirect(`/case-studies/${slug}/login`)
}
