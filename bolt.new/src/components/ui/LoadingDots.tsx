export default function LoadingDots() {
  return (
    <div className="flex items-center space-x-1">
      <div className="w-2 h-2 bg-bolt-elements-textTertiary rounded-full animate-pulse" />
      <div className="w-2 h-2 bg-bolt-elements-textTertiary rounded-full animate-pulse animation-delay-200" />
      <div className="w-2 h-2 bg-bolt-elements-textTertiary rounded-full animate-pulse animation-delay-400" />
    </div>
  );
}
