import logger from "logger";

export abstract class AbstractService {
  protected log(title: string, info: unknown) {
    logger.info(title + " - " + JSON.stringify(info));
  }
}
