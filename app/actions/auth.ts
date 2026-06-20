'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const ADMIN_ID = 'admin'
const ADMIN_PW = '1234'

type AuthState = { error: string } | null

export async function login(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const id = formData.get('id') as string
  const password = formData.get('password') as string

  if (id === ADMIN_ID && password === ADMIN_PW) {
    const cookieStore = await cookies()
    cookieStore.set('erp_auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 8,
      path: '/',
    })
    redirect('/woojinerp/notices')
  }

  return { error: '아이디 또는 비밀번호가 올바르지 않습니다.' }
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('erp_auth')
  redirect('/')
}
