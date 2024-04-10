import React, { useEffect, useState } from 'react'

export const Home = () => {
    const [pets, setPets] = useState(null)

    useEffect(() => {
        const fetchPets = async () => {
            const response = await fetch("/api/pets")
            const json = await response.json()

            if (response.ok) {
                setPets(json)
            }
        }

        fetchPets()
    }, [])

    return (
      <div className='Home'>
            <div>
                {pets && pets.map((pet) => (
                    <p key={pet._id}>{ pet.name }</p>
                ))}
        </div>
      </div>
    )
}
