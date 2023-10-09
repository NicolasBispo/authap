import axios from "axios"
import moment from "moment"
import { useEffect, useState } from "react"

export default function AllBookings() {

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/bookings').then(resp => {
            console.log('resp:', resp)
            setData(resp.data)
        })
    }, [])

    return (
        <>
            <table className="w-full">
                <thead>
                    <tr className="w-full grid grid-cols-9 gap-2 border-b border-b-black">
                        <th className="">Id da reserva</th>
                        <th className="">Data de saida</th>
                        <th className="">Data de entrada</th>
                        <th>Checkin/Checkout</th>
                        <th className="">Qtde pessoas</th>
                        <th className="">Pessoas</th>
                        <th className="">Status</th>
                        <th className="">Assinado por</th>
                        <th className="">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((register, index) => (
                        <tr className="w-full grid grid-cols-9 gap-2 text-center border-b items-center border-b-black py-1" key={index} data-register={register}>
                            <td className="truncate  flex items-center justify-center">{register.id}</td>
                            <td className="h-full flex items-center justify-center">{moment(register.entryDate).format('DD/MM/YYYY')}</td>
                            <td className="h-full flex items-center justify-center">{moment(register.leaveDate).format('DD/MM/YYYY')}</td>
                            <td>
                                <ul>
                                    <li>CheckIn: {register.checkInfo.in}</li>
                                    <li>CheckOut: {register.checkInfo.out}</li>
                                </ul>
                            </td>
                            <td className="h-full flex items-center justify-center" >{register.members.length}</td>
                            <td className="">
                                <ul>
                                    {register.members.map(member => (

                                        <li key={member}>{member.name}</li>

                                    ))}
                                </ul>
                            </td>
                            <td className={` flex items-center justify-center rounded-sm ${register.status === 'Concluído' ? 'bg-green-500' : ""} ${register.status === 'Em andamento' ? "bg-orange-400" : ""} ${register.status === 'Cancelado' ? "bg-rose-600" : ""}`}>{register.status}</td>
                            <td className=" h-full flex items-center justify-center">{register.signedBy.name}</td>
                            <td className="flex flex-col">
                                <button className="bg-yellow-500 hover:bg-orange-600 rounded-sm">Editar</button>
                                <button className="bg-rose-500 hover:bg-rose-800 rounded-sm">Deletar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </>
    )
}