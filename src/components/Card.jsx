import React, { useContext, useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners';
import { PageContext } from '../context/PageContext';

const Card = ({url, nombre, noPokemon, pokemon}) => {

    const [imagen, setImagen] = useState();
    const {setPokemonSeleccionado} = useContext(PageContext)

    const obtenerImagen = async ()=>{
        try {
            const resultado = await fetch(url);
            const datosPokemon = await resultado.json();
            setImagen(datosPokemon.sprites.other.dream_world.front_default);
        } catch (error) {
            console.error(error);
        }

    }

    useEffect(()=>{
        obtenerImagen()
    },[url]);



    return (
    <li 
    onClick={()=>{setPokemonSeleccionado(pokemon)}}
    className='transition duration-300 hover:scale-150 h-[180px] mb-10'>
        {imagen?(<img className="w-[150px] h-[150px] mb-[-40px]" src={imagen}/>):
        <ClipLoader className='m-auto' color="#ce66de"/>
    }
        <div className='bg-slate-800 text-white p-2 pt-10 shadow-2xl shadow-slate-600 rounded'>
            <p className='text-green-200 font-bold text-xl'># {noPokemon}</p>
            <h2 className='text-2xl capitalize'>{nombre}</h2>
        </div>
    </li>
    )
}

export default Card
