import DashboardSkeleton from "../Components/DashboardSkeleton.jsx";
import DashboardError from "../Components/DashboardError.jsx";
import EmptyDashboard from "../Components/EmptyDashBoard.jsx";
import DashboardContent from "../Components/DashboardContent.jsx";

import { useDashboardData } from "../hooks/useDashboardData.js";

export default function DashboardPage() {

   const { dashboardData, isLoading, error, refetchDashboard } = useDashboardData();

   if(isLoading){
      return <DashboardSkeleton />
   }

   if(error){
      return <DashboardError onRetry={refetchDashboard} />
   }

   if(!dashboardData){
      return <EmptyDashboard />
   }

   return <DashboardContent dashboardData={dashboardData} />
}
