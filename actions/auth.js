"use server"

import { createClient } from "@/app/api/supabase/server";

const defaultUserMetadata = {
    role: "user",
    firstName: "",
    lastName: "",
    profilePhoto: "",
    bio: "",
    birthDate: ""
}

export async function signOut(){
    console.log("buraya geldi");
    const supabase = createClient();
    const { error } = await supabase.auth.signOut()

}

export async function signUp(formData){

    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp(
        {
            email: formData.get("email"),
            password: formData.get("password"),
            options: {
                data: {
                    ...defaultUserMetadata,
                    firstName: formData.get("firstName"),
                    lastName: formData.get("lastName")
                }
            }
        }
    )
}
