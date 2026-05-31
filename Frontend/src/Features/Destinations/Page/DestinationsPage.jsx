import React, { useState, useEffect } from "react";
import DestinationContent from "../components/Destinations/DestinationsContent.jsx";
import DestinationEmpty from "../components/Destinations/DestinationsEmpty.jsx";
import DestinationError from "../components/Destinations/DestinationsError.jsx";
import DestinationSkeleton from "../components/Destinations/DestinationsSkeleton.jsx";
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

  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setInitialLoad(false);
    }
  }, [isLoading]);

  if (initialLoad) return <DestinationSkeleton />

  if (error) return <DestinationError onRetry={refetchDestinations} />

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
      isLoading={isLoading}
    />
  )
}

export default DestinationsPage
