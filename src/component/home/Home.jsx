import React, { useEffect, useState } from "react";
import "./home.css";
import axios from "axios";
import { getData } from "../../urls/url";
import { Skeleton } from "antd";

import Card from "./Card";

const Home = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(getData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoading(false);
      setUserData(response.data.userData);
      console.log(response.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <section className="home-section">
      <p className="home-title">User Data</p>
      <div className="home-content">
        {loading
          ? array.map((item, index) => {
              return (
                <div className="card" key={index}>
                  <Skeleton active />
                </div>
              );
            })
          : userData.map((user, index) => {
              return <Card user={user} index={index} key={index} />;
            })}
      </div>
    </section>
  );
};

export default Home;
