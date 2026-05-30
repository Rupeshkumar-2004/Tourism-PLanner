import DestinationContent from "../components/DestinationContent.jsx";
import DestinationEmpty from "../components/DestinationEmpty.jsx";
import DestinationError from "../components/DestinationError.jsx";
import DestinationSkeleton from "../components/DestinationSkeleton.jsx";
import useDestinations from "../hooks/useDestinations.js"

const DestinationsPage = () => {
    const {
      destinations,
      pagination,
      isLoading,
      error,
      refetchDestinations,
      page,
      setPage,
      search,
      setSearch,
      category,
      setCategory,
    } = useDestinations();

    if(isLoading) return < DestinationSkeleton />

    if(error) return <DestinationError onRetry = {refetchDestinations}/>

    if(destinations.length === 0) return <DestinationEmpty />

    return (
      <DestinationContent
        destinations={destinations}
        pagination={pagination}
        setPage={setPage}
        page={page}
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
      />
    )
}

export default DestinationsPage
