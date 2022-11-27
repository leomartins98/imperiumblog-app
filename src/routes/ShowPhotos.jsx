import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import blogFetch from '../axios/config'
import { useParams } from 'react-router-dom'

import './ShowPhotos.css'

const ShowPhotos = () => {

    const [photos, setPhotos] =useState([])
  const {id} = useParams()

    const getPhotos = async() => {
        try {
            const res = await blogFetch.get(`albums/${id}/photos`)
            const data = res.data
            setPhotos(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect (() => {
        getPhotos()
    }, [])

  return (
    <div className='title-photos'>
        <h2>Fotos do Álbum</h2>
        <div className='gallery'>
            {
                photos.map((photo, index) => (
                    <div key={index} className='item-gallery'>
                        <img src={photo.url} alt={photo.name} className='img-gallery'/>
                    </div>
                ))
            }
    </div>
    </div>
  )
}

export default ShowPhotos