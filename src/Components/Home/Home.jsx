import { useState, useEffect } from 'react';
import './Home.css';
import Search from '../Search/Search';
import Header from '../Header/Header';
// import Search from '../Search/Search';

const Home = () => {
  const [randomImage, setRandomImage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'your_pixabay_api_key' with your actual Pixabay API key.
        const response = await fetch(`https://pixabay.com/api/?key=${import.meta.env.VITE_PIXABY_KEY}&q=mountains`);
        const data = await response.json();

        // Get a random image from the 'hits' array.
        const randomIndex = Math.floor(Math.random() * data.hits.length);
        const randomImage = data.hits[randomIndex];

        setRandomImage(randomImage);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  // Empty dependency array to run the effect only once when the component mounts.



  const backgroundStyle = {
    backgroundImage: `url('${randomImage.largeImageURL}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    height: '100vh',
  };


  return (
    <div style={backgroundStyle} className='main'>
      <Header />
      <div className='Heading'>
        <h1>Discover over 2,000,000 <br className='break' /> free Stock Images</h1>
      </div>
      <Search />
    </div>
  );
};

export default Home;
