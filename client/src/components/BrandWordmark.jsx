function BrandWordmark({ className = "", alt = "Woodello" }) {
  return <img className={`brand-wordmark ${className}`.trim()} src="/assets/images/woodello%20word.png" alt={alt} />;
}

export default BrandWordmark;
