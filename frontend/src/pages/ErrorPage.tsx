import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center animate-bounce-slow">
            <span className="text-4xl">😵</span>
          </div>
        </div>

        {/* Header */}
        <div>
          <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <div className="space-y-4">
            <p className="text-gray-500 text-sm">Let's get you back on track</p>

            {/* Navigation Buttons */}
            <div className="space-y-3">
              <Link
                to="/barber/login"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
              >
                <span>🔐</span>
                <span>Go to Login</span>
              </Link>

              <Link
                to="/barber/signup"
                className="w-full border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>👤</span>
                <span>Create Account</span>
              </Link>
            </div>
          </div>

          {/* Help Section */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Need help? Contact our support team
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Trimly. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
