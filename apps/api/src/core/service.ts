import logger from "#/logger";

export abstract class AbstractService {
  protected log(title: string, info: any) {
    logger.info(title + " - " + JSON.stringify(info));
  }
}
