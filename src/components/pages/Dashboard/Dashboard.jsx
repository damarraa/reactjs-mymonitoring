import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import BarCharts from "./BarCharts";
import BarPeralatanTiang from "./BarPeralatanTiang";
import BarTemuan from "./BarTemuan";
import CekJadwal from "./CekJadwal";
import DashboardGrid from "./DashboardGrid";
import PieChartCrossArm from "./PieChartCrossArm";
import PieChartTiangAtasBawah from "./PieChartTiangAtasBawah";
import PieCharts from "./PieCharts";
import TiangAtas from "./TiangAtas";
import TiangBawah from "./TiangBawah";
import Welcome from "./Welcome";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Oval
          height={40}
          width={40}
          color="#0891b2"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#0891b2"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  return (
    <div>
      <div>
        <Welcome />
        <DashboardGrid />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <BarTemuan />
        </div>
        <div className="mt-3">
          <BarPeralatanTiang />
          <div className="flex grid grid-cols-2 gap-x-2">
            <TiangAtas />
            <TiangBawah />
          </div>
        </div>
        <div>
          <PieCharts />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
