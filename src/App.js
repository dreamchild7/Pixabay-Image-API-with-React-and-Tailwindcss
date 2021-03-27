import React, {useState, useEffect} from 'react';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';

function App() {
  const [images, setImages] = useState([]);
const [isLoading, setIsLoading] =  useState(true);
const [term, setTerm] = useState('');


useEffect(() => {
  fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`)
  .then(res => res.json())
  .then(data => {
    setImages(data.hits);
    setIsLoading(false);
  })
  .catch(err => console.log(err));
}, [term]);


  return (
    <div className="container mx-auto">
      <h1 className="md:max-w-1/2 text-gray-700 text-center font-bold text-5xl my-8 mx-auto">A Pixabay Image API Built With React And Tailwindcss</h1>
      <ImageSearch searchText={(text) => setTerm(text)} />

{!isLoading && images.length===0 && <h1 className="text-5xl font-bold text-center mx-auto mt-52">Image not found</h1>}

     {isLoading? <h1 className="text-5xl font-bold text-center mx-auto mt-52">Loading...</h1> : <div className="grid grid-cols-1 md:grid-cols-3 gap-4 place-items-center">
       {images.map(image => (
          <ImageCard  key={images.id} image={image}/>
       ))}
      </div>}
    </div>
  );
}

export default App;
