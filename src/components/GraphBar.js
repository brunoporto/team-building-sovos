import React, { Component } from "react";
import axios from "axios";
import { HorizontalBar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const chartData = {
  labels: ["Quarenteners", "BoaMan", "Vencedor", "I.D.G.A.F.", "Quaranteam"],
  datasets: [
    {
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
      ],
      borderWidth: 1,
      data: [],
    },
  ],
};

class Ranking extends Component {
  interval = null;

  constructor(props) {
    super(props);
    this.chartReference = React.createRef();

    this.state = {
      data: {},
    };
  }

  componentDidMount = () => {
    this.interval = setInterval(this.getData, 30000);
    this.getData();
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getData = () => {
    const url = `${PROXY_URL}https://dashfeed.nextcanvas.com/api/Widgets/Matrix/305011`;
    axios.get(url).then((res) => {
      let newData = Object.assign({}, chartData);
      newData.datasets[0].data = res.data;
      this.setState({ data: newData });
    });
  };

  render() {
    return (
      <div>
        <h3>Ranking das Equipes</h3>
        <HorizontalBar
          ref={this.chartReference}
          data={this.state.data}
          options={{
            maintainAspectRatio: true,
            legend: {
              display: false,
              labels: {
                display: false,
              },
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    fontSize: 16,
                    fontColor: "#fff",
                  },
                },
              ],
            },
            plugins: {
              datalabels: {
                display: true,
                color: "white",
                align: "right",
                anchor: "end",
              },
            },
          }}
        />
      </div>
    );
  }
}

export default Ranking;
