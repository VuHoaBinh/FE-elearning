import { getHeaderColumns } from "./table";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement,
} from "chart.js";
import translateVi from "./translateVi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const getOptionsCharBar = (titleCharBar?: string) => {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: titleCharBar,
      },
    },
  };
};

export const getValueChartPie = (values?: any) => {
  const keys = getHeaderColumns(values, ["message"]);
  const data: any[] = [];

  keys.forEach((key) => {
    data.push(values[key]);
  });

  // console.log(keys);

  return {
    labels: keys.map((key) => translateVi(key)),
    datasets: [
      {
        // label: "# of Votes",
        data: data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
};

export const getValueChartVertical = (
  values?: any,
  titleValue?: any,
  dataValue?: any,
  fieldName?: any
) => {
  // console.log("values là", values);

  // const backgroundColor = [
  //   "rgba(255, 99, 132, 0.2)",
  //   "rgba(54, 162, 235, 0.2)",
  //   "rgba(255, 206, 86, 0.2)",
  //   "rgba(75, 192, 192, 0.2)",
  //   "rgba(153, 102, 255, 0.2)",
  //   "rgba(255, 159, 64, 0.2)",
  //   //color bonus
  //   "rgba(255, 99, 132, 1)",
  //   "rgba(54, 162, 235, 1)",
  //   "rgba(255, 206, 86, 1)",
  //   "rgba(75, 192, 192, 1)",
  //   "rgba(153, 102, 255, 1)",
  //   "rgba(255, 159, 64, 1)",
  // ];

  let nameTitle: any[] = [];
  let dataList: any[] = [];
  let dataSet: any[] = [];
  //name title
  nameTitle = values.map((data: any) => data[titleValue]);
  //data value
  dataList = values.map((data: any) => data[dataValue]);

  //value
  const valueColumn = [...dataList];
  //set label
  const labels = nameTitle;
  //set dataSet
  dataSet = [
    {
      label: fieldName,
      data: valueColumn,
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ];

  // console.log("labels là", nameTitle);
  // console.log("data list là", valueColumn);

  return {
    labels,
    datasets: dataSet,
  };
};

export const getValueChartVerticalMultiColumn = (
  values?: any,
  yearLabel?: any
) => {
  // console.log("values là", values);

  const keys = getHeaderColumns(values, ["message", "file"]).reverse();
  const data: any[] = [];

  keys.forEach((key) => {
    data.push(values[key]);
  });

  // console.log("keys là", keys);
  // console.log("data là", data);

  const backgroundColor = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
    //color bonus
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
  ];

  let labels = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];
  let dataSet: any[] = [];

  dataSet = data.map((data, index) => {
    return {
      label: yearLabel[index],
      data,
      backgroundColor: backgroundColor[index],
    };
  });

  return {
    labels,
    datasets: dataSet,
  };
};
