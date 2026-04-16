import BrandWordmark from "../components/BrandWordmark";

const BRANDED_WORD_REGEX = /(Woodello)/gi;

export function renderBrandWordmark(text, className = "brand-wordmark-inline") {
  if (typeof text !== "string") {
    return text;
  }

  if (!BRANDED_WORD_REGEX.test(text)) {
    return text;
  }

  BRANDED_WORD_REGEX.lastIndex = 0;

  return text.split(BRANDED_WORD_REGEX).map((part, index) => {
    if (part.toLowerCase() === "woodello") {
      return <BrandWordmark key={`woodello-wordmark-${index}`} className={className} alt="Woodello" />;
    }

    return part;
  });
}
