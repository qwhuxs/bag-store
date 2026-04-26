import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Профіль
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">

        <p className="mb-2">
          <b>Ім’я:</b> {session.user?.name}
        </p>

        <p className="mb-2">
          <b>Email:</b> {session.user?.email}
        </p>

        {session.user?.image && (
          <img
            src={session.user.image}
            alt="avatar"
            className="mt-4 w-24 h-24 rounded-full"
          />
        )}

      </div>
    </div>
  )
}