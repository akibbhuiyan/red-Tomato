import React, { useState } from "react";
import "./Home.css";
import MenuItem from "../MenuItem/ManeuItem";
import Menu from "../Menu/Menu";
const Home = () => {
  const [menu, setMenu] = useState(MenuItem);
  const handlemeal = (elem) => {
    const newMenu = MenuItem.filter((meal) => meal.catagory === elem);
    setMenu(newMenu);
  };

  return (
    <>
      <div className="hero_section">
        <h1>Best Food Waiting For Your Belly</h1>
        <div className="search">
          <input type="text" name="search" placeholder="Search Food Item" />
          <label htmlFor="search" className="main-btn">
            Search
          </label>
        </div>
      </div>
      <div className="menu">
        <button onClick={() => setMenu(MenuItem)}>All</button>
        <button onClick={() => handlemeal("Breakfast")}>Breakfast</button>
        <button onClick={() => handlemeal("Lunch")}>Lunch</button>
        <button onClick={() => handlemeal("Dinner")}> Dinner</button>
      </div>

      <div className="menu_items container-fluid mt-5">
        <div className="row">
          <div className="col-10 mx-auto">
            <div className="row my-5">
              {menu.map((menuitem) => (
                <Menu menuitem={menuitem} key={menuitem.id}></Menu>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
