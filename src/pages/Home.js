import React, { useEffect, useState } from "react";
import Card, { CardBody, CardTitle } from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Columns from "react-columns";
import Form from "react-bootstrap/Form";
import NumberFormat from "react-number-format";
import ReactTooltip from "react-tooltip";
import RingLoader from "react-spinners/RingLoader";
// import Toggle from "react-toggle";
import "react-toggle/style.css";

function Home() {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [searchCountries, setSearchCountries] = useState("");
  const [loading, setLoading] = useState(true);
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/v2/all"),
        axios.get("https://corona.lmao.ninja/v2/countries"),
      ])
      .then((responseArr) => {
        setLatest(responseArr[0].data);
        setResults(responseArr[1].data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  

  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();

  const filterCountries = results.filter((item) => {
    return searchCountries !== "" ? item.country.toLowerCase().includes(searchCountries.toLowerCase()) : item;
    
  });

  const con = filterCountries.sort((a,b) =>{
    return b.cases - a.cases
  })

  const countries = filterCountries.map((data, i) => {
    return (
      <Card
        key={i}
        bg={darkTheme ? "dark" : "light"}
        text={darkTheme ? "light" : "dark"}
        className="text-center"
        style={{ margin: "10px" }}
        id="b"
      >
        
        <Card.Img id="a" variant="top" src={data.countryInfo.flag} />
        <Card.Body >
          <Card.Title>{data.country}</Card.Title>
          <Card.Text style={{color:'red'}}>Deaths : {data.deaths}</Card.Text>
          <Card.Text>Cases : {data.cases}</Card.Text>
          <Card.Text>Today's cases : {data.todayCases}</Card.Text>
          <Card.Text>Today's deaths : {data.todayDeaths}</Card.Text>
          <Card.Text style={{color:'green'}}>Recovered : {data.recovered}</Card.Text>
          <Card.Text>Active : {data.active}</Card.Text>
          <Card.Text>Critical : {data.critical}</Card.Text>
          <Card.Text>Tests : {data.tests}</Card.Text>
        </Card.Body>
      </Card>
    );
  });
  

  // const countries = filterCountries.map((data,i) => {
  //   return (
  //     <Card.Body>
  //       <Card.Title>{data.cases}</Card.Title>
  //     </Card.Body>
  //   )
  // })

  var queries = [
    {
      columns: 2,
      query: "min-width: 500px",
    },
    {
      columns: 3,
      query: "min-width: 1000px",
    },
  ];

  const handleDarkThemeChange = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <div className="home"
      style={{
        backgroundColor: darkTheme ? "black" : "white",
        color: darkTheme ? "white" : "black",
      }}
    >
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <RingLoader size={50} color={"gray"} loading={loading} />
      </div>
      <br />
      <h2 className='header'
        data-tip="by Ohad Leibovich"
        style={{ textAlign: "center" }}
      >
        COVID-19  
      </h2>
      <ReactTooltip effect="solid" />
      
      {/* <div style={{ textAlign: "center" }}>
        <Toggle
          defaultChecked={false}
          icons={{
            checked: "🌜",
            unchecked: "🌞",
          }}
          onChange={handleDarkThemeChange}
        />
      </div> */}
      <br />
     
      <CardDeck>
        <Card
          bg="secondary"
          text="white"
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Cases</Card.Title>
            {/* <Card.Text>{latest.cases}</Card.Text> */}
            <NumberFormat
              value={latest.cases}
              displayType={"text"}
              thousandSeparator={true}
              style={{ fontSize: "30px", textAlign:'center', margin:'auto', display:'flex', justifyContent:'center', fontWeight:'bold' }}
            />
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card
          bg="danger"
          text={"white"}
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Deaths</Card.Title>
            <Card.Text>
              {" "}
              <NumberFormat
                value={latest.deaths}
                displayType={"text"}
                thousandSeparator={true}
                style={{ fontSize: "30px", textAlign:'center', margin:'auto', display:'flex', justifyContent:'center' }}
              />
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card
          bg="success"
          text={"white"}
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Recovered</Card.Title>
            <Card.Text>
              {" "}
              <NumberFormat
                value={latest.recovered}
                displayType={"text"}
                thousandSeparator={true}
                style={{ fontSize: "30px", textAlign:'center', margin:'auto', display:'flex', justifyContent:'center' }}
              />
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
          
        </Card>
        
      </CardDeck>
      <Form.Group controlId="formGroupSearch">
          <Form.Control
            bg="dark"
            type="text"
            placeholder="Search for countries"
            onChange={(e) => setSearchCountries(e.target.value)}
          />
        </Form.Group>
      
      <Form>
       
      </Form>
      <Columns queries={queries}>{countries}</Columns>
    </div>
  );
}

export default Home;
