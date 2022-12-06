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
import './App.css';

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
    // if (value.equals('Fat')) { value = 'Fat, Total'; }
    // if (value.equals('Serving Size')) { value = 'Serving Weight'; }
    data.sort((a, b) => (a[value] > b[value]) ? 1 : -1)
    console.log("Sorted value", value);
    console.log("Sorted", data);
    setValue("");
  }

  return (
    <MDBContainer>
      <h1>Fish Nutrition Search</h1>
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
          <MDBBtn type="submit" color="dark">Search</MDBBtn>
        </MDBBtnGroup>
      </form>
      <div style={{marginTop: "100px"}}>
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
      <MDBRow>
        <MDBCol size="8">
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
        </MDBCol>
        <MDBCol size="4"><h2>Filter</h2></MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
