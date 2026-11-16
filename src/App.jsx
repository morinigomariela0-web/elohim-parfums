import { useMemo, useState } from 'react';
import { Search, ShoppingBag, Sparkles, SlidersHorizontal, X } from 'lucide-react';
import { caballeros, damas, unisexProducts, allProducts, SIZES, formatCurrencyPYG } from './data/products';
import { CartProvider, useCart } from './context/CartContext';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';

const PAGE_SIZE = 24;

function Storefront() {
  const [genderFilter, setGenderFilter] = useState('Todos');
  const [familyFilter, setFamilyFilter] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const { openCart, totalItems } = useCart();

  const baseList = useMemo(() => {
    if (genderFilter === 'Caballeros') return caballeros;
    if (genderFilter === 'Damas') return damas;
    if (genderFilter === 'Unisex') return unisexProducts;
    return allProducts;
  }, [genderFilter]);

  const availableFamilies = useMemo(() => {
    const set = new Set(baseList.map((p) => p.familia));
    return ['Todas', ...Array.from(set).sort((a, b) => a.localeCompare(b, 'es'))];
  }, [baseList]);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return baseList.filter((item) => {
      const matchesFamily =
        familyFilter === 'Todas' || item.familia === familyFilter;
      if (!matchesFamily) return false;

      if (!q) return true;
      return (
        item.nombre.toLowerCase().includes(q) ||
        item.codigo.toLowerCase().includes(q) ||
        item.familia.toLowerCase().includes(q) ||
        item.notas.toLowerCase().includes(q)
      );
    });
  }, [baseList, familyFilter, searchQuery]);

  const isSearchingOrFiltered =
    searchQuery.trim() !== '' || familyFilter !== 'Todas';

  const displayedProducts = isSearchingOrFiltered
    ? filteredProducts
    : filteredProducts.slice(0, visibleCount);

  const handleGenderChange = (nextGender) => {
    setGenderFilter(nextGender);
    setFamilyFilter('Todas');
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-100 flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#0a0a0a]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c5a059]/50 bg-[#c5a059]/10 text-[#c5a059] transition-transform group-hover:scale-105">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <span className="block font-serif text-lg sm:text-xl font-bold tracking-[0.18em] text-neutral-100 uppercase">
                ELOHIM
              </span>
              <span className="block text-[10px] font-medium tracking-[0.34em] text-[#c5a059] uppercase">
                Parfums
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
            <button
              type="button"
              onClick={() => handleGenderChange('Todos')}
              className={`transition-colors hover:text-[#d9b97a] ${
                genderFilter === 'Todos' ? 'text-[#c5a059]' : ''
              }`}
            >
              Catálogo Completo
            </button>
            <button
              type="button"
              onClick={() => handleGenderChange('Caballeros')}
              className={`transition-colors hover:text-[#d9b97a] ${
                genderFilter === 'Caballeros' ? 'text-[#c5a059]' : ''
              }`}
            >
              Caballeros ({caballeros.length})
            </button>
            <button
              type="button"
              onClick={() => handleGenderChange('Damas')}
              className={`transition-colors hover:text-[#d9b97a] ${
                genderFilter === 'Damas' ? 'text-[#c5a059]' : ''
              }`}
            >
              Damas ({damas.length})
            </button>
            <button
              type="button"
              onClick={() => handleGenderChange('Unisex')}
              className={`transition-colors hover:text-[#d9b97a] ${
                genderFilter === 'Unisex' ? 'text-[#c5a059]' : ''
              }`}
            >
              Unisex ({unisexProducts.length})
            </button>
          </nav>

          <button
            type="button"
            onClick={openCart}
            className="relative inline-flex items-center gap-2.5 rounded-full border border-[#c5a059]/40 bg-[#141414] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-100 transition-all hover:border-[#c5a059] hover:bg-[#c5a059]/15"
            aria-label="Abrir carrito"
          >
            <ShoppingBag className="h-4 w-4 text-[#c5a059]" />
            <span className="hidden sm:inline">Carrito</span>
            {totalItems > 0 && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#c5a059] px-1.5 text-[11px] font-bold text-[#0a0a0a]">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="top" className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(197,160,89,0.14),_transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#c5a059]/30 bg-[#c5a059]/10 px-4 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-[#d9b97a]">
            Alta Perfumería · Esencias Exclusivas
          </p>
          <h1 className="mt-5 font-serif text-4xl font-bold tracking-tight text-neutral-100 sm:text-5xl lg:text-6xl">
            El Arte de Dejar{' '}
            <span className="italic font-normal text-[#c5a059]">Huella</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base">
            Descubre más de {allProducts.length} fragancias inspiradas en las casas
            de perfumería más prestigiosas del mundo. Elaboradas con máxima fijación
            en tres presentaciones exclusivas.
          </p>

          {/* Precios Destacados */}
          <div className="mx-auto mt-8 inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 rounded-2xl border border-white/[0.08] bg-[#141414]/90 px-6 py-3.5 backdrop-blur-md">
            {SIZES.map((s, idx) => (
              <div key={s.key} className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-neutral-200">{s.label}</span>
                <span className="text-[#c5a059] font-bold">
                  {formatCurrencyPYG(s.price)}
                </span>
                {idx < SIZES.length - 1 && (
                  <span className="hidden sm:inline-block ml-4 h-3 w-px bg-white/15" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filtros y Búsqueda */}
      <section className="mx-auto w-full max-w-7xl px-4 pt-8 pb-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-[#141414] p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          {/* Tabs de Género */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { key: 'Todos', label: `Todos (${allProducts.length})` },
              { key: 'Caballeros', label: `Caballeros (${caballeros.length})` },
              { key: 'Damas', label: `Damas (${damas.length})` },
              { key: 'Unisex', label: `Unisex (${unisexProducts.length})` },
            ].map((tab) => {
              const active = genderFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => handleGenderChange(tab.key)}
                  className={`rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-all ${
                    active
                      ? 'bg-[#c5a059] text-[#0a0a0a]'
                      : 'border border-white/10 bg-[#0a0a0a] text-neutral-400 hover:border-white/25 hover:text-neutral-200'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Buscador + Familia Olfativa */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1 sm:w-72">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar perfume, código o nota..."
                className="w-full rounded-xl border border-white/10 bg-[#0a0a0a] py-2.5 pl-10 pr-9 text-xs text-neutral-100 placeholder-neutral-500 outline-none transition-colors focus:border-[#c5a059]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                  aria-label="Limpiar búsqueda"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="relative">
              <SlidersHorizontal className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#c5a059]" />
              <select
                value={familyFilter}
                onChange={(e) => setFamilyFilter(e.target.value)}
                aria-label="Filtrar por familia olfativa"
                className="w-full sm:w-56 appearance-none rounded-xl border border-white/10 bg-[#0a0a0a] py-2.5 pl-9 pr-8 text-xs text-neutral-200 outline-none transition-colors focus:border-[#c5a059]"
              >
                {availableFamilies.map((fam) => (
                  <option key={fam} value={fam}>
                    {fam === 'Todas' ? 'Todas las familias' : fam}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
          <span>
            Mostrando{' '}
            <strong className="text-neutral-200">{displayedProducts.length}</strong> de{' '}
            <strong className="text-neutral-200">{filteredProducts.length}</strong>{' '}
            fragancias
          </span>
          {(searchQuery || familyFilter !== 'Todas' || genderFilter !== 'Todos') && (
            <button
              type="button"
              onClick={() => {
                setGenderFilter('Todos');
                setFamilyFilter('Todas');
                setSearchQuery('');
                setVisibleCount(PAGE_SIZE);
              }}
              className="text-[#c5a059] hover:underline"
            >
              Restablecer filtros
            </button>
          )}
        </div>
      </section>

      {/* Grid de Productos */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-16 pt-4 sm:px-6 lg:px-8">
        {displayedProducts.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.06] bg-[#141414] py-20 text-center">
            <p className="font-serif text-xl text-neutral-200">
              No encontramos fragancias con ese criterio
            </p>
            <p className="mt-2 text-xs text-neutral-500">
              Intenta buscar por otro nombre, código (ej. CC116) o nota olfativa.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {displayedProducts.map((product) => (
                <ProductCard
                  key={`${product.genero}-${product.codigo}`}
                  product={product}
                />
              ))}
            </div>

            {!isSearchingOrFiltered && visibleCount < filteredProducts.length && (
              <div className="mt-12 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                  className="rounded-xl border border-[#c5a059]/50 bg-[#141414] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#d9b97a] transition-all hover:bg-[#c5a059] hover:text-[#0a0a0a]"
                >
                  Cargar más fragancias ({filteredProducts.length - visibleCount}{' '}
                  restantes)
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-[#070707] py-8 text-center">
        <p className="font-serif text-sm tracking-[0.2em] text-[#c5a059] uppercase">
          Elohim Parfums
        </p>
        <p className="mt-1.5 text-xs text-neutral-500">
          Alta Perfumería · Envíos a todo el Paraguay · Pedidos directos por WhatsApp
        </p>
      </footer>

      {/* Slide-over del Carrito */}
      <CartDrawer />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Storefront />
    </CartProvider>
  );
}
