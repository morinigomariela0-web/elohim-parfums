import { useState } from 'react';
import { Check, ShoppingBag, Sparkles } from 'lucide-react';
import PerfumeBottle from './PerfumeBottle';
import { SIZES, formatCurrencyPYG } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const [selectedSize, setSelectedSize] = useState(SIZES[0]);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#141414] transition-all duration-300 hover:border-[#c5a059]/40 hover:shadow-[0_12px_40px_-15px_rgba(197,160,89,0.2)]">
      {/* Frasco Dinámico */}
      <div className="relative p-3 pb-0">
        <PerfumeBottle
          category={product.genero}
          name={product.nombre}
          size={selectedSize.label}
        />

        {/* Código y Género */}
        <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-1.5">
          <span className="rounded-full border border-white/10 bg-black/70 px-2.5 py-0.5 text-[10px] font-medium tracking-wider text-neutral-300 backdrop-blur-md">
            {product.codigo}
          </span>
          <span className="rounded-full border border-[#c5a059]/30 bg-[#c5a059]/15 px-2.5 py-0.5 text-[10px] font-medium tracking-wider text-[#d9b97a] backdrop-blur-md">
            {product.genero}
          </span>
        </div>
      </div>

      {/* Información de la Fragancia */}
      <div className="flex flex-1 flex-col justify-between p-5 pt-4">
        <div>
          <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-[#c5a059]">
            <Sparkles className="h-3 w-3 shrink-0" />
            <span className="truncate">{product.familia}</span>
          </p>

          <h3 className="mt-1.5 font-serif text-lg font-semibold leading-snug text-neutral-100 group-hover:text-[#d9b97a] transition-colors">
            {product.nombre}
          </h3>

          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-neutral-400">
            <span className="text-neutral-500">Notas:</span> {product.notas}
          </p>
        </div>

        {/* Selector de Tamaño (3 botones directos) + Botón de Compra */}
        <div className="mt-5 space-y-3">
          <div className="grid grid-cols-3 gap-2" role="group" aria-label="Seleccionar tamaño">
            {SIZES.map((size) => {
              const isActive = selectedSize.key === size.key;
              return (
                <button
                  key={size.key}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`flex flex-col items-center justify-center rounded-lg border py-2 px-1 text-center transition-all duration-200 ${
                    isActive
                      ? 'border-[#c5a059] bg-[#c5a059]/15 text-[#f5e7c8] shadow-[0_0_12px_rgba(197,160,89,0.18)]'
                      : 'border-white/10 bg-[#0a0a0a]/60 text-neutral-400 hover:border-white/25 hover:text-neutral-200'
                  }`}
                >
                  <span className="text-xs font-semibold">{size.label}</span>
                  <span
                    className={`mt-0.5 text-[10px] ${
                      isActive ? 'text-[#c5a059]' : 'text-neutral-500'
                    }`}
                  >
                    {formatCurrencyPYG(size.price)}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-200 ${
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-[#c5a059] text-[#0a0a0a] hover:bg-[#d9b97a] active:scale-[0.99]'
            }`}
          >
            {added ? (
              <>
                <Check className="h-4 w-4" />
                Agregado al carrito
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4" />
                Agregar · {formatCurrencyPYG(selectedSize.price)}
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
