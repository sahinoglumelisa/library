'use client';
import React from 'react';
import { FieldValues, Path, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, DefaultValues, UseFormReturn } from 'react-hook-form';
import { ZodType } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from './ui/input';
import Link from 'next/link';
import { FIELD_NAMES, FIELD_TYPES } from '@/constants';
import ImageUpload from './imageUpload';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  type: 'SIGN_IN' | 'SIGN_UP';
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
}

const authForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const router = useRouter();
  const isSignIn = type === 'SIGN_IN';
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);
    if (result.success) {
      toast.success(
        isSignIn ? 'Signed in successfully!' : 'Account created successfully!'
      );
      router.push('/');
    }
    else {
      toast.error(result.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? 'Welcome back to BookWise' : 'Create your account'}
      </h1>
      <p className="text-light-100">
        {isSignIn
          ? 'Enter your credentials to access your account'
          : 'Fill in the details to create your account'}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 w-full"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === 'universityCard' ? (
                      <ImageUpload onFileChange={field.onChange} />
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        {...field}
                        className="form-input"
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="submit" className="form-btn">
            Submit
          </Button>
        </form>
      </Form>{' '}
      <p className="text-center text-base font-medium">
        <Link
          href={isSignIn ? '/sign-up' : '/sign-in'}
          className="font-bold text-primary"
        >
          {isSignIn ? "Don't have an account? " : 'Already have an account? '}
        </Link>
      </p>
    </div>
  );
};

export default authForm;
