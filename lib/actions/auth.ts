'use server';

import { signIn } from '@/auth';
import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import { hash } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import ratelimit from '../ratelimit';
import { redirect } from 'next/navigation';

const signInWithCredentials = async (
    params: Pick<AuthCredentials, "email" | "password">
,) => {

const { email, password } = params;
  const ip = ( (await headers()).get('x-forwarded-for')) || '127.0.0.1';
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return redirect("/too-fast")};


    try { 

const result = await signIn('credentials', {email, password, redirect: false});
    if (result?.error) {
        return { success: false, message: result.error };
    }
    return { success: true };
    }catch (error) {
        console.log(error, 'Signin error');
    }

};


const signUp = async (params: AuthCredentials) => {
  const { fullName, email, password, universityId, universityCard } = params;
  const ip = ( (await headers()).get('x-forwarded-for')) || '127.0.0.1';
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return redirect("/too-fast");
  }
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    throw new Error('User with this email already exists.');
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      fullName,
      email,
      universityCard,
      universityId,
      password: hashedPassword,
    });

    // Trigger welcome email workflow
    fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/workflows/onboarding`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }).catch(err => console.error('Failed to trigger welcome email:', err));

    await signInWithCredentials({ email, password });
    return { success: true, message: 'Signup successful' };
  } catch (error) {
    console.log(error, 'Signup error');
    return { success: false, message: 'Signup failed' };
  }
};

export { signUp, signInWithCredentials };