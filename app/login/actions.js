'use server';

import { createClient } from '../../utils/supabase/server';

export async function login(formData) {
  const supabase = createClient();

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { success: false, message: error.message }; 
  }

  return { success: true, redirectTo: '/' };  
}

export async function signup(formData) {
  const supabase = createClient();

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return { success: false, message: error.message };  // Hata durumunda
  }

  return { success: true, redirectTo: '/' };  // Başarılı kayıt
}
