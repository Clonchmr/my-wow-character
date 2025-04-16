import React, { createContext, useContext, useState } from "react";

interface CharacterContextType {
    characterInfo: {region: string, realm: string, name: string, race: string, class: string, active_spec_name: string, gender: string, faction: string, thumbnail_url: string}
    setCharacterInfo: React.Dispatch<React.SetStateAction<{region: string; realm: string; name: string; race: string; class: string; active_spec_name: string; gender: string; faction: string; thumbnail_url: string}>>
}

const CharacterContext = createContext<CharacterContextType | undefined>(undefined)

export const CharacterProvider: React.FC = ({children}) => {
    const [characterInfo, setCharacterInfo] = useState({region: "", realm: "", name: "", race: "", class: "", active_spec_name: "", gender: "", faction: "", thumbnail_url: ""})

    return (
        <CharacterContext.Provider value={{characterInfo, setCharacterInfo}}>
            {children}
        </CharacterContext.Provider>
    )
}

export const useCharacterContext = () => {
    const context = useContext(CharacterContext)
    if (!context) {
        throw new Error("useCharacterContext must be used within CharacterProvider")
    }
    return context
}