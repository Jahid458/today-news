import Chart from "react-google-charts";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: publications = [] } = useQuery({
    queryKey: ["publication"],
    queryFn: async () => {
      const res = await axiosSecure.get("/publication");
      return res.data;
    },
  });

  const data = [
    ["Task", "Hours per Day"],
    ...publications.map((publication) => [
      publication.publisherName,
      publication.articleCount,
    ]),
  ];

  const options = {
    title: "Publications by Article Count",
    is3D: true,
    legend: { position: "bottom" },
  };

  const data2 = [
    ["Element", "Density", { role: "style" }],
    ["Copper", 8.94, "#b87333"], // RGB value
    ["Silver", 10.49, "silver"], // English color name
    ["Gold", 19.3, "gold"],
    ["Platinum", 21.45, "color: #e5e4e2"], // CSS-style declaration
  ];

  const data3 = [
    ["Year", "Sales", "Expenses"],
    ["2013", 1000, 400],
    ["2014", 1170, 460],
    ["2015", 660, 1120],
    ["2016", 1030, 540],
  ];

  const options2 = {
    title: "Company Performance",
    hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
    vAxis: { minValue: 0 },
    chartArea: { width: "70%", height: "70%" },
  };

  return (
    <div className="flex flex-wrap justify-center gap-10 p-6">
      {/* Pie Chart */}
      <div className="w-full md:w-1/2 lg:w-1/3">
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width="100%"
          height="400px"
        />
      </div>

      {/* Column Chart */}
      <div className="w-full md:w-1/2 lg:w-1/3">
        <Chart
          chartType="ColumnChart"
          data={data2}
          options={{
            title: "Element Densities",
            legend: "none",
          }}
          width="100%"
          height="400px"
        />
      </div>

      {/* Area Chart */}
      <div className="w-full lg:w-2/3">
        <Chart
          chartType="AreaChart"
          data={data3}
          options={options2}
          width="100%"
          height="400px"
        />
      </div>
    </div>
  );
};

export default Dashboard;
