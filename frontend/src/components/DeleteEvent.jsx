import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

export default function DeleteEvent() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(false)

        const deleteEvent = async() => {
            try{
                setLoading(true)
                const response = await fetch(`http://localhost:5555/api/events/deleteEvent/${id}`, {
                    method: 'DELETE',
                })
                if(!response.ok){
                    throw new Error(`HTTP error ${response.status}`);
                }
                navigate('/dashbord')
                setLoading(false)
            } catch(error){
                console.log(error)
                setLoading(false)
            }
        }
  return (
    <div>
      
    </div>
  )
}
