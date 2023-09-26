import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, CardItem, CardProduct, Container, Go, HThree, Img, Input, Pe, Search } from "./IndexStyle"
import img from '../../img/613480.jpg';

export const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const response = await axios.get('http://localhost:4004/loaditems');
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <Container>

      <Search>

        <Input/>
        <Go className="NavButton">Go!</Go>

      </Search>

      {items.length > 0 && (
      <CardProduct>

          {items.map((item) => (
          <CardItem key={item._id}>

              <Img src={img} alt="Product Image" />
              <HThree>{item.code}</HThree>
              <Pe className="price">{`R$${item.price}`}</Pe>
              <Link to={`/item/${item._id}`}>
                <Button>Ir para a loja!</Button>
              </Link>

          </CardItem>
          ))}

      </CardProduct>
      )}

    </Container>
  )
}
