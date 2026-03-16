import { redirect } from '@sveltejs/kit';
import type { Actions, LayoutServerLoad } from './$types';
import { auth } from '$lib/server/auth';

export const load: LayoutServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/shadcn/login');
	}

	return { user: event.locals.user };
};

export const actions: Actions = {
	signOut: async (event) => {
		await auth.api.signOut({ headers: event.request.headers });
		return redirect(302, '/shadcn/login');
	}
};
