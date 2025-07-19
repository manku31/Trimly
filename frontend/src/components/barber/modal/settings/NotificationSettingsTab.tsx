import { Bell, Mail, MessageSquare, Phone } from "lucide-react";

function NotificationSettingsTab() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Notification Settings
        </h2>
        <p className="text-gray-600">Configure how you receive notifications</p>
      </div>

      <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Queue Notifications
        </h3>

        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Bell className="text-blue-600" size={20} />
              <div>
                <span className="font-medium text-gray-900">
                  New Customer Joins Queue
                </span>
                <p className="text-sm text-gray-600">
                  Get notified when someone joins your queue
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <MessageSquare className="text-green-600" size={20} />
              <div>
                <span className="font-medium text-gray-900">
                  Customer Messages
                </span>
                <p className="text-sm text-gray-600">
                  Receive customer inquiries and messages
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Mail className="text-purple-600" size={20} />
              <div>
                <span className="font-medium text-gray-900">
                  Email Notifications
                </span>
                <p className="text-sm text-gray-600">
                  Daily summary and important updates
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Phone className="text-red-600" size={20} />
              <div>
                <span className="font-medium text-gray-900">
                  SMS Notifications
                </span>
                <p className="text-sm text-gray-600">
                  Urgent notifications via SMS
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default NotificationSettingsTab;
