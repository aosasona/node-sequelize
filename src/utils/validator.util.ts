import {ValidateOptions} from "../types/validator.types";

const validatorjs = require('validatorjs');

export default class Validator {
	public static async validate(options: ValidateOptions): Promise<any> {
		validatorjs.setAttributeFormatter(function (attribute: string) {
			return attribute.replace(/_/g, ' ');
		});
		const validate = new validatorjs(options.data, options.rules);
		if (validate.fails()) {
			if (options.returnFirst) {
				return validate.errors.all()[Object.keys(validate.errors.all())[0]][0];
			}
			return validate.errors;
		}
	}
}