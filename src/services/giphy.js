import { CONSTANTS } from "../constants";

const GIPHY_URL = `${CONSTANTS.giphySearchUrl}?api_key=${CONSTANTS.giphyApiKey}`;
/**
 * Returns url to gif related to query
 * @param {string} query
 * @returns {string|null}
 */
export async function getGif(query) {
  const giphySearchUrl = new URL(GIPHY_URL);
  giphySearchUrl.searchParams.set("q", query);
  const response = await fetch(giphySearchUrl);
  const result = await response.json();
  const url = result.data?.at(0)?.images?.original?.url;
  return url;
}
