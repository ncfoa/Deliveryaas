"use client"

export default function ResponsibilitiesInfo() {
  return (
    <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
      <div className="text-sm text-gray-800">
        <div className="font-medium mb-1">📦 Package Responsibilities</div>
        <div className="space-y-1">
          <div>• <strong>Sender:</strong> Hand package to traveler at pickup location</div>
          <div>• <strong>Receiver:</strong> Meet traveler at dropoff location to collect package</div>
        </div>
      </div>
    </div>
  );
}
