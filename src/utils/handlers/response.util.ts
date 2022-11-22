import { Response } from "express";

interface APIResponseData {
  status: number;
  message?: string;
  data?: any;
  disableMeta?: boolean;
}

export default class ResponseUtil {
  public static send(res: Response, responseData: APIResponseData): void {
	res.status(responseData.status).json({
	  success: responseData.status >= 200 && responseData.status < 300,
	  message: responseData?.message || "Success",
	  data: responseData?.data,
	  meta: responseData?.disableMeta ? undefined : {
		route: res?.req?.path,
		timestamp: new Date().toISOString() }
	});
  }
}