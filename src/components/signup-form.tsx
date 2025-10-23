import type { ApiError } from "@/api"
import { signup } from "@/api/auth"
import { Button } from "@/components/ui/button"
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
import { useAuth } from "@/context/AuthContext"
import { signupSchema, type SignupSchema } from "@/validations/SignupSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
  });
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const onSubmit = async (data: SignupSchema) => {
    try {
      const apiData = await signup({username:data.username, password:data.password, confirmpassword: data.confirmPassword})
      login(apiData.token)
      navigate('/upload');

    } catch (err) {
      const apiErr = err as ApiError;

      if (apiErr.field) {
        // Attach error to a specific field (e.g., email or password)
        setError(apiErr.field as keyof SignupSchema, {
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
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
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
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input 
                id="password" 
                type="password"
                {...register("password")}
              />
              {errors.password && (
                <FieldError>{errors.password.message}</FieldError>
              )}
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input 
                id="confirm-password" 
                type="password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <FieldError>{errors.confirmPassword.message}</FieldError>
              )}
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" disabled={isSubmitting} className="w-full text-black">
                  {isSubmitting ? "Logging in..." : "SignUp"}
                </Button>    
                {errors.root && (
                  <p className="text-red-500 text-center">{errors.root.message}</p>
                )}            
                {/* <Button variant="outline" type="button">
                  Sign up with Google
                </Button> */}
                <FieldDescription className="px-6 text-center">
                  Already have an account?

                  <Link
                    to="/login"
                    className="px-2 text-blue-600 underline underline-offset-4 hover:text-blue-800"
                  >
                    Sign in
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
