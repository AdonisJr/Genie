import React from 'react'

export default function ImageCollectionsList({id, img_url}: any) {
    console.log(img_url)
  return (
    
    <div>
        <p>Images</p>
        <img key={id} src={img_url} alt="Collections" />
    </div>
  )
}
