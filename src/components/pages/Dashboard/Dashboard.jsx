import BarCharts from "./BarCharts"
import BarPeralatanTiang from "./BarPeralatanTiang"
import DashboardGrid from "./DashboardGrid"
import PieChartCrossArm from "./PieChartCrossArm"
import PieChartTiangAtasBawah from "./PieChartTiangAtasBawah"
import PieCharts from "./PieCharts"
import Welcome from "./Welcome"


const Dashboard = () => {
  return (
    <div className="flex grid grid-cols-2">
      <div className="">
        <div>
          <Welcome></Welcome>
          <DashboardGrid></DashboardGrid>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <PieChartTiangAtasBawah></PieChartTiangAtasBawah>
          <PieChartCrossArm></PieChartCrossArm>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4"> 
          <BarPeralatanTiang></BarPeralatanTiang>
          <PieCharts></PieCharts>
        </div>
      </div>
      <div className="">
        <BarCharts></BarCharts>
      </div>
      
    </div>

  )
}


export default Dashboard
