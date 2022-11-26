const constraints = {
	signup: {
		first_name: "required|min:3",
		last_name: "required|min:3",
		email: "required|email",
		password: "required|min:6|confirmed",
		password_confirmation: "required|same:password",
	},
}

export default constraints