"use client";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { loginSchema, type LoginSchema } from "@/validations/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { login as loginApi } from "@/api/auth";
import type { ApiError } from "@/api";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginSchema) => {

    try {
      const apiData = await loginApi({username: data.username, password: data.password})
      login(apiData.token)
      navigate('/songs');

    } catch (err) {
      const apiErr = err as ApiError;

      if (apiErr.field) {
        // Attach error to a specific field (e.g., email or password)
        setError(apiErr.field as keyof LoginSchema, {
          type: "server",
          message: apiErr.message,
        });
      } else {
        // Global error
        setError("root", {
          type: "server",
          message: apiErr.message,
        });
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("username")}
                />
                {errors.username && (
                  <FieldError>{errors.username.message}</FieldError>
                )}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password"  
                  {...register("password")}
                />
                {errors.password && (
                  <FieldError>{errors.password.message}</FieldError>
                )}
              </Field>
              <Field>
                <Button type="submit" disabled={isSubmitting} className="w-full text-black">
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>    
                {errors.root && (
                  <p className="text-red-500 text-center">{errors.root.message}</p>
                )}            
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? 
                  <Link
                    to="/signup"
                    className="px-2 text-blue-600 underline underline-offset-4 hover:text-blue-800"
                  >
                    Signup
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
