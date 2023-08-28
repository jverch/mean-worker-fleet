import React, { FC } from 'react';
import './Home.css';

const MAX_FILE_COUNT = 300;
const MAX_NUMBER_COUNT = 1000000;

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const [data, setData] = React.useState(null);
  const [fileCount, setFileCount] = React.useState('1');
  const [numberCount, setNumberCount] = React.useState('1');

  // generate function
  const generate = (fileCount: string, numberCount: string) => {
    console.log("generating?");
    let currFileCount = parseInt(fileCount);
    let currNumberCount = parseInt(numberCount);
    if (isNaN(currFileCount) || isNaN(currNumberCount)) {
      return alert("File Count and Number Count must be numbers");
    };
    if (currFileCount < 1 || currFileCount > MAX_FILE_COUNT || currNumberCount < 1 || currNumberCount > MAX_NUMBER_COUNT) {
      return alert(`File Count must be a number within the range of 1-${MAX_FILE_COUNT} and Number Count within the range of 1-${MAX_NUMBER_COUNT}}`);
    };
    fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileCount, numberCount }),
    })
      .then((res) => res.json())
      .then((data) => setData(data.message))
      .catch((err) => console.log(err));
  };

  const calculate = () => {
    console.log("calculating?");
    fetch("/api/calculate")
      .then((res) => {
        res.json().then((data) => {
          console.log("Response from calculate: ", data);
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="Home" data-testid="Home">
      Home Component
      <div>
        <form>
          <h1>Generate Files:</h1>
          <label>
            File Count: 
            <input
              onChange={(e) => setFileCount(e.target.value)}
              value={fileCount}
              type="text"
              name="fileCount" 
            />
          </label>
          <label>
            Number Count: 
            <input
              onChange={(e) => setNumberCount(e.target.value)}
              value={numberCount}
              type="text"
              name="numberCount"
            />
          </label>
        </form>
        <button onClick={() => generate(fileCount, numberCount)}>Generate</button>
        <p>{!data ? "" : data}</p>
      </div>
      <button onClick={() => calculate()}>Calculate Mean</button>
    </div>
  )
};

export default Home;
