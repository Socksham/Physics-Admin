import React from 'react'

const Navbar = ({ history }) => {
    const physicURL = "http://localhost:3000";
    return (
        <div className="bg-black pr-14 pl-14 pb-4 pt-4 flex justify-between items-center z-40 select-none animate-fade-in-down border-b-2 border-gray-700 sticky top-0">
            <div className="flex justify-center text-glass cursor-pointer" onClick={() => { window.location.href = physicURL+"/" }}>
                        <p className="font-bold text-xl">Conant</p>
                        <p className="text-xl">Physics</p>

                    <p className="text-xl">Admin</p>
            </div>
            <div className="flex justify-center text-glass cursor-pointer" onClick={() => { window.location.href = physicURL+"/login" }}>
                    <p className="font-bold text-xl">LOGIN</p>
            </div>
        </div>
    )
}

export default Navbar
