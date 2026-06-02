import React, { useContext, useEffect, useState } from "react";
import { PageContext } from "../context/PageContext";
import { ClipLoader } from "react-spinners";

const pokemonTypeBackground = {
  normal: "bg-stone-400",
  fire: "bg-orange-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-cyan-300",
  fighting: "bg-red-700",
  poison: "bg-purple-600",
  ground: "bg-amber-600",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-yellow-700",
  ghost: "bg-violet-700",
  dragon: "bg-indigo-700",
  dark: "bg-zinc-700",
  steel: "bg-slate-400",
  fairy: "bg-pink-300",
  stellar: "bg-teal-400",
  unknown: "bg-gray-500",
};

const pokemonTypeBorder = {
  normal: "border-stone-400",
  fire: "border-orange-500",
  water: "border-blue-500",
  electric: "border-yellow-400",
  grass: "border-green-500",
  ice: "border-cyan-300",
  fighting: "border-red-700",
  poison: "border-purple-600",
  ground: "border-amber-600",
  flying: "border-indigo-400",
  psychic: "border-pink-500",
  bug: "border-lime-500",
  rock: "border-yellow-700",
  ghost: "border-violet-700",
  dragon: "border-indigo-700",
  dark: "border-zinc-700",
  steel: "border-slate-400",
  fairy: "border-pink-300",
  stellar: "border-teal-400",
  unknown: "border-gray-500",
};

const pokemonTypeText = {
  normal: "text-stone-400",
  fire: "text-orange-500",
  water: "text-blue-500",
  electric: "text-yellow-500",
  grass: "text-green-500",
  ice: "text-cyan-400",
  fighting: "text-red-700",
  poison: "text-purple-600",
  ground: "text-amber-600",
  flying: "text-indigo-400",
  psychic: "text-pink-500",
  bug: "text-lime-500",
  rock: "text-yellow-700",
  ghost: "text-violet-700",
  dragon: "text-indigo-700",
  dark: "text-zinc-700",
  steel: "text-slate-400",
  fairy: "text-pink-300",
  stellar: "text-teal-400",
  unknown: "text-gray-500",
};

const InfoPokemon = () => {
  const { pokemonSeleccionado, setPokemonSeleccionado } =
    useContext(PageContext);

  const [pokemon, setPokemon] = useState(null);

  const obtenerPokemon = async () => {
    try {
      const respuesta = await fetch(pokemonSeleccionado.url);
      const datos = await respuesta.json();
      setPokemon(datos);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    obtenerPokemon();
  }, []);

  if (!pokemon) {
    return (
      <div className="flex justify-center mt-20">
        <ClipLoader size={60} color="#991b1b" />
      </div>
    );
  }

  const tipoPrincipal = pokemon.types[0].type.name;

  const ataque = pokemon.stats.find(
    (stat) => stat.stat.name === "attack"
  );

  const defensa = pokemon.stats.find(
    (stat) => stat.stat.name === "defense"
  );

  const ataqueEspecial = pokemon.stats.find(
    (stat) => stat.stat.name === "special-attack"
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">

      <button
        onClick={() => setPokemonSeleccionado(null)}
        className="mb-8 px-5 py-2 rounded-full bg-slate-800 text-white font-semibold shadow-lg hover:scale-105 hover:bg-slate-700 transition-all"
      >
        ← Regresar
      </button>

      <div className="bg-white rounded-3xl shadow-xl p-8">

        <p
          className={`text-8xl font-black text-center ${pokemonTypeText[tipoPrincipal]}`}
        >
          #{pokemon.id}
        </p>

        <h1
          className={`text-5xl uppercase tracking-wider font-extrabold text-center mb-8 drop-shadow-md ${pokemonTypeText[tipoPrincipal]}`}
        >
          {pokemon.name}
        </h1>

        <div className="flex flex-col lg:flex-row gap-10">

          {/* Imagen */}
          <div className="lg:w-1/2 flex justify-center">

            <div
              className={`w-72 h-72 rounded-full flex items-center justify-center shadow-xl ${pokemonTypeBackground[tipoPrincipal]}`}
            >
              <img
                src={
                  pokemon.sprites.other["official-artwork"]
                    .front_default
                }
                alt={pokemon.name}
                className="w-60 h-60 object-contain"
              />
            </div>

          </div>

          {/* Información */}
          <div className="lg:w-1/2 flex items-center">

            <div
              className={`w-full border-4 rounded-2xl p-6 shadow-md ${pokemonTypeBorder[tipoPrincipal]}`}
            >
              <h2 className="text-2xl font-bold mb-5">
                Información
              </h2>

              <div className="space-y-5">

                <div>
                  <p className="font-bold mb-3 text-xl">
                    Tipos
                  </p>

                  <div className="flex gap-2 flex-wrap">

                    {pokemon.types.map((tipo) => (
                      <span
                        key={tipo.type.name}
                        className={`${
                          pokemonTypeBackground[tipo.type.name]
                        } text-white px-4 py-2 rounded-xl capitalize font-semibold shadow`}
                      >
                        {tipo.type.name}
                      </span>
                    ))}

                  </div>
                </div>

                <div>
                  <p className="text-lg">
                    <strong>Peso:</strong>{" "}
                    {pokemon.weight / 10} kg
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Estadísticas */}
        <div className="mt-12">

          {/* Ataque */}
          <div className="mb-5">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">
                Ataque
              </span>
              <span>{ataque?.base_stat}</span>
            </div>

            <div className="bg-gray-200 h-3 rounded-full">
              <div
                className={`${pokemonTypeBackground[tipoPrincipal]} h-3 rounded-full`}
                style={{
                  width: `${Math.min(
                    ataque?.base_stat || 0,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>

          {/* Defensa */}
          <div className="mb-5">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">
                Defensa
              </span>
              <span>{defensa?.base_stat}</span>
            </div>

            <div className="bg-gray-200 h-3 rounded-full">
              <div
                className={`${pokemonTypeBackground[tipoPrincipal]} h-3 rounded-full`}
                style={{
                  width: `${Math.min(
                    defensa?.base_stat || 0,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>

          {/* Ataque Especial */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">
                Ataque Especial
              </span>
              <span>{ataqueEspecial?.base_stat}</span>
            </div>

            <div className="bg-gray-200 h-3 rounded-full">
              <div
                className={`${pokemonTypeBackground[tipoPrincipal]} h-3 rounded-full`}
                style={{
                  width: `${Math.min(
                    ataqueEspecial?.base_stat || 0,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default InfoPokemon;