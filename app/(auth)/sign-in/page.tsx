"use client";
import AuthForm from '@/components/authForm'
import { signInWithCredentials } from '@/lib/actions/auth';
import { signInSchema } from '@/lib/validations'
import React from 'react'

const page = () => {
  return (
    <AuthForm 
    type= 'SIGN_IN' 
    schema={signInSchema} 
    defaultValues={{email:"", password:""}} 
    onSubmit={async (data) => {
      const result = await signInWithCredentials(data);
      if (!result) return { success: false, error: "Unknown error" };
      return {
        success: result.success,
        error: result.message ?? undefined,
      };
    }}   
    />
  )
}

export default page
