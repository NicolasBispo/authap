import { FaHashtag, FaLock } from "react-icons/fa6";
import { BsQrCode, BsSearch } from "react-icons/bs";
import { useEffect, useState } from 'react';

import React from "react";

import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from "axios";
import moment from "moment/moment";


export default function Home() {

    let debug = false

    const [hashMenuOpen, setHashMenuOpen] = useState(false)
    const [qrCodeMenuOpen, setQrCodeMenuOpen] = useState(false)
    const [currentHash, setCurrentHash] = useState(`${debug ? '98e02174c8329db99c42ca6d0a7e4351285376df800f2de4a0b09eff9b43a4b6' : ""}`)
    const [scanResult, setScanResult] = useState(null)

    const [scannerGlobal, setScannerGlobal] = useState(null)
    const [renderBookingStatus, setRenderStatus] = useState(false)
    const [renderInfo, setRenderInfo] = useState({})




    function openMenu(menu) {

        if (menu === 'hash') {

            scannerGlobal.clear()
            setHashMenuOpen(true)
            setQrCodeMenuOpen(false)

        }
        if (menu === 'qrcode') {

            scannerGlobal.render(success, error)
            setHashMenuOpen(false)
            setQrCodeMenuOpen(true)

        }
    }




    function fetchHash() {
        axios.get(`http://localhost:3000/bookings/${currentHash}`).then(resp => {

            setRenderInfo(resp.data)
            setRenderStatus(true)
        })
    }

    function fetchQrHash(result){
        axios.get(`http://localhost:3000/bookings/${result}`).then(resp => {
            console.log('response:', resp)
            setRenderInfo(resp.data)
            setRenderStatus(true)
        })
    }

    function success(result) {
        console.log('result:', result)
        scannerGlobal.clear()
        setScanResult(result)
        
        fetchQrHash(result)
        console.log('result:', result)
    }

    function error(err) {
        //console.warn(err)

    }
    useEffect(() => {
        let scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 400,
                height: 4000
            },
            fps: 5,
        })
        setScannerGlobal(scanner)



    }, [])

    return (
        <div className="bg-index-bg bg-cover flex items-center justify-center h-screen w-screen">

            <div className='w-4/5 h-4/5 bg-slate-100 shadow-inner rounded-sm grid grid-cols-2'>

                {/* Info container  */}
                <div className="w-full h-full bg-black bg-lock-bg bg-center bg-cover bg-no-repeat select-none">

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


                {renderBookingStatus ? (

                    <>

                        <div className="p-2 break-words">

                            <h2 className="text-2xl">Reserva de: {renderInfo.members[0].name} </h2>
                            <hr className="border border-blue-500" />

                            <div className="flex flex-col w-full gap-y-1">

                                <div className="grid grid-cols-3 items-center border-b border-b-blue-500">
                                    <div className="col-span-1 font-bold text-red-700">Código de reserva:</div>
                                    <p className="col-span-2">{renderInfo.id}</p>
                                </div>
                                <div className="grid grid-cols-3 items-center border-b border-b-blue-500">
                                    <div className="col-span-1 font-bold text-red-700">Data de entrada:</div>
                                    <p className="col-span-2">{moment(renderInfo.entryDate).locale('pt-br').format("DD/MM/YYYY")}</p>
                                </div>
                                <div className="grid grid-cols-3 items-center border-b border-b-blue-500">
                                    <div className="col-span-1 font-bold text-red-700">Data de saída:</div>
                                    <p className="col-span-2">{moment(renderInfo.leaveDate).locale('pt-br').format("DD/MM/YYYY")}</p>
                                </div>
                                <div className="grid grid-cols-3 items-center border-b border-b-blue-500">
                                    <div className="col-span-1 font-bold text-red-700">Status da reserva:</div>
                                    <p className="col-span-2">{renderInfo.status}</p>
                                </div>
                                <div className="grid grid-cols-3 items-center border-b border-b-blue-500">
                                    <div className="col-span-1 font-bold text-red-700">Quantidade de hóspedes:</div>
                                    <p className="col-span-2">{renderInfo.members.length}</p>
                                </div>
                                <div className="grid grid-cols-3 items-center border-b border-b-blue-500">
                                    <div className="col-span-1 font-bold text-red-700">Pessoas a comparecer:</div>
                                    <div>
                                        {renderInfo.members.map((member,index) => (
                                            <ul className="flex gap-5" key={index}>
                                                <li>
                                                    {member.name}
                                                </li>
                                                <li>
                                                    {member.rg}
                                                </li>
                                                <li>
                                                    {member.cpf}
                                                </li>
                                            </ul>
                                        ))}
                                    </div>
                                </div>
                                 <div className="grid grid-cols-3 items-center border-b border-b-blue-500">
                                    <div className="col-span-1 font-bold text-red-700">Assinado por:</div>
                                    <p className="col-span-2 text-green-500 font-bold">{renderInfo.signedBy.name}</p>
                                </div>
                                <div className="">
                                    <h1 className="text-2xl">
                                        Instruções para hospedagem
                                    </h1>
                                    <p>• Apresentar documento de liberação impresso ou via celular diretamente na portaria</p>
                                    <p>• Retirar chaves na portaria</p>
                                </div>
                            </div>





                        </div>
                    </>
                ) : (
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

                        <div className="displayedComp w-full flex justify-center">
                            <div id="reader" className={`${qrCodeMenuOpen ? 'block' : 'hidden'} w-4/5`}>

                            </div>
                            {hashMenuOpen ? (
                                <div className='w-4/5 flex items-center'>
                                    <input value={currentHash} onChange={(e) => setCurrentHash(e.target.value)} className='bg-blue-400 text-black placeholder-black p-2 w-4/5 rounded-s-md focus:outline-none' type="text" placeholder='Digite o hash do documento' />
                                    <div onClick={() => fetchHash()} className='bg-orange-400 h-full flex items-center px-2 rounded-e-md cursor-pointer'>
                                        <BsSearch className='text-white text-2xl' />
                                    </div>

                                </div>
                            ) : ""}
                        </div>




                    </div >
                )
                }
                {/* Form container  */}


            </div >



        </div >
    )
}