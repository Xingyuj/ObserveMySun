interface BrandIconProps {
  brandId: string;
  brandName: string;
}

export function BrandIcon({ brandId, brandName }: BrandIconProps) {
  switch (brandId) {
    case "aami":
      return (
        <span className="brand-icon brand-icon--aami" aria-label={`${brandName} logo`}>
          AAMI
        </span>
      );
    case "apia":
      return (
        <span className="brand-icon brand-icon--apia" aria-label={`${brandName} logo`}>
          <svg viewBox="0 0 120 82" role="img">
            <path
              d="M20 31 33 17l18 2 9-9 12 22 18 8-7 25-20-7-17 13-17-10-15 4-7-18Z"
              fill="#0b5ea8"
            />
            <path d="m87 62 8 7-9 4Z" fill="#0b5ea8" />
            <text x="60" y="47" textAnchor="middle" fill="#fff" fontSize="27" fontWeight="800">
              Apia
            </text>
          </svg>
        </span>
      );
    case "bingle":
      return (
        <span className="brand-icon brand-icon--bingle" aria-label={`${brandName} logo`}>
          bingle
          <span />
        </span>
      );
    case "cil":
      return (
        <span className="brand-icon brand-icon--cil" aria-label={`${brandName} logo`}>
          <span className="brand-icon__wattle">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
          <strong>CIL</strong>
          <small>CARAVAN AND<br />RV INSURANCE</small>
        </span>
      );
    case "gio":
      return (
        <span className="brand-icon brand-icon--gio" aria-label={`${brandName} logo`}>
          <span className="gio-disc">G</span>
          <span className="gio-i">I</span>
          <span className="gio-disc">O</span>
        </span>
      );
    case "shannons":
      return (
        <span className="brand-icon brand-icon--shannons" aria-label={`${brandName} logo`}>
          <span className="shannons-flags" />
          <span className="shannons-badge">
            <strong>SHANNONS</strong>
            <span>S</span>
          </span>
        </span>
      );
    case "suncorp":
      return (
        <span className="brand-icon brand-icon--suncorp" aria-label={`${brandName} logo`}>
          SUNCORP
          <span />
        </span>
      );
    default:
      return (
        <span className="brand-icon brand-icon--fallback" aria-label={`${brandName} logo`}>
          {brandName}
        </span>
      );
  }
}
