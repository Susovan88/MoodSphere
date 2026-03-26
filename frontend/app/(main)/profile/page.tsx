"use client"

import { useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import {
  Activity,
  Building2,
  CalendarClock,
  GraduationCap,
  Mail,
  Phone,
  ShieldAlert,
  Sparkles,
  UserRound,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAuth } from "@/components/auth/auth-context"

type ProfileView = {
  basicInfo: {
    name: string
    email: string
    phone: string
    age: string
    gender: string
    profileImage: string
  }
  academicInfo: {
    university: string
    rollNumber: string
    className: string
    section: string
  }
  mentalHealth: {
    currentMood: string
    moodScore: number
    riskLevel: "low" | "medium" | "high"
  }
  stats: {
    totalSessions: number
    lastActive: string
  }
  contacts: {
    parent: string
    mentor: string
  }
  moodHistory: Array<{ label: string; score: number }>
}

export default function ProfilePage() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login")
    }
  }, [loading, user, router])

  const profile = useMemo<ProfileView>(() => ({
    basicInfo: {
      name: user?.name || "Student",
      email: user?.email || "Not available",
      phone: user?.phone || "Not available",
      age: "Not added",
      gender: "Not added",
      profileImage: "",
    },
    academicInfo: {
      university: "Not added",
      rollNumber: "Not added",
      className: "Not added",
      section: "Not added",
    },
    mentalHealth: {
      currentMood: "Reflective",
      moodScore: 67,
      riskLevel: "medium",
    },
    stats: {
      totalSessions: 28,
      lastActive: "Today",
    },
    contacts: {
      parent: "Not added",
      mentor: "Not added",
    },
    moodHistory: [
      { label: "Mon", score: 60 },
      { label: "Tue", score: 64 },
      { label: "Wed", score: 58 },
      { label: "Thu", score: 66 },
      { label: "Fri", score: 71 },
      { label: "Sat", score: 69 },
      { label: "Sun", score: 67 },
    ],
  }), [user])

  if (loading || !user) {
    return (
      <main className="grid min-h-screen place-items-center bg-background px-4">
        <p className="text-sm text-muted-foreground">Loading profile...</p>
      </main>
    )
  }

  const initials = profile.basicInfo.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "U"

  const avgMood = Math.round(
    profile.moodHistory.reduce((sum, point) => sum + point.score, 0) / profile.moodHistory.length
  )
  const moodDelta = profile.moodHistory[profile.moodHistory.length - 1].score - profile.moodHistory[0].score
  const peak = profile.moodHistory.reduce(
    (best, point) => (point.score > best.score ? point : best),
    profile.moodHistory[0]
  )

  return (
    <main className="min-h-screen bg-linear-to-b from-white to-orange-50/25 px-4 py-7 md:px-6 md:py-9">
      <div className="mx-auto grid w-full max-w-6xl gap-4 lg:grid-cols-[310px_1fr]">
        <aside className="space-y-4 lg:sticky lg:top-4 lg:self-start">
          <Card className="border-orange-100/70 bg-white/95 shadow-sm">
            <CardContent className="px-5 py-6">
              <div className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-2xl bg-linear-to-br from-orange-400 to-orange-600 text-2xl font-semibold text-white shadow-sm">
                {initials}
              </div>
              <h2 className="text-center font-heading text-xl font-semibold text-foreground">{profile.basicInfo.name}</h2>
              <p className="mt-1 text-center text-xs text-muted-foreground">{profile.basicInfo.email}</p>

              <div className="mt-4 flex items-center justify-center gap-2">
                <Badge variant="outline" className="border-orange-200 bg-orange-50 text-orange-700">Student profile</Badge>
                <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">Verified</Badge>
              </div>

              <div className="mt-5 rounded-xl border border-border/70 bg-background/80 p-3">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Quick snapshot</p>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2 text-foreground"><Activity className="size-3.5 text-orange-500" />Mood score: {profile.mentalHealth.moodScore}</p>
                  <p className="flex items-center gap-2 text-foreground"><ShieldAlert className="size-3.5 text-orange-500" />Risk: {profile.mentalHealth.riskLevel}</p>
                  <p className="flex items-center gap-2 text-foreground"><CalendarClock className="size-3.5 text-orange-500" />Last active: {profile.stats.lastActive}</p>
                </div>
              </div>

              <Button className="mt-4 w-full">Edit profile</Button>
            </CardContent>
          </Card>

          <Card className="border-orange-100/70 bg-white/95 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Mood history</CardTitle>
              <CardDescription>Last 7 checkpoints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border border-orange-100/70 bg-linear-to-b from-orange-50/40 to-white p-3.5">
                <div className="mb-3 flex items-center justify-between text-xs">
                  <span className="font-medium text-muted-foreground">7-day average</span>
                  <span className="font-semibold text-foreground">{avgMood}/100</span>
                </div>

                <div className="relative rounded-xl border border-orange-100/80 bg-white/85 px-2 pb-2 pt-6">
                  <div className="pointer-events-none absolute inset-x-2 top-6 grid grid-rows-3 gap-7">
                    <div className="border-t border-dashed border-orange-100" />
                    <div className="border-t border-dashed border-orange-100" />
                    <div className="border-t border-dashed border-orange-100" />
                  </div>

                  <div className="relative z-10 grid grid-cols-7 items-end gap-2">
                    {profile.moodHistory.map((point) => (
                      <div key={point.label} className="flex flex-col items-center gap-1.5">
                        <span className="text-[10px] font-semibold text-neutral-500">{point.score}</span>
                        <div className="flex h-28 w-7 items-end rounded-full border border-orange-100 bg-orange-50/70 p-0.5">
                          <div
                            className="w-full rounded-full bg-linear-to-t from-orange-500 to-amber-300"
                            style={{ height: `${Math.max(12, point.score)}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-muted-foreground">{point.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Peak: {peak.label} ({peak.score})</span>
                  <span className={moodDelta >= 0 ? "font-semibold text-emerald-600" : "font-semibold text-red-500"}>
                    {moodDelta >= 0 ? "+" : ""}{moodDelta} this week
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        <section className="space-y-4">
          <Card className="border-orange-100/70 bg-white/95 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <UserRound className="size-4 text-orange-500" />
                Basic info
              </CardTitle>
              <CardDescription>Name and personal details</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              <InfoCell label="Name" value={profile.basicInfo.name} icon={<UserRound className="size-3.5 text-orange-500" />} />
              <InfoCell label="Email" value={profile.basicInfo.email} icon={<Mail className="size-3.5 text-orange-500" />} />
              <InfoCell label="Phone" value={profile.basicInfo.phone} icon={<Phone className="size-3.5 text-orange-500" />} />
              <InfoCell label="Age" value={profile.basicInfo.age} />
              <InfoCell label="Gender" value={profile.basicInfo.gender} />
              <InfoCell label="Profile image" value={profile.basicInfo.profileImage || "Not added"} />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-orange-100/70 bg-white/95 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <GraduationCap className="size-4 text-orange-500" />
                  Academic info
                </CardTitle>
                <CardDescription>Campus identity and class mapping</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <InfoRow label="University" value={profile.academicInfo.university} />
                <InfoRow label="Roll number" value={profile.academicInfo.rollNumber} />
                <InfoRow label="Class" value={profile.academicInfo.className} />
                <InfoRow label="Section" value={profile.academicInfo.section} />
              </CardContent>
            </Card>

            <Card className="border-orange-100/70 bg-white/95 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="size-4 text-orange-500" />
                  Mental health
                </CardTitle>
                <CardDescription>Latest emotional indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <InfoRow label="Current mood" value={profile.mentalHealth.currentMood} />
                <InfoRow label="Mood score" value={`${profile.mentalHealth.moodScore} / 100`} />
                <InfoRow label="Risk level" value={profile.mentalHealth.riskLevel} />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-orange-100/70 bg-white/95 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CalendarClock className="size-4 text-orange-500" />
                  Session stats
                </CardTitle>
                <CardDescription>Platform activity summary</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <InfoRow label="Total sessions" value={String(profile.stats.totalSessions)} />
                <InfoRow label="Last active" value={profile.stats.lastActive} />
              </CardContent>
            </Card>

            <Card className="border-orange-100/70 bg-white/95 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Building2 className="size-4 text-orange-500" />
                  Support contacts
                </CardTitle>
                <CardDescription>Emergency and mentorship contacts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <InfoRow label="Parent" value={profile.contacts.parent} />
                <InfoRow label="Mentor" value={profile.contacts.mentor} />
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  )
}

function InfoCell({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border/70 bg-background/80 p-3">
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="flex items-center gap-2 text-sm font-medium text-foreground wrap-break-word">
        {icon}
        {value}
      </p>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-background/80 px-3 py-2.5 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  )
}
