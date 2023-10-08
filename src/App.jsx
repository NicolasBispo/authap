import './App.css' //reset css
import { FaHashtag, FaLock } from "react-icons/fa6";
import { BsQrCode, BsSearch } from "react-icons/bs";
import { useState } from 'react';


export default function App() {

  const [hashMenuOpen, setHashMenuOpen] = useState(false)
  const [qrCodeMenuOpen, setQrCodeMenuOpen] = useState(false)

  const [currentHash, setCurrentHash] = useState("")

  function openMenu(menu) {
    if (menu === 'hash') {
      setHashMenuOpen(true)
      setQrCodeMenuOpen(false)
    }
    if (menu === 'qrcode') {
      setHashMenuOpen(false)
      setQrCodeMenuOpen(true)
    }
  }

  return (
    <div className="bg-index-bg bg-cover flex items-center justify-center h-screen w-screen">

      <div className='w-4/5 h-4/5 bg-slate-100 shadow-inner rounded-sm grid grid-cols-2'>

        <div className="w-full h-full bg-black bg-lock-bg bg-center bg-cover bg-no-repeat select-none">

          {/* Info container  */}
          <div className='h-full w-full bg-black bg-opacity-60 text-center flex flex-col justify-center items-center'>
            <span className='text-white text-center text-4xl w-full font-[Roboto] '>
              Verifique sua reserva
            </span>
            <FaLock className='text-center text-white text-9xl mt-4' />
            <span className='text-yellow-600 bg-black bg-opacity-70 font-bold text-center text-2xl mt-3 w-full font-[Roboto] '>
              Scaneie o QRCODE no seu documento de liberação
              <br></br>
              ou
              <br></br>
              Insira a hash escrita no documento
            </span>
          </div>


        </div>


        {/* Form container  */}
        <div className="h-full w-full flex flex-col items-center justify-center gap-4">

          <div className="flex gap-5">
            <div onClick={() => { openMenu('qrcode') }} className={`p-2 inline-flex border text-white bg-blue-600   border-slate-900 rounded-sm hover:bg-blue-900 hover:text-white duration-75 cursor-pointer`}>
              <BsQrCode className='text-2xl me-2' />
              Ler QrCode
            </div>
            <div onClick={() => { openMenu('hash') }} className="p-2 inline-flex border text-white bg-blue-600  border-slate-900 rounded-sm hover:bg-blue-900 hover:text-white duration-75 cursor-pointer">
              <FaHashtag className='text-2xl me-2' />
              Digitar hash
            </div>
          </div>

          {qrCodeMenuOpen ? "Camera" : ""}

          {hashMenuOpen ? (
            <div className='w-4/5 flex items-center'>
              <input value={currentHash} onChange={(e) => setCurrentHash(e.target.value)} className='bg-blue-400 text-black placeholder-black p-2 w-4/5 rounded-s-md focus:outline-none' type="text" placeholder='Digite o hash do documento' />
              <div onClick={()=> fetchHash()} className='bg-orange-400 h-full flex items-center px-2 rounded-e-md cursor-pointer'>
                <BsSearch className='text-white text-2xl'/>
              </div>
              
            </div>
          ) : ""}
        </div>
      </div>



    </div>
  )
}