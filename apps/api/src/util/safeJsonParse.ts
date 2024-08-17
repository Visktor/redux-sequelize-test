import logger from "logger";

export function safeJsonParse(thing: any): any | null {
  try {
    const parsed = JSON.parse(thing);

    if (parsed === null || parsed === false || parsed === 0 || !!parsed) {
      return parsed;
    }

    return null;
  } catch (err) {
    logger.error(`Safe JSON parser error: ${err}`);
    return null;
  }
}
