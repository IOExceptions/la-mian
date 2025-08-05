export default function HelpCenterLoading() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Skeleton */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-10 h-6"></div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Search Skeleton */}
        <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse"></div>

        {/* Help Sections Skeleton */}
        {[1, 2, 3].map((section) => (
          <div key={section} className="space-y-2">
            <div className="w-32 h-6 bg-gray-200 rounded animate-pulse px-2"></div>
            <div className="bg-white rounded-lg divide-y divide-gray-100">
              {[1, 2, 3].map((item) => (
                <div key={item} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="w-3/4 h-5 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Contact Info Skeleton */}
        <div className="space-y-2">
          <div className="w-24 h-6 bg-gray-200 rounded animate-pulse px-2"></div>
          <div className="bg-white rounded-lg divide-y divide-gray-100">
            {[1, 2, 3].map((method) => (
              <div key={method} className="p-4 flex items-center gap-3">
                <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex-1">
                  <div className="w-24 h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                  <div className="w-32 h-3 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
