"use server";

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const defaultUserMetadata = {
  role: 'user',
  firstName: '',
  lastName: '',
  profilePhoto: '',
  bio: '',
  birthDate: '',
};

export async function signUp(formData) {
  const supabase = createServerComponentClient({ cookies });

  const { error } = await supabase.auth.signUp({
    email: formData.get('email'),
    password: formData.get('password'),
    options: {
      data: {
        ...defaultUserMetadata,
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
      },
    },
  });

  if (error) {
    console.error('Error signing up:', error);
    return { success: false, message: error.message };
  } else {
    return { success: true };
  }
}

export async function login(formData) {
  const supabase = createServerComponentClient({ cookies });

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (error) {
    console.error('Error logging in:', error);
    return { success: false, message: error.message };
  } else {
    return { success: true };
  }
}
