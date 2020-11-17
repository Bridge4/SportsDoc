import React, { useState, useEffect } from 'react';
import "./player_info.css"
import Blank from '../blank.png'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PlayerCharts from '../../Components/Charts/PlayerCharts.js';


function Player(props) {

  const [loading, setloading] = useState(true);
  const [player, setplayer] = useState([])
  const [search, setsearch] = useState("")
  const [sport, setsport] = useState("")

  useEffect(() => {
    setloading(true)
    setsport(props.sport)
    api(props.player, props.sport)
  }, [props.sport, props.player])

  function api(apiPlayer, apiSport) {
    fetch(`/${apiSport}/getplayer/${apiPlayer}`)
      .then(res => res.json())
      .then(
        (result) => {
          setplayer(result)
          setloading(false)
        },
        (error) => {
          console.log(error)
          setloading(false)
        }
      )
  }
  function handleChange(event) {
    setsearch(event.target.value);
  }

  function handleChangeD(event) {
    setsport(event.target.value);
  }

  function linkGen(type, sport, id) {
    if (type == "player") {
      switch (sport) {
        case "basketball":
          return (`https://www.basketball-reference.com/req/202010061/images/players/${id}.jpg`)
        case "football":
          return (`https://www.pro-football-reference.com/req/20180910/images/headshots/${id}_2019.jpg`)
        case "baseball":
          return (`https://www.baseball-reference.com/req/202007270/images/headshots/c/c755fefc_sabr.jpg`)
        case "hockey":
          return (`https://www.hockey-reference.com/req/202008181/images/headshots/${id}-2017.jpg`)
        case "soccer":
          return (`https://images-na.ssl-images-amazon.com/images/I/61Jigwd1kKL._AC_SL1500_.jpg`)
      }
    } else if (type == "team") {
      switch (sport) {
        case "basketball":
          return (`https://d2p3bygnnzw9w3.cloudfront.net/req/202010091/tlogo/bbr/${id}-2020.png`)
        case "football":
          return (Blank)
        case "baseball":
          return (Blank)
        case "hockey":
          return (Blank)
        case "soccer":
          return (Blank)
      }
    }
  }

  //  window.onload = function () {
  //     var chart = new CanvasJS.Chart("chartContainer", {
  //         title: {
  //             text: "Shooting Percentage"
  //         },
  //         data: [
  //             {
  //                 type: "column",
  //                 name: "Preseason",
  //                 showInLegend: true,
  //                 dataPoints: [
  //                     { label: "In The Paint", y: 49.3 },
  //                     { label: "Mid Range", y: 15 },
  //                     { label: "Three Point", y: 34.8 }
  //                 ]
  //             },

  //             {
  //                 type: "column",
  //                 name: "Regular Season",
  //                 showInLegend: true,
  //                 dataPoints: [
  //                     { label: "In The Paint", y: 70 },
  //                     { label: "Mid Range", y: 20 },
  //                     { label: "Three Point", y: 20 }
  //                 ]
  //             },

  //             {
  //                 type: "column",
  //                 name: "Finals",
  //                 showInLegend: true,
  //                 dataPoints: [
  //                     { label: "In The Paint", y: 90 },
  //                     { label: "Mid Range", y: 30 },
  //                     { label: "Three Point", y: 40 }
  //                 ]
  //             }
  //         ],

  //         axisY: {
  //             suffix: "%"
  //         }
  //     });
  //     chart.render();
  // }
  if (loading) {
    return (
      <div className="d-flex justify-content-center" style={{ marginTop: '5px' }}>
        <div className="spinner-border text-light" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  } else if (!loading) {
    return (
      <div className="hpage">
        <div className="card player_stat_card">
          <h2 className="card-title player_stat_title"> {player[0].player_name} </h2>
          <div className="card player_stat_img">
            <div className="card-body player_stat_body">
              <img className="card-img-top player_stat_img_item"
                src={linkGen("player", sport, player[0].player_id)}
                alt="Sample Image" />
            </div>
          </div>
          <div className="card player_stat_stats">
            <div className="card-body player_stat_body">
              <div className="card-text player_stat_text">
                <div> Career Points: {player[player.length - 1].points} </div>
                <br />
                <div> Career Assists: {player[player.length - 1].assists} </div>
                <br />
                <div> Career Rebounds: {player[player.length - 1].total_rebounds} </div>
                <br />
                <div> Career Blocks: {player[player.length - 1].blocks} </div>
                <br />
              </div>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="card player_stat_graph">
              <div id="PlayerGraph">
                <PlayerCharts/>
              </div>
          </div>
      </div>
    )
  }
}


export default Player;