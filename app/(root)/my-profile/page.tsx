import React from 'react'
import {Button} from '@/components/ui/button'
import { signOut } from '@/auth';
import { sampleBooks } from '@/constants';
import BookList from '@/components/BookList';
 
const page = () => {
  return (
    <>
    <form action={async() => {
        
        'use server';

        await signOut();
    }}> 
      <Button variant="outline">Logout</Button>
      </form>


      <BookList title="Books Borrowed" books={sampleBooks} />
    </>
  )
}

export default page
