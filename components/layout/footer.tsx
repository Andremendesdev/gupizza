import Link from "next/link";

const ADDRESS = "Av. Paulista, 1200 - Bela Vista, São Paulo - SP";
const PHONE = "(11) 3224-4000";
const PHONE_HREF = "tel:+551132244000";
const MAPS_EMBED =
  "https://maps.google.com/maps?q=Av.+Paulista,+1200+-+Bela+Vista,+S%C3%A3o+Paulo+-+SP&t=&z=16&ie=UTF8&iwloc=&output=embed";
const MAPS_LINK = "https://maps.google.com/?q=Av.+Paulista,+1200+-+Bela+Vista,+São+Paulo+-+SP";

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: "photo_camera",
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: "share",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/551132244000",
    icon: "chat",
  },
] as const;

export function Footer() {
  return (
    <footer className="relative mt-12 font-sans text-sm" id="site-footer">
      {/* Mapa em tela cheia no topo */}
      <div className="relative h-[280px] sm:h-[340px] md:h-[420px] w-full overflow-hidden">
        <iframe
          title="Localização Pizzaria & Esfirraria do Gu"
          src={MAPS_EMBED}
          className="absolute inset-0 h-full w-full border-0 grayscale-[15%] contrast-[1.05]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-green-900/80" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-green-900 to-transparent" />
      </div>

      {/* Card sobrepondo o mapa */}
      <div className="relative z-10 -mt-24 sm:-mt-28 md:-mt-36 px-margin-mobile md:px-margin-desktop pb-10 md:pb-14 bg-green-900">
        <div className="max-w-container-max mx-auto rounded-3xl border border-white/10 bg-green-900 shadow-floating p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="flex flex-col gap-6">
              <div>
                <span className="text-headline-sm font-headline-md text-amber-300 uppercase tracking-tight">
                  Pizzaria & Esfirraria do Gu
                </span>
                <p className="text-green-100 font-medium max-w-md leading-relaxed mt-3">
                  Pizzas e esfihas feitas na hora, com ingredientes de qualidade e sabor que conquista na
                  primeira mordida.
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href={PHONE_HREF}
                  className="flex items-center gap-3 text-white hover:text-amber-300 transition-colors font-semibold w-fit"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-amber-300">
                    <span className="material-symbols-outlined text-[20px]">call</span>
                  </span>
                  {PHONE}
                </a>

                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-green-100 hover:text-amber-300 transition-colors font-medium w-fit max-w-md"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-amber-300">
                    <span className="material-symbols-outlined text-[20px]">location_on</span>
                  </span>
                  <span className="pt-2 leading-relaxed">{ADDRESS}</span>
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <span className="font-label-sm text-label-sm text-white uppercase tracking-wider mb-3 block">
                  Redes Sociais
                </span>
                <div className="flex flex-wrap gap-3">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-green-100 hover:border-amber-400/50 hover:text-amber-300 hover:bg-white/10 transition-all font-semibold text-xs"
                    >
                      <span className="material-symbols-outlined text-[18px]">{social.icon}</span>
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>

              <nav className="flex flex-wrap gap-x-5 gap-y-2 pt-4 border-t border-white/10">
                <Link href="/" className="text-green-100 hover:text-amber-300 transition-colors font-medium text-xs">
                  Menu
                </Link>
                <Link href="/deals" className="text-green-100 hover:text-amber-300 transition-colors font-medium text-xs">
                  Promoções
                </Link>
                <Link href="/pedidos" className="text-green-100 hover:text-amber-300 transition-colors font-medium text-xs">
                  Pedidos
                </Link>
              </nav>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-green-200/80 font-medium text-xs">
              © {new Date().getFullYear()} Pizzaria & Esfirraria do Gu • Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
