import { useState } from "react";
import { auth } from "@/services/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { googleSignin } from "@/actions/auth";
import { GoogleSigninPayload } from "@/types";

export function useGoogleAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string[]>([]);

  const googleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      const payload = {
        email: user.email,
        name: user.displayName,
        uid: user.uid,
        Avatar:
          user.photoURL ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa6YvRump6DC1zR3Bu5fz9358Gcgviuu5nag&s",
      };

      await googleSignin(payload as GoogleSigninPayload);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError([error.message]);
      } else {
        setError(["An unknown error occurred"]);
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, googleLogin };
}
