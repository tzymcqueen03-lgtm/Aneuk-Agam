// Ikon SVG gaya neo-brutalism: garis tebal, sudut tegas, satu warna.
// Semua ikon menerima props: size (number), className, strokeWidth.

const base = (size) => ({
  width: size,
  height: size,
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "square",
  strokeLinejoin: "miter",
});

export function DocumentIcon({ size = 32, className = "", strokeWidth = 2.4 }) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <path d="M7 3h12l6 6v20H7z" />
      <path d="M19 3v6h6" />
      <path d="M11 15h10M11 20h10M11 25h6" />
    </svg>
  );
}

export function PresentationIcon({ size = 32, className = "", strokeWidth = 2.4 }) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <rect x="3" y="4" width="26" height="17" />
      <path d="M16 21v5M11 29l5-3 5 3" />
      <path d="M8 16l5-5 4 4 6-7" />
    </svg>
  );
}

export function ChartIcon({ size = 32, className = "", strokeWidth = 2.4 }) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <path d="M4 28V4" />
      <path d="M4 28h24" />
      <rect x="8" y="17" width="5" height="11" />
      <rect x="16" y="11" width="5" height="17" />
      <rect x="24" y="6" width="5" height="22" />
    </svg>
  );
}

export function IdCardIcon({ size = 32, className = "", strokeWidth = 2.4 }) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <rect x="3" y="7" width="26" height="18" />
      <circle cx="11" cy="14" r="3" />
      <path d="M6 21c1.5-2.5 8.5-2.5 10 0" />
      <path d="M19 12h7M19 16h7M19 20h4" />
    </svg>
  );
}

export function BookIcon({ size = 32, className = "", strokeWidth = 2.4 }) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <path d="M5 4h14a4 4 0 0 1 4 4v20H9a4 4 0 0 0-4 4z" />
      <path d="M5 4v28" />
      <path d="M11 12h7M11 17h7" />
    </svg>
  );
}

export function PencilIcon({ size = 32, className = "", strokeWidth = 2.4 }) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <path d="M4 28l2-7L22 5l5 5L11 26z" />
      <path d="M20 7l5 5" />
      <path d="M6 21l5 5" />
    </svg>
  );
}

export function ImageIcon({ size = 32, className = "", strokeWidth = 2.4 }) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <rect x="3" y="5" width="26" height="22" />
      <circle cx="11" cy="13" r="2.5" />
      <path d="M3 23l8-8 6 6 4-4 8 8" />
    </svg>
  );
}

export function BannerIcon({ size = 32, className = "", strokeWidth = 2.4 }) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <path d="M4 6h24v16H4z" />
      <path d="M9 27v-5M23 27v-5" />
      <path d="M8 12h10M8 16h6" />
      <path d="M21 11l4 4-4 4" />
    </svg>
  );
}

export function CalendarIcon({ size = 32, className = "", strokeWidth = 2.4 }) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <rect x="3" y="6" width="26" height="22" />
      <path d="M3 13h26" />
      <path d="M10 3v6M22 3v6" />
      <rect x="9" y="18" width="5" height="5" />
    </svg>
  );
}

export function FlyerIcon({ size = 32, className = "", strokeWidth = 2.4 }) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <path d="M4 4h11v24H4z" />
      <path d="M17 4h11v24H17z" />
      <path d="M7 9h5M7 14h5M7 19h3" />
      <path d="M20 9h5M20 14h5M20 19h3" />
    </svg>
  );
}

export function AwardIcon({ size = 32, className = "", strokeWidth = 2.4 }) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <rect x="4" y="4" width="24" height="17" />
      <path d="M9 10h8M9 14h5" />
      <circle cx="22" cy="13" r="2" />
      <path d="M16 21l-4 7 4-2 4 2-4-7" />
    </svg>
  );
}

export function CardIcon({ size = 32, className = "", strokeWidth = 2.4 }) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <rect x="3" y="9" width="26" height="16" />
      <path d="M3 15h26" />
      <path d="M8 20h6" />
      <path d="M21 20h4" />
    </svg>
  );
}

export function ArrowIcon({ size = 24, className = "", strokeWidth = 2.6 }) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <path d="M6 16h20" />
      <path d="M18 8l8 8-8 8" />
    </svg>
  );
}

export function ArrowUpRightIcon({ size = 24, className = "", strokeWidth = 2.6 }) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <path d="M9 23L23 9" />
      <path d="M11 9h12v12" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 24, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23z" />
    </svg>
  );
}

export function CheckIcon({ size = 24, className = "", strokeWidth = 3 }) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <path d="M5 17l7 7L27 7" />
    </svg>
  );
}

export function PlusIcon({ size = 24, className = "", strokeWidth = 3 }) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <path d="M16 5v22M5 16h22" />
    </svg>
  );
}

export function BoltIcon({ size = 24, className = "", strokeWidth = 2.6 }) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <path d="M18 3L7 18h7l-1 11 11-15h-7z" />
    </svg>
  );
}

export function TrashIcon({ size = 20, className = "", strokeWidth = 2.6 }) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <path d="M5 8h22" />
      <path d="M12 8V4h8v4" />
      <path d="M8 8l1.5 20h13L24 8" />
      <path d="M13 14v9M19 14v9" />
    </svg>
  );
}

export function QrIcon({ size = 32, className = "", strokeWidth = 2.4 }) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <rect x="3" y="3" width="10" height="10" />
      <rect x="19" y="3" width="10" height="10" />
      <rect x="3" y="19" width="10" height="10" />
      <path d="M19 19h4v4h-4zM27 19v4M19 27h10" />
    </svg>
  );
}

export function LockIcon({ size = 24, className = "", strokeWidth = 2.4 }) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <rect x="6" y="13" width="20" height="15" />
      <path d="M11 13V9a5 5 0 0 1 10 0v4" />
      <path d="M16 19v4" />
    </svg>
  );
}

export function UploadIcon({ size = 24, className = "", strokeWidth = 2.4 }) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <path d="M16 22V5" />
      <path d="M8 13l8-8 8 8" />
      <path d="M4 22v5h24v-5" />
    </svg>
  );
}

export const iconMap = {
  document: DocumentIcon,
  presentation: PresentationIcon,
  chart: ChartIcon,
  "id-card": IdCardIcon,
  book: BookIcon,
  pencil: PencilIcon,
  image: ImageIcon,
  banner: BannerIcon,
  calendar: CalendarIcon,
  flyer: FlyerIcon,
  award: AwardIcon,
  card: CardIcon,
};

export function ServiceIcon({ name, ...props }) {
  const Cmp = iconMap[name] || DocumentIcon;
  return <Cmp {...props} />;
}
