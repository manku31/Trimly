import { X, Download, Share, Copy } from "lucide-react";
import type { BarberShop } from "../../../types";

interface QRCodeSectionProps {
  shop: BarberShop;
  onClose: () => void;
}

function QRCodeSection({ shop, onClose }: QRCodeSectionProps) {
  const queueUrl = `https://trimly.app/queue/${shop.id}`;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(queueUrl);
      // You could add a toast notification here
      console.log("URL copied to clipboard");
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Join the queue at ${shop.name}`,
          text: `Join the queue at ${shop.name} - ${shop.address}`,
          url: queueUrl,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback to copying URL
      handleCopyUrl();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 animate-fadeInScale">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Queue QR Code</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 text-center">
          <div className="w-48 h-48 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
            {/* QR Code would go here - you'd use a library like qrcode.js */}
            <div className="text-gray-400 text-center">
              <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <span className="text-xs">QR Code</span>
              </div>
            </div>
          </div>

          <h4 className="font-semibold text-gray-900 mb-2">{shop.name}</h4>
          <p className="text-sm text-gray-600 mb-4">{shop.address}</p>

          <div className="bg-gray-50 rounded-lg p-3 mb-6">
            <p className="text-xs text-gray-600 mb-1">Queue URL:</p>
            <p className="text-sm font-mono text-gray-900 break-all">
              {queueUrl}
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleCopyUrl}
              className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Copy size={16} />
              <span>Copy URL</span>
            </button>

            <button
              onClick={handleShare}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Share size={16} />
              <span>Share</span>
            </button>

            <button className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-all duration-300">
              <Download size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QRCodeSection;
