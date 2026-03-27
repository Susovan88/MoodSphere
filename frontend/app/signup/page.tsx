"use client"

import Link from "next/link"
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"

import { Logo } from "@/components/logo"
import { useAuth } from "@/components/auth/auth-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignUpPage() {
  const router = useRouter()
  const { signup } = useAuth()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      password: String(formData.get("password") || ""),
    }
    console.log("Payload:", payload)

    try {
      await signup(payload)
      router.push("/dashboard")
    } catch (err) {
      console.error("Signup error:", err)
      setError(err instanceof Error ? err.message : "Signup failed")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="bg-background grid min-h-screen grid-rows-[auto_1fr] px-4">
      <div className="mx-auto w-full max-w-7xl border-b py-3">
        <Logo withLink className="w-fit" />
      </div>

      <div className="m-auto w-full max-w-md py-10">
        <div className="text-center">
          <h1 className="font-heading text-4xl font-medium text-foreground">Create an account</h1>
          <p className="text-muted-foreground mt-2 text-sm">Join MoodSphere to start tracking your mental wellness</p>
        </div>

        <Card className="mt-6 border border-border p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="signup-name">Full Name</Label>
              <Input id="signup-name" name="name" placeholder="John Doe" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-phone">Phone Number</Label>
              <Input id="signup-phone" name="phone" type="tel" placeholder="10-digit phone" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-email">Email Address</Label>
              <Input
                type="email"
                id="signup-email"
                name="email"
                placeholder="you@university.edu"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input type="password" id="signup-password" name="password" placeholder="••••••••" required />
            </div>

            <Button type="submit" disabled={submitting} className="h-11 w-full text-sm font-semibold">
              {submitting ? "Creating Account..." : "Create Account"}
            </Button>

            {error ? (
              <p className="text-center text-sm text-red-500">{error}</p>
            ) : null}

          </form>
        </Card>

        <p className="text-muted-foreground mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  )
}
