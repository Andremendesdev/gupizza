const MAIN_IMAGE = "/img1.png";

const GALLERY_IMAGES = ["/teste1.png", "/img2.png", "/teste2.png"];

type GalleryPhotoProps = {
  src: string;
  className?: string;
  id?: string;
  large?: boolean;
};

function GalleryPhoto({ src, className = "", id, large = false }: GalleryPhotoProps) {
  return (
    <div
      id={id}
      className={`group relative overflow-hidden rounded-3xl border border-surface-variant/30 bg-surface-container shadow-soft transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-premium hover:border-primary/30 ${className}`}
    >
      <img
        src={src}
        alt=""
        aria-hidden
        className="w-full h-full object-cover select-none transition-transform duration-700 ease-out group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-green-900/50 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
      <div className="pointer-events-none absolute inset-0 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/15" />
      {large && (
        <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-white opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
          <span className="material-symbols-outlined text-[18px]">zoom_in</span>
          <span className="text-xs font-semibold tracking-wide">Ver ambiente</span>
        </div>
      )}
    </div>
  );
}

export function OurSpace() {
  return (
    <section className="py-16 md:py-24 bg-surface-container-low" id="our-space-section">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="mb-8 md:mb-10">
          <span className="text-primary font-label-md text-label-md uppercase tracking-wider mb-2 block font-sans font-bold">
            Galeria
          </span>
          <h2 className="font-headline-md text-headline-md md:text-display-lg md:font-display-lg text-on-surface leading-tight">
            O Nosso Espaço
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <GalleryPhoto
            src={MAIN_IMAGE}
            large
            id="space-image-container"
            className="lg:col-span-2 aspect-[4/3] lg:min-h-[360px] lg:aspect-auto"
          />

          <div className="grid grid-cols-3 lg:grid-cols-1 gap-4">
            {GALLERY_IMAGES.map((src, index) => (
              <GalleryPhoto
                key={src}
                src={src}
                id={`space-gallery-${index}`}
                className="aspect-square lg:aspect-[4/3]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
