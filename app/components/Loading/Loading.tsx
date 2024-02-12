export function Loading() {
  return (
    <div
      aria-label="Loading..."
      role="status"
      className=" h-[60vh] flex justify-center items-center space-x-2"
    >
      <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-blue-600"></div>
      <span className="text-4xl font-medium text-blue-600">Loading...</span>
    </div>
  );
}
