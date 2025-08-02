import { FormState } from "@/libs/definitions";
import { generateUUID } from "@/libs/helper";
import { db, users } from "@/services/drizzle";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { createSession, deleteSession } from "@/libs/sessions";
import { redirect } from "next/navigation";
import { GoogleSigninPayload } from "@/types";


class AuthService {
  private static instance: AuthService;

  private constructor() { }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async signup(prev: FormState, formData: FormData): Promise<FormState> {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
      return {
        errors: {
          _form: ["Please fill all required fields"],
        },
      };
    }

    try {
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .get();
      if (existingUser) {
        return {
          errors: {
            email: ["Email already exists"],
          },
        };
      }

      const userId = generateUUID();

      await db.transaction(async (trx) => {
        await trx.insert(users).values({
          id: userId,
          email: email,
          name: name,
          password_hash: await bcrypt.hash(password, 10),
          created_at: new Date(),
          updated_at: new Date(),
        });
      });

      await createSession(userId);

      return {
        success: true,
      };
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.message.includes("unique constraint") ||
          error.message.includes("duplicate key")
        ) {
          return {
            errors: {
              email: ["This email is already registered"],
            },
          };
        }

        if (error.message.includes("password")) {
          return {
            errors: {
              password: ["Password processing failed"],
            },
          };
        }
      }

      return {
        errors: {
          _form: ["Failed to create account. Please try again."],
        },
      };
    }
  }

  async signin(prev: FormState, formData: FormData): Promise<FormState> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return {
        errors: {
          _form: ["Please provide both email and password"],
        },
      };
    }

    try {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .get();

      if (!user) {
        return {
          errors: {
            _form: ["User not found"],
          },
        };
      }

      const passwordMatch = await bcrypt.compare(password, user.password_hash);

      if (!passwordMatch) {
        return {
          errors: {
            _form: ["Invalid credentials"],
          },
        };
      }

      await createSession(user.id);
      return {
        success: true,
      };
    } catch (error) {
      return {
        errors: {
          _form: ["An error occurred during sign in. Please try again.", error instanceof Error ? error.message : "Unknown error"],
        },
      };
    }
  }

  async googleSignin(payload: GoogleSigninPayload): Promise<FormState> {
    const { email, name, uid, Avatar } = payload;
    try {
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .get();

      if (!existingUser) {
        await db.insert(users).values({
          id: uid,
          email,
          name: name,
          password_hash: uid,
          created_at: new Date(),
          updated_at: new Date(),
          avatar: Avatar,
        });
      }
      await createSession(uid);
      return {
        success: true,
      };
    } catch (error) {
      return {
        errors: {
          _form: ["An error occurred during Google sign-in. Please try again.", error instanceof Error ? error.message : "Unknown error"],
        },
      };
    }
  }

  async logout() {
    await deleteSession();
    redirect("/auth/login");
  }
}

export const authService = AuthService.getInstance();