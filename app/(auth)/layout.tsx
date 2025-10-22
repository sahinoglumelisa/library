import React from 'react';
import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

const layout = async ({ children }: { children: ReactNode }) => {

const seesion = await auth();
if (seesion) {
  redirect('/')};


  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box">
          <div className="flex flex-row gap-3">
            <img src="/icons/logo.svg" alt="logo" width={37} height={37} />
            <h1 className="text-2xl font-semibold text-white"> BookWise </h1>
          </div>

          {children}
        </div>
      </section>

        <section className="auth-illustration">
<img src='/images/auth-illustration.png' alt='auth illustration' width={1000} height={1000} className='size-full object-cover' />


                   </section>



    </main>
  );
};

export default layout;
