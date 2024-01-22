import NavBar from "../NavBar/NavBar";
import React from 'react'
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import UrlDetail from "../UrlDetail/UrlDetail";
import NoLinks from "../NoLinks/NoLinks";

const MyUrl = () => {
  const [userData, setUserData] = useState<any[]>([]);
  const fetchData = async () => {
    try {
      const token = Cookies.get("Token");
      const response = await fetch(`https://shorturl-qavg.onrender.com/myurls`, {
        credentials: 'include',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json", 
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUserData(data); // Actualiza el estado con los datos obtenidos
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };
  useEffect(() => {
   
    
    fetchData(); 
  }, [userData]);
  const handleRemove = async (id: string) => {
    try {
      const token = Cookies.get("Token");
      await fetch(`https://shorturl-qavg.onrender.com/${id}`, {
        method: 'DELETE',
        credentials: "include",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json", 
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(prevState => prevState.filter(data => data._id !== id)); // Actualiza el estado eliminando el elemento eliminado
    } catch (error) {
      console.error("Error al eliminar datos:", error);
    }
  }

  return (
    <>
      <NavBar></NavBar>
      <div  className="flex flex-wrap justify-center">
        {userData.length < 1 ? <NoLinks></NoLinks> : userData.map((data) => (
          <UrlDetail key={data._id} data={data}  onRemove={() => handleRemove(data._id)}/>
        ))}
      </div>
    </>
  );
};

export default MyUrl
