

export const APP_ROUTES = {
	private: {
		dashboard: '/dashboard',
		contacts: {
			list: '/contacts',
			add: '/contacts/add'
		}
	},
	public: {
		home: '/',
		login: '/signin',
		signup: '/signup',
		users: {
			account: {
				create: '/api/users',
			}
		}
	}
}