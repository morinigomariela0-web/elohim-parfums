import { useState } from 'react';
import {
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  User,
  X,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrencyPYG } from '../data/products';

const WHATSAPP_NUMBER = '595999000000';

export function buildWhatsAppOrderUrl({ items, totalPrice, fullName, address }) {
  const lines = [
    '*NUEVO PEDIDO — ELOHIM PARFUMS*',
    '',
    '*Datos del Cliente:*',
    `• *Nombre:* ${fullName.trim()}`,
    `• *Dirección / Ciudad:* ${address.trim()}`,
    '',
    '*Detalle del Pedido:*',
    ...items.map(
      (item) =>
        `• ${item.quantity}x *${item.nombre}* (${item.codigo} · ${item.genero}) - ${item.size} — ${formatCurrencyPYG(
          item.price * item.quantity
        )}`
    ),
    '',
    `*TOTAL A PAGAR:* ${formatCurrencyPYG(totalPrice)}`,
    '',
    '¡Muchas gracias! Aguardo confirmación para el despacho.',
  ];

  const message = lines.join('\n');
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !address.trim()) {
      setError('Por favor, completa tu nombre y dirección para el delivery.');
      return;
    }
    setError('');
    const url = buildWhatsAppOrderUrl({
      items,
      totalPrice,
      fullName,
      address,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Carrito de compras"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      {/* Slide-over Panel */}
      <aside className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#0f0f0f] text-neutral-100 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c5a059]/30 bg-[#c5a059]/10 text-[#c5a059]">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-semibold tracking-wide text-neutral-100">
                Tu Selección
              </h2>
              <p className="text-xs text-neutral-400">
                {totalItems} {totalItems === 1 ? 'fragancia' : 'fragancias'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeCart}
            className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Cerrar carrito"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Lista de Productos */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-[#141414] text-neutral-500">
                <ShoppingBag className="h-7 w-7" />
              </div>
              <p className="font-serif text-lg text-neutral-200">
                Tu carrito está vacío
              </p>
              <p className="mt-1 max-w-xs text-xs text-neutral-500">
                Explora nuestro catálogo de esencias para Caballeros y Damas y
                elige tu presentación favorita.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-3 rounded-xl border border-white/[0.07] bg-[#141414] p-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-medium uppercase tracking-wider text-[#c5a059]">
                        {item.codigo} · {item.genero}
                      </span>
                    </div>
                    <h3 className="mt-0.5 truncate font-serif text-sm font-semibold text-neutral-100">
                      {item.nombre}
                    </h3>
                    <p className="mt-0.5 text-xs text-neutral-400">
                      Presentación: <span className="text-neutral-200">{item.size}</span> ·{' '}
                      {formatCurrencyPYG(item.price)}
                    </p>

                    {/* Controles de Cantidad */}
                    <div className="mt-3 flex items-center gap-3">
                      <div className="inline-flex items-center rounded-lg border border-white/10 bg-[#0a0a0a]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1.5 text-neutral-400 hover:text-white"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-[24px] text-center text-xs font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1.5 text-neutral-400 hover:text-white"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-neutral-500 transition-colors hover:text-red-400"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#d9b97a]">
                      {formatCurrencyPYG(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-[11px] text-neutral-500 underline-offset-4 hover:text-neutral-300 hover:underline"
                >
                  Vaciar carrito
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer & Checkout por WhatsApp */}
        {items.length > 0 && (
          <form
            onSubmit={handleCheckout}
            className="border-t border-white/10 bg-[#141414] px-6 py-5 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs uppercase tracking-[0.15em] text-neutral-400">
                Total del Pedido
              </span>
              <span className="font-serif text-xl font-bold text-[#d9b97a]">
                {formatCurrencyPYG(totalPrice)}
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#c5a059]">
                Datos para el Delivery
              </p>

              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nombre Completo"
                  className="w-full rounded-xl border border-white/10 bg-[#0a0a0a] py-2.5 pl-9 pr-3 text-xs text-neutral-100 placeholder-neutral-500 outline-none transition-colors focus:border-[#c5a059]"
                />
              </div>

              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Dirección y Ciudad (Ej: Av. España 1234, Asunción)"
                  className="w-full rounded-xl border border-white/10 bg-[#0a0a0a] py-2.5 pl-9 pr-3 text-xs text-neutral-100 placeholder-neutral-500 outline-none transition-colors focus:border-[#c5a059]"
                />
              </div>

              {error && <p className="text-xs text-red-400">{error}</p>}
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#c5a059] py-3.5 px-4 text-xs font-bold uppercase tracking-[0.15em] text-[#0a0a0a] transition-all hover:bg-[#d9b97a] active:scale-[0.99]"
            >
              <MessageCircle className="h-4 w-4" />
              Finalizar Pedido por WhatsApp
            </button>
          </form>
        )}
      </aside>
    </div>
  );
}
