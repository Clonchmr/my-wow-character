import {  useEffect, useState } from "react";
import {motion} from "framer-motion"
import React from "react";
import { naRealms } from "../data/realmsList";
import { useCharacterContext } from "../context/CharacterContext";
import { getCharacter } from "../services/characterService";
import { useNavigate } from "react-router-dom";

export const ChooseCharacter = () => {
  const [characterData, setCharacterData] = useState({region: "", realm: "", name: ""});
  const [chosenRegion, setChosenRegion] = useState<string[]>([])
  const {characterInfo, setCharacterInfo} = useCharacterContext()
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const regions: {name: string, value: string}[] = [
    { name: "NA & OCE", value: "us" },
    { name: "EU", value: "eu" },
    { name: "KR", value: "kr" },
    { name: "TW", value: "tw" },
  ];

useEffect(() => {
  if (characterData.region === "us") setChosenRegion(naRealms)
  // else if (characterData.region === "eu") setChosenRegion("euRealms")
  // else if (characterData.region === "kr") setChosenRegion("krRealms")
  // else if (characterData.region === "tw") setChosenRegion("twRealms")
}, [characterData.region])

  const handleInputChange = (e) => {
    const {name, value} = e.target

    setCharacterData((prev) => ({
        ...prev,
        [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const characterName = characterData.name.toLowerCase()
    const characterRealm = characterData.realm.toLowerCase().replace(/\s+/g, "-")

    try {
      const data = await getCharacter(characterData.region, characterRealm, characterName)
      const characterObj = {
        name: data.name,
        race: data.race,
        class: data.class,
        active_spec_name: data.active_spec_name,
        gender: data.gender,
        faction: data.faction,
        thumbnail_url: data.thumbnail_url,
        region: data.region,
        realm: data.realm,
        itemLevel: data.gear.item_level_equipped,
        guild: data.guild.name,
        mythicPlusScore: data.mythic_plus_scores_by_season[0],
        raidProgression: data.raid_progression
      }
      localStorage.setItem("character", JSON.stringify(characterObj))
      setCharacterInfo(characterObj)

      const faction = characterObj.faction?.toLowerCase();
      if (faction === "horde" || faction === "alliance") {
        document.documentElement.setAttribute("data-theme", faction);
      }

      
      navigate("/home")
      
    } catch (error) {
      console.error("API Error:", error)
    } finally {
      setLoading(false)
    }
  }
  

  return (
    <motion.div   className="character-select-container p-6"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.5 }}>
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-300 pb-12">
            <h2 className="text-lg font-semibold text-gray-900">
              Character Selection
            </h2>
            <p className="text-sm text-gray-600">
              Fill out the fields below to find your character
            </p>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Region */}
              <div>
                <label
                  htmlFor="region-selection"
                  className="block text-sm font-medium text-gray-700"
                >
                  Region
                </label>
                <select
                  id="region-selection"
                  name="region"
                  value={characterData.region}
                  required
                  className="mt-1 w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => handleInputChange(e)}
                >
                  <option value="">Select Region</option>
                  {regions.map((r) => (
                    <option key={r.name} value={r.value}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Realm */}
              { characterData.region !== "" && <div>
                <label
                  htmlFor="realm-selection"
                  className="block text-sm font-medium text-gray-700"
                >
                  Realm
                </label>
                <input
                  type="text"
                  name="realm"
                  required
                  id="realm-selection"
                  list="realm-options"
                  placeholder="Enter realm name"
                  className="mt-1 w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => handleInputChange(e)}
                />

                <datalist id="realm-options">
                  {chosenRegion.map((realm) => (
                    <option key={realm} value={realm} />
                  ))}
                </datalist>
              </div>}

              {/* Name */}
              {characterData.realm !== "" && <div>
                <label
                  htmlFor="name-selection"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  id="name-selection"
                  placeholder="Enter character name"
                  className="mt-1 w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  onChange={((e) => handleInputChange(e))}
                />
              </div>}
             {characterData.name !== "" && (
              <button 
              type="submit"
              className="mt-5 h-11 bg-emerald-400 hover:bg-emerald-600"
              onClick={handleSubmit}
              disabled={loading}>
                {loading? (
                  <motion.div className="h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                  />
                ) : ("Go")}
                </button>)}
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  );
};