import React, { useEffect, useState } from "react"
import "../styles/home.css"
import {motion} from "framer-motion"
export const Home = () => {

    const [characterInfo, setCharacterInfo] = useState({})

    useEffect(() => {
       const character =  localStorage.getItem("character")
       if (character) {
        setCharacterInfo(JSON.parse(character))
       }
    }, [])

    const todaysDate = () => {
        const date = new Date()
        let day = date.getDate()
        let month = date.getMonth()
        let year = date.getFullYear()

        return `${month}-${day}-${year}`
    }
    return (
        <motion.div className="home-container w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.7 }}>
            <div className="header flex justify-around w-full text-white mt-20">
                <div className="header-left  flex items-center">
                    <div className="header-pic">
                        <img src={characterInfo.thumbnail_url} alt={`Thumbnail for ${characterInfo.name}`} className="me-4"/>
                    </div>
                    <div className="character-info">
                        <h4>{characterInfo.name}</h4>
                        <h6>{characterInfo.active_spec_name + " " + characterInfo.class}</h6>
                        <h6>{characterInfo.guild}</h6>
                    </div>
                    </div>
                    <div className="header-right flex items-center">
                        <h3>As of: {todaysDate()}</h3>
                    </div>
            </div>
            <div className="flex justify-around mt-50">
                <section className="border border-3 border-double rounded-sm p-16 border-color text-white"><p className="mb-3">Item Level</p>{characterInfo.itemLevel}</section>
                <section className="border border-3 border-double rounded-sm p-16 border-color text-white" >M+ score<p className="font-bold text-shadow-white" style={{color: `${characterInfo.mythicPlusScore?.segments?.all?.color}`}}>{characterInfo.mythicPlusScore?.scores?.all}</p></section>
            </div>
        </motion.div>
    )
}