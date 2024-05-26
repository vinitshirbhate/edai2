import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from "../../firebase";

const BookCard = ({ name, imageURL, itemp, ftemp, ihumidity, fhumidity, isoilmoisture, fsoilmoisture }) => {
  const firebase = useFirebase();
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (imageURL) {
      firebase.getImageURL(imageURL).then(setUrl).catch(console.error);
    }
  }, [firebase, imageURL]);

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      {url && <Card.Img variant="top" src={url} alt={`${name} image`} />}
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          Temperature: {itemp} - {ftemp}<br />
          Humidity: {ihumidity} - {fhumidity}<br />
          Soil Moisture: {isoilmoisture} - {fsoilmoisture}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default BookCard;
