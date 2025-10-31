import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { AlertTriangle } from "lucide-react"

export default function NotFound() {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = "Not Found Page | Stavbar"
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-50 text-center px-6">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center shadow-sm">
          <AlertTriangle className="text-red-500 w-10 h-10" />
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">
        Page Not Found
      </h2>
      <p className="text-gray-500 mb-8 max-w-md">
        Oops! The page you’re looking for doesn’t exist or may have been moved.
      </p>

      {/* Back Button */}
      <Button
        onClick={() => navigate("/")}
        className="rounded-md bg-primary cursor-pointer text-white hover:bg-primary/90 px-6 py-2"
      >
        Go Back Home
      </Button>

      {/* Footer */}
      <p className="text-gray-400 text-sm mt-12">
        © {new Date().getFullYear()} Stavbar. All rights reserved.
      </p>
    </div>
  )
}
