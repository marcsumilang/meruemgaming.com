import { writable } from 'svelte/store';
import { supabase } from '$lib/supabase/supabaseClient';
import { alertSuccess, alertError } from '$lib/helpers/toast';
import { badgeLogoUrl } from '$lib/config/website';

export const loading = writable(false);
export const userSession = writable(false);
export const userProfile = writable({
	ign: '',
	gameId: '',
	server: ''
});

export async function saveProfile(info, name, email, image) {
	const { data, error } = await supabase.from('profile').insert({
		name: name,
		ign: info.ign,
		gameId: info.gameId,
		server: info.server,
		email: email,
		image: image
	});

	if (error) {
		console.log('error', error);
	} else if (data) {
		alertSuccess('Profile Saved.');
	}
}

export async function updateProfile(info, name, email, image) {
	const { data, error } = await supabase
		.from('profile')
		.update({ ign: info.ign, gameId: info.gameId, server: info.server, name: name, image: image })
		.match({ email: email });

	if (error) {
		console.log('error', error);
		return '';
	} else {
		alertSuccess('Profile Updated.');
	}
}

export async function signInWithFacebook(url) {
	const { user, session, error } = await supabase.auth.signIn(
		{
			provider: 'facebook'
		},
		{
			redirectTo: url
		}
	);
}

export async function signInWithGoogle(url) {
	const { user, session, error } = await supabase.auth.signIn(
		{
			provider: 'google'
		},
		{
			redirectTo: url
		}
	);
}

export async function signout() {
	const { error } = await supabase.auth.signOut();
	userSession.set('');
	localStorage.setItem('userSession', '');
	window.location.reload();
}

export async function getProfile() {
	try {
		const session = supabase.auth.session();

		if (session) {
			localStorage.setItem('userSession', JSON.stringify(session));
			userSession.set(session);
			const { data, error } = await supabase
				.from('profile')
				.select()
				.eq('email', session.user.user_metadata.email)
				.limit(1)
				.single();

			if (data) {
				data.image = session?.user?.user_metadata?.avatar_url ?? badgeLogoUrl;
				userProfile.set(data);
			} else if (error) {
				var info = { ign: '', gameId: '', server: '' };
				var name = session?.user?.user_metadata?.name;
				var email = session?.user?.user_metadata?.email;
				var image = session?.user?.user_metadata?.avatar_url;
				saveProfile(info, name, email, image);
			}
		}
	} catch (error) {
		console.log('No Auth Session');
	}
}
