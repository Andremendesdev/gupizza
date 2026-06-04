"use client";

type LocationModalProps = {
  typedAddress: string;
  onTypedAddressChange: (value: string) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
};

export function LocationModal({
  typedAddress,
  onTypedAddressChange,
  onClose,
  onSubmit,
}: LocationModalProps) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      id="location-modal-overlay"
    >
      <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-variant shadow-floating w-full max-w-md animate-scale-up text-on-surface font-sans">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">location_on</span>
            <h4 className="font-bold text-lg">Definir Endereço de Entrega</h4>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-on-surface-variant hover:text-primary cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <p className="text-xs text-on-surface-variant">
            Informe o local onde deseja que a sua pizza chegue quentinha em até 35-45 minutos!
          </p>

          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1">
              Seu Endereço
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Av. Paulista, 1000 - Bela Vista"
              value={typedAddress}
              onChange={(e) => onTypedAddressChange(e.target.value)}
              className="w-full px-3 py-2.5 border border-outline/30 rounded-xl bg-surface-container-lowest text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              id="input-address-field"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-xl text-xs hover:bg-surface-container transition-colors cursor-pointer font-semibold text-on-surface font-sans"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-primary hover:bg-surface-tint text-on-primary font-semibold text-xs rounded-xl cursor-pointer transition-colors shadow-sm"
            >
              Confirmar Endereço
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
