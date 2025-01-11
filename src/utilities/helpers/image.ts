export const getFallbackSrc = (fallback?: {
  width: number;
  height: number;
  text: string;
}) => {
  return fallback
    ? `https://placehold.co/${fallback.width}x${fallback.height}?text=${fallback.text || 'Placeholder'}`
    : undefined;
};

export const getBrandColorScheme = (imagePath: {
  light: string;
  dark: string;
}) => {
  const cookieValue = getCookie(COOKIE_NAME.COLOR_SCHEME);
  return cookieValue == 'dark' ? imagePath.dark : imagePath.light;
};
