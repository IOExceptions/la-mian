export default function OrdersLoading() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Skeleton */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-6 h-6"></div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex-1 py-3 px-4">
              <div className="w-12 h-4 bg-gray-200 rounded animate-pulse mx-auto"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Orders List Skeleton */}
      <div className="p-4 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Order Header Skeleton */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-16 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
                <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Order Items Skeleton */}
            <div className="p-4">
              <div className="space-y-3">
                {[1, 2].map((j) => (
                  <div key={j} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="w-24 h-3 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="flex justify-between">
                        <div className="w-16 h-3 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Skeleton */}
              <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                {[1, 2, 3].map((k) => (
                  <div key={k} className="flex justify-between">
                    <div className="w-16 h-3 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-12 h-3 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>

              {/* Buttons Skeleton */}
              <div className="mt-4 flex gap-2">
                <div className="flex-1 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="flex-1 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
