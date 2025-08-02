"use server";

import { FormState } from "@/libs/definitions";
import { authService } from "@/services/auth";
import { GoogleSigninPayload } from "@/types";

export async function signup(
  prev: FormState,
  formData: FormData
): Promise<FormState> {
  return await authService.signup(prev, formData);
}

export async function signin(
  prev: FormState,
  formData: FormData
): Promise<FormState> {
  return await authService.signin(prev, formData);
}

export async function googleSignin(
  payload: GoogleSigninPayload
): Promise<FormState> {
  return await authService.googleSignin(payload);
}

export async function logout() {
  return await authService.logout();
}
