import { NavLink, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useCharacterContext } from "../../context/CharacterContext";

export const Navbar = () => {

    const [character, setCharacter] = useState(null)


    const fetchCharacterFromLocalStorage = () => {
        const characterObj = localStorage.getItem("character")
        if (characterObj) {
       setCharacter(JSON.parse(characterObj))}
    }
    useEffect(() => {
        fetchCharacterFromLocalStorage()

        window.addEventListener("storage", fetchCharacterFromLocalStorage)

        return () => {
            window.removeEventListener("storage", fetchCharacterFromLocalStorage)
        }
    }, [])

    const navigate = useNavigate()

    const handleChangeCharacter = () => {
        setCharacter(null)
        document.documentElement.setAttribute('data-theme', "neutral")
        localStorage.removeItem("character")
        navigate("/")
    }
  return (
    <nav className="w-full bg-[#1c1c1c] text-white shadow-md">
      <div className="max-w-8xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-white-700 tracking-wide">
          My WoW Character
        </div>

        <div className="flex space-x-6">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `text-lg font-medium transition-colors ${
                isActive
                  ? "text-yellow-400 border-b-2 border-yellow-400 pb-1"
                  : "hover:text-yellow-300"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/mythic-plus"
            className={({ isActive }) =>
              `text-lg font-medium transition-colors ${
                isActive
                  ? "text-yellow-400 border-b-2 border-yellow-400 pb-1"
                  : "hover:text-yellow-300"
              }`
            }
          >
            Mythic +
          </NavLink>

          <NavLink
            to="/raid"
            className={({ isActive }) =>
              `text-lg font-medium transition-colors ${
                isActive
                  ? "text-yellow-400 border-b-2 border-yellow-400 pb-1"
                  : "hover:text-yellow-300"
              }`
            }
          >
            Raid
          </NavLink>
          {character && character.name && (<div className="flex ">
          <img src={character.thumbnail_url} alt={`Thumbnail for ${character.name}`} className="h-15"/>
          <div >
            <h6>{character.name}</h6>
            <button onClick={(handleChangeCharacter)}>Choose new character</button>
          </div>
          </div>)}
        </div>
      </div>
    </nav>
  );
};
