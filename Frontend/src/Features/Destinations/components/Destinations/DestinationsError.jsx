
const DestinationError = ({ onRetry }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 shadow-sm">
        <h3 className="font-headline-sm text-headline-sm mb-2">Something went wrong</h3>
        <p className="text-on-surface-variant mb-6">We couldn't load destinations. Please check your connection and try again.</p>
        <div className="flex justify-center gap-4">
          <button onClick={onRetry} className="bg-primary px-4 py-2 rounded-md text-on-primary">Retry</button>
        </div>
      </div>
    </div>
  )
}

export default DestinationError
