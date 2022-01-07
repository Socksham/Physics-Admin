import React, { useEffect, useState } from 'react'
import {ControlPointRounded } from '@material-ui/icons/'

const NewDayCard = ({ day, name, homework, extras }) => {

    const [show, setShow] = useState(false)

    useEffect(() => {
        console.log("EXTRAS FROM PARENT")
        // console.log(extras[0].length)
    }, [])
    
    return (
        <div className="animate-fade-in-down box-content h-43 w-39 p-4 rounded-b-xl bg-black rounded-t-xl shadow-xl">
            {/* <div className="shadow-xl" > */}
                <div className="flex space-x-4 items-center bg-black rounded-t-xl p-4 fade-in">
                    <div className="">
                    </div>
                    <p className="text-white">{name}</p>
                </div>
                <div className="p-4 text-white box-content flex justify-center">
                    <br></br>
                    <ControlPointRounded/>
                    <br></br>
                {/* </div> */}
            </div>

        </div>
    )
}

export default NewDayCard