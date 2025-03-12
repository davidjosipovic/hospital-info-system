import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import { XCircle } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6">
      <XCircle className="w-24 h-24 text-red-500 mb-4" />
      <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mt-2">The page you are looking for doesn't exist.</p>
      <Link to="/">
        <Button className="mt-6 px-6 py-3 text-lg">Go Home</Button>
      </Link>
    </div>
  );
}