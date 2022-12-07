import React, {useState, useEffect} from 'react'
import logo from './logo.svg';
import {
  MDBTable, 
  MDBTableHead, 
  MDBTableBody, 
  MDBRow, 
  MDBCol, 
  MDBContainer,
  MDBBtn,
  MDBBtnGroup
} from "mdb-react-ui-kit";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function App() {
  const[data, setData] = useState([]);
  const[value, setValue] = useState("");
  const[sortValue, setSortValue] = useState("");

  const sortOptions = ['Species', 'Calories', 'Fat', 'Serving Size'];

  useEffect(() => {
    loadFishData();
  }, []);

  const loadFishData = async () => {
    return await fetch("https://www.fishwatch.gov/api/species")
      .then(res => res.json())
      .then(data => setData(data))
      .catch((err) => console.log(err));
  }
  console.log('data', data);

  const handleSearch = async (e) => {
    e.preventDefault();
    let newData = [];
    await fetch("https://www.fishwatch.gov/api/species")
      .then(res => res.json())
      .then(data => {
        data.forEach(fish => {
          if (fish['Species Name'].toLowerCase().includes(value.toLowerCase())) {
            newData.push(fish);
          }
        })
      })
      .catch((err) => console.log(err));
    setData(newData);
    setValue("");
  }

  const handleSort = async (e) => {
    let value = e.target.value;
    setSortValue(value);
    if (value === 'Species') {
      data.sort((a, b) => (a['Species Name'] > b['Species Name']) ? 1 : -1);
    } else if (value === 'Fat') { 
      data.sort((a, b) => (parseInt(a['Fat, Total']) > parseInt(b['Fat, Total'])) ? 1 : -1);
    } else if (value === 'Serving Size') {
      data.sort((a, b) => (parseInt(a['Serving Weight']) > parseInt(b['Serving Weight'])) ? 1 : -1);
    } else {
      data.sort((a, b) => (parseInt(a[value]) > parseInt(b[value])) ? 1 : -1);
    }
    setValue("");
  }

  return (
    <MDBContainer>
      <h1 className="text-center" style={{marginTop: "50px"}}>Fish Nutrition Search</h1>
      <div>
        <form style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center"
        }}
        className="d-flex input-group w-auto"
        onSubmit={handleSearch}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Search Fish"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <MDBBtnGroup>
            <MDBBtn type="submit" color="dark">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </MDBBtn>
          </MDBBtnGroup>
        </form>
        <h2>Filter by</h2>
          <select 
            style={{width: "50%", height: "35px"}}
            onChange={handleSort}
            value={sortValue}
          >
            <option>Select value</option>
            {sortOptions.map((item, index) => (
              <option value={item} key={index}>{item}</option>
            ))}
          </select>
      </div>
      <div style={{marginTop: "100px", marginBottom: "100px"}}>
        <h2 className="text-center">Results</h2>
        <MDBRow>
          <MDBCol size="12">
            <MDBTable>
              <MDBTableHead dark>
                <tr>
                  <th scope="col">Species</th>
                  <th scope="col">Calories</th>
                  <th scope="col">Fat</th>
                  <th scope="col">Serving Size</th>
                </tr>
              </MDBTableHead>
              {data.length === 0 ? (
                <MDBTableBody className="align-center mb-0">
                  <tr>
                    <td colSpan={8} className="text-center mb-0">No results</td>
                  </tr>
                </MDBTableBody>
              ): (
                data.map((item, index) => (
                  <MDBTableBody key={index}>
                    <tr>
                      <th scope="row">{item['Species Name']}</th>
                      <td>{item['Calories']}</td>
                      <td>{item['Fat, Total']}</td>
                      <td>{item['Serving Weight']}</td>
                    </tr>
                  </MDBTableBody>
                ))
              )}
            </MDBTable>
          </MDBCol>
        </MDBRow>
      </div>
    </MDBContainer>
  );
}

export default App;
