import { useNavigate } from "react-router-dom"

const DestinationEmpty = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 shadow-sm">
        <h3 className="font-headline-sm text-headline-sm mb-2">No destinations found</h3>
        <p className="text-on-surface-variant mb-6">We couldn't find any destinations matching your search or filters. Try adjusting the filters or add a new destination.</p>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="bg-primary px-4 py-2 rounded-md text-on-primary"
          >
            Explore Popular
          </button>
        </div>
      </div>
    </div>
  )
}

export default DestinationEmpty
