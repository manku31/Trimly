import { Lock, Key, Smartphone, Shield } from "lucide-react";

function SecuritySettingsTab() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Security Settings
        </h2>
        <p className="text-gray-600">
          Manage your account security and privacy
        </p>
      </div>

      <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Password & Authentication
        </h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="text-gray-400" size={16} />
              </div>
              <input
                type="password"
                className="w-full pl-10 pr-4 py-3 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                placeholder="Enter current password"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key className="text-gray-400" size={16} />
              </div>
              <input
                type="password"
                className="w-full pl-10 pr-4 py-3 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                placeholder="Enter new password"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key className="text-gray-400" size={16} />
              </div>
              <input
                type="password"
                className="w-full pl-10 pr-4 py-3 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                placeholder="Confirm new password"
              />
            </div>
          </div>

          <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all duration-300">
            Update Password
          </button>
        </div>
      </div>

      <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Two-Factor Authentication
        </h3>

        <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Smartphone className="text-blue-600" size={20} />
            <div>
              <span className="font-medium text-gray-900">
                SMS Authentication
              </span>
              <p className="text-sm text-gray-600">
                Add an extra layer of security to your account
              </p>
            </div>
          </div>
          <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all duration-300 text-sm">
            Enable
          </button>
        </div>
      </div>
    </div>
  );
}

export default SecuritySettingsTab;
