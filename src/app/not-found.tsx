import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-5">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Sorry, the page you are looking for does not exist.
      </p>

      <Link className="text-blue-500 hover:underline text-lg" href="/landing/home">
        Go Back to Home
      </Link>
    </div>
  );
}
