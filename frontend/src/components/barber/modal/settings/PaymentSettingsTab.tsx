import { CreditCard, DollarSign, Percent, PiggyBank } from "lucide-react";

function PaymentSettingsTab() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Settings
        </h2>
        <p className="text-gray-600">Manage payment methods and pricing</p>
      </div>

      <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Payment Methods
        </h3>

        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <DollarSign className="text-green-600" size={20} />
              <div>
                <span className="font-medium text-gray-900">Cash Payments</span>
                <p className="text-sm text-gray-600">
                  Accept cash payments in store
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
              <CreditCard className="text-blue-600" size={20} />
              <div>
                <span className="font-medium text-gray-900">Card Payments</span>
                <p className="text-sm text-gray-600">
                  Accept credit and debit cards
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
              <Percent className="text-purple-600" size={20} />
              <div>
                <span className="font-medium text-gray-900">
                  Digital Wallets
                </span>
                <p className="text-sm text-gray-600">
                  Apple Pay, Google Pay, etc.
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

      <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Tax Settings
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tax Rate (%)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="100"
              defaultValue="8.25"
              className="w-full px-4 py-3 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tax ID Number
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300/50 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
              placeholder="Enter tax ID"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSettingsTab;
