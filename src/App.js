import React, { Component } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
class App extends Component {
  state = {
    isLoading: true,
    users: [],
    error: null
  };
  fetchUsers() {
    fetch(`https://api.spacexdata.com/v3/launches?limit=100`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          users: data,
          isLoading: false,
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }
  componentDidMount() {
    this.fetchUsers();
  }

 
clickYear = (data) => {
  console.log(data);
  fetch(`https://api.spacexdata.com/v3/launches?limit=100&amp;launch_success=true&amp;land_success=true=${data}`)
    .then(response => response.json())
    .then(datalist =>
      this.setState({
        users: datalist,
        isLoading: false,
      })
    )
    .catch(error => this.setState({ error, isLoading: false }));
}
 clickLauch = (data) => {
    console.log(data);
    fetch(`https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=true&launch_year=${data}`)
      .then(response => response.json())
      .then(datalists=>
        this.setState({
          users: datalists,
          isLoading: false,
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
}
  render() {
    const { isLoading, users, error } = this.state;
    console.log(users);
    let uniqueYears = users.filter((ele, ind) => ind === users.findIndex(elem => elem.launch_year === ele.launch_year))
  
    console.log(uniqueYears);
    return (
      <div className="App" style={{ background: "#f9e8e8"}}>
        <h6>SpaceX Lauch Program</h6>
        <div className="row main-container">
          <div className="col-md-2 filter-container">
            <h5><b>Filters</b></h5>
            <h5>Launch Year</h5>
            <div className="row">
            {uniqueYears.map(uniqueYears => {
                return (
                  <div className="col-md-6" key={uniqueYears.launch_year}>
                    <button className="btn btn-sm  btn-success" type="submit" onClick={() => this.clickYear(uniqueYears.launch_year)}>{uniqueYears.launch_year}</button>
                  </div>
                )
              }
              )}
               
            </div>
            <h5>Successful Launch</h5>
            <div className="row">
              <div className="col-md-6">
                <button className="btn btn-sm btn-success" type="submit"  >True</button>
              </div>
              <div className="col-md-6">
                <button className="btn btn-sm btn-success" type="submit">False</button>
              </div>
            </div>
            <h5>Successful Landing</h5>
            <div className="row">
              <div className="col-md-6">
                <button className="btn btn-sm btn-success" type="submit" >True</button>
              </div>
              <div className="col-md-6">
                <button className="btn btn-sm btn-success" type="submit">False</button>
              </div>
            </div>
          </div>
          <div className="col-md-10">
            <div className="row">
              {error ? <p>{error.message}</p> : null}
              {!isLoading ? (
                users.map(user => {
                  const { launch_year, flight_number, launch_success, links ,mission_name} = user;
                  return (
                    <div className="col-md-3" key={flight_number}>
                      <div className="card">
                        <div className="view overlay">
                          <img className="card-img-top" src={links.mission_patch_small}
                            alt={links.mission_patch_small} />
                          <a href="#!">
                            <div className="mask rgba-white-slight"></div>
                          </a>
                        </div>
                        <div className="card-body">
                          <h6  style={{ color: 'blue' }}>{mission_name} # {flight_number}</h6>
                          
                          <p className="card-text">Mission Ids:</p>
                          <p className="card-text">Launch Year: {launch_year}</p>
                          <p className="card-text">Successful Launch: {launch_success ? true : false}</p>
                          <p className="card-text">Successful Landing:</p>
                        </div>
                      </div>
                    </div>

                  );
                })
              ) : (
                  <h3>Loading...</h3>
                )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default App;