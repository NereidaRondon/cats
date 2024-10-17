import { useState } from 'react';
import './App.css';
import CatData from './Components/CatData';

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [catData, setCatData] = useState(null);
  const [banList, setBanList] = useState({});

  const callAPI = async () => {
    const breedsUrl = `https://api.thecatapi.com/v1/breeds?api_key=${ACCESS_KEY}`;

    try {
      const breedResponse = await fetch(breedsUrl);
      const breedData = await breedResponse.json();

      if (breedData && breedData.length > 0) {
        // Pick a random breed without filtering by banned attributes
        const randomBreed = breedData[Math.floor(Math.random() * breedData.length)];
        const imageUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${randomBreed.id}&api_key=${ACCESS_KEY}`;
        const imageResponse = await fetch(imageUrl);
        const imageData = await imageResponse.json();

        if (imageData && imageData[0] && imageData[0].url) {
          setCatData({
            ...randomBreed,
            imageUrl: imageData[0].url,
          });
        } else {
          alert('Could not retrieve an image for this breed. Please try again.');
        }
      } else {
        alert('No breed information available.');
      }
    } catch (error) {
      console.error('Error fetching breed or image data:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  // Function to add an attribute to the ban list
  const addToBanList = (attribute) => {
    const normalizedAttribute = attribute.toLowerCase();

    setBanList((prevBanList) => ({
      ...prevBanList,
      [normalizedAttribute]: true,
    }));
  };

  return (
    <div className='flex flex-col w-dvw m-plus-rounded-1c-regular'>
      <h1 className='spicy-rice-regular text-5xl sm:text-6xl m-auto'>Cats</h1>

      <div className='my-10 flex'>
        <button
          onClick={callAPI}
          className='border rounded px-6 py-3 bg-pink-950 m-auto m-plus-rounded-1c-regular font-bold'>
          New Cat Breed
        </button>
      </div>

      <div className='flex mx-auto mb-16 w-fit h-96'>
        <div className='row-span-1 m-auto h-auto'>
          {/* At least one image is displayed per API call */}
          {catData && <CatData data={catData} addToBanList={addToBanList} banList={banList} />}
        </div>
      </div>

      <div className='ban-list bg-black w-full sm:w-1/2 h-44 m-auto mt-72 flex flex-col rounded-xl text-center'>
        <h2 className='spicy-rice-regular text-2xl sm:text-3xl mx-auto mt-2'>Ban List</h2>

        {Object.entries(banList).map(([attribute]) => (
          <p key={attribute} className='pb-1'>
            <strong>{attribute}</strong>
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
