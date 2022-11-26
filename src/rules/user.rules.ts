const rules = {
	signup: {
		first_name: "required|min:3",
		last_name: "required|min:3",
		email: "required|email",
		password: "required|min:6|confirmed",
		password_confirmation: "required|same:password",
	},
	login: {
		email: "required|email",
		password: "required|min:6",
	},
};

export default rules