import React, { FC } from 'react';
import './Home.css';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const [data, setData] = React.useState(null);
  const [fileCount, setFileCount] = React.useState('1');
  const [numberCount, setNumberCount] = React.useState('1');

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  // generate function
  const generate = (fileCount: string, numberCount: string) => {
    console.log("generating?");
    let currFileCount = parseInt(fileCount);
    let currNumberCount = parseInt(numberCount);
    if (isNaN(currFileCount) || isNaN(currNumberCount)) {
      return alert("File Count and Number Count must be numbers");
    };
    if (currFileCount < 1 || currFileCount > 100 || currNumberCount < 1 || currNumberCount > 1000000) {
      return alert("File Count must be a number within the range of 1-100 and Number Count within the range of 1-1000000");
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

  return (
    <div className="Home" data-testid="Home">
      Home Component
      <p>{!data ? "Loading..." : data}</p>
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
      </div>
    </div>
  )
};

export default Home;
