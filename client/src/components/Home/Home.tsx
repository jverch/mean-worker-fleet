import React, { FC } from 'react';
import './Home.css';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="Home" data-testid="Home">
      Home Component
      <p>{!data ? "Loading..." : data}</p>
    </div>
  )
};

export default Home;
