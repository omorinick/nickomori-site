'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const password = formData.get('password') as string

  if (password === process.env.VAULT_PASSWORD) {
    const cookieStore = await cookies()
    cookieStore.set('vault-auth', password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })
    redirect('/vault')
  }

  redirect('/vault/login?error=1')
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('vault-auth')
  redirect('/vault/login')
}
