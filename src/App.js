import logo from './logo.svg';
import './App.css';

fetch("https://www.fishwatch.gov/api/species")
  .then(res => res.json())
  .then(data => {
    data.forEach(fish => {
      console.log(fish['Species Name']);
    })
  })

function App() {
  return (
    <div className="App">
      <h1>Fish Search</h1>
    </div>
  );
}

export default App;
