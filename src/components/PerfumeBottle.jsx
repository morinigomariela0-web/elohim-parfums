import React from 'react';

/**
 * Renderiza dinámicamente el frasco correspondiente al género ('Caballero', 'Dama' o 'Unisex')
 * y superpone la etiqueta personalizada con posicionamiento absoluto.
 */
export default function PerfumeBottle({ category, gender, name, size = '30 ml', className = '' }) {
  const normalizedGender = (gender || category || '').toLowerCase();
  const isCaballero = normalizedGender === 'caballero';
  const isUnisex = normalizedGender === 'unisex';

  const bgImage = isUnisex
    ? '/images/bottle-unisex.jpg'
    : isCaballero
      ? '/images/bottle-caballero.jpg'
      : '/images/bottle-dama.jpg';

  const labelBoxStyle = isCaballero
    ? {
        position: 'absolute',
        top: '60.2%',
        left: '41.3%',
        width: '19.6%',
        height: '8.7%',
      }
    : isUnisex
      ? {
          position: 'absolute',
          top: '52.3%',
          left: '36.1%',
          width: '28.0%',
          height: '22.8%',
        }
      : {
          position: 'absolute',
          top: '45.8%',
          left: '38.3%',
          width: '31.2%',
          height: '27.2%',
        };

  return (
    <div
      className={`relative w-full aspect-[3/4] overflow-hidden rounded-xl bg-[#0e0e0e] bg-cover bg-center select-none ${className}`}
      style={{ backgroundImage: `url('${bgImage}')` }}
      role="img"
      aria-label={`Frasco Elohim Parfums ${name} ${size}`}
    >
      {/* Sutil viñeta para integrar el frasco con el fondo oscuro de la tarjeta */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#141414]/60 via-transparent to-black/20" />

      {isCaballero ? (
        /* Etiqueta para frasco azul cilíndrico (Caballero) */
        <div
          style={labelBoxStyle}
          className="flex flex-col items-center justify-center rounded-[2px] border border-[#2c2c2c]/60 bg-[#f3f2ee] px-1 py-0.5 text-center shadow-[0_1px_4px_rgba(0,0,0,0.45)]"
        >
          <div className="flex h-full w-full flex-col items-center justify-center border border-[#c5a059]/40 px-0.5 leading-none">
            <span className="font-serif text-[5.5px] sm:text-[6px] font-bold tracking-[0.16em] text-[#111111] uppercase">
              ELOHIM
            </span>
            <span className="mt-[1px] line-clamp-2 font-serif text-[5.5px] sm:text-[6.2px] font-semibold leading-[1.05] text-[#1a1a1a]">
              {name}
            </span>
            <span className="mt-[1px] font-sans text-[4.5px] sm:text-[5px] font-medium tracking-wider text-[#555555]">
              {size}
            </span>
          </div>
        </div>
      ) : (
        /* Etiqueta para frasco rojo cuadrado (Dama) o negro dorado (Unisex) */
        <div
          style={labelBoxStyle}
          className="flex flex-col items-center justify-center rounded-[2px] bg-[#f3ede2] p-1 shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
        >
          <div className="flex h-full w-full flex-col items-center justify-between border border-[#c5a059]/80 px-1.5 py-2 text-center">
            <span className="font-serif text-[7px] sm:text-[8px] font-semibold tracking-[0.2em] text-[#8a6a2e] uppercase">
              ELOHIM
            </span>
            <span className="line-clamp-3 font-serif text-[8.5px] sm:text-[10px] font-bold leading-[1.15] text-[#161616]">
              {name}
            </span>
            <span className="font-sans text-[6.5px] sm:text-[7.5px] font-medium tracking-widest text-[#52483a]">
              {size}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
