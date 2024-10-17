// CatData.jsx
import React from 'react';

const CatData = ({ data, addToBanList, banList }) => {
  if (!data) return null;

  const { name, weight, temperament, hypoallergenic, imageUrl } = data;

  // Define the attributes with their labels and values
  const attributes = [
    { key: 'name', label: 'Name', value: name },
    { key: 'weight', label: 'Weight', value: `${weight.imperial} lbs` },
    { key: 'hypoallergenic', label: 'Hypoallergenic', value: hypoallergenic ? 'Yes' : 'No' },
    { key: 'temperament', label: 'Temperament', value: temperament },
  ];

  return (
    <div className='cat-data-container p-4 m-auto text-center'>
      <div className='h-80'>
        <img src={imageUrl} alt={name} style={{ maxHeight: '300px', margin: 'auto' }} />
      </div>

      <div className='mt-4 h-96'>
        {/* Map over the attributes and render a button only if the attribute is not in the ban list */}
        {attributes.map(({ key, label, value }) => {
          const isBanned = banList[key]; // Check if the attribute is marked as banned

          return (
            !isBanned && (
              <div key={key}>
                <button
                  onClick={() => addToBanList(key)}
                  className='bg-pink-300 text-black my-2 p-4 rounded w-full sm:w-96 h-fit'>
                  <strong>{label}:</strong> {value}
                </button>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default CatData;
