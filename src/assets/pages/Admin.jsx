import { Link, Outlet, Route, Routes } from "react-router-dom";
import NewBooking from "../components/NewBooking";
import { AiOutlineUserAdd } from "react-icons/ai";
import { HiClipboardList } from "react-icons/hi";
import { RiAdminFill } from "react-icons/ri";
import { FaBars } from "react-icons/fa6";
import { useState } from "react";
export default function Admin() {

    const [menuOpen, setMenuOpen] = useState(true)

    return (
        <div className="h-screen w-screen bg-slate-300 flex">
            <div className={`flex break-words flex-col overflow-hidden h-screen ${!menuOpen ? "w-20": "w-64"} duration-150 bg-black bg-gradient-to-b from-slate-950 to-slate-800`}>
                <Link to='/admin' className={`text-white font-[Roboto] flex items-center justify-center text-center mt-4 text-2xl origin-left hover:text-yellow-500`}>{!menuOpen ? (<RiAdminFill/>) : (<><RiAdminFill/> <p>Administrativo</p></>)}</Link>
                <Link to='/admin/newBooking' className="text-white font-[Roboto] text-center mt-4 text-2xl flex items-center justify-center origin-left hover:bg-yellow-500 py-2"><AiOutlineUserAdd /> <p className={`${!menuOpen ? "hidden" : "block"}`}>Nova reserva</p></Link>
                <Link to='/admin/allBookings' className="text-white font-[Roboto] text-2xl flex items-center justify-center hover:bg-yellow-500 py-2 origin-left"><HiClipboardList/> <p className={`${!menuOpen ? "hidden" : "block"} origin-left overflow-hidden whitespace-nowrap`}>Visualizar reservas</p></Link>
            </div>
            <div className="flex flex-col w-full">
                <header className="w-full p-2 flex justify-between">
                    <div onClick={()=> setMenuOpen(!menuOpen)} className="p-2 rounded-sm cursor-pointer hover:bg-yellow-500 hover:text-white border border-black"><FaBars className="text-lg"/></div>
                    <span className="font-bold">Sueli Bispo da Silva</span>
                </header>
                <main className="w-full h-full p-5 shadow-inner-eq" >
                    <Outlet />
                </main>
            </div>

        </div>
    )
}