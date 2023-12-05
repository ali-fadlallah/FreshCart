import React from 'react'
import NotfoundImage from '../../Images/error.svg'

export default function NotFound() {
    return (
        <>
            <div className=' text-center py-5'>
                <img src={NotfoundImage} alt="Not_Found_Image" className=' w-50' />
            </div>
        </>
    )
}
