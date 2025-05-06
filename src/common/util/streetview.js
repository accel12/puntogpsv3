export function convertToEmbedUrl(originalUrl) {
  const url = new URL(originalUrl);
  const params = url.searchParams;

  const viewpoint = params.get("viewpoint");
  const heading = params.get("heading") || 0;

  if (!viewpoint) {
    throw new Error("La URL debe incluir un parámetro de viewpoint.");
  }

  const embedUrl = `https://www.google.com/maps/embed?pb=!4v0!6m8!1m7!1sCAoSLEFGMVFpcFB4clZ0RXJSWElSZWk3T2JDT0RTcTBnZWdDb3dNNzB3a3p5MFBp!2m2!1d${
    viewpoint.split(",")[0]
  }!2d${viewpoint.split(",")[1]}!3f${heading}!4f0!5f0.7820865974627469`;

  return embedUrl;
}
