/** IMPORTANT: IF <T> IS AN UNION THIS WON'T WORK AS EXPECTED */
export type OperationResult<T = any> =
  | ([T] extends [never]
      ? {
          success: true;
          message?: string;
        }
      : {
          success: true;
          data: T;
          message?: string;
        })
  | {
      success: false;
      message?: string;
      error: any;
    };
