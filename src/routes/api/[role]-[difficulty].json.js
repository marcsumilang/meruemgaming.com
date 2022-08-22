import { heroesPerRoleDifficulty, getHeroRole } from '$lib/groq/heroesQueries';
import { client } from '$lib/sanityClient';

export async function get({ params: { role, difficulty } }) {
	let heroLearningCurve = '';

	if (
		difficulty == 'easy' ||
		difficulty == 'easiest' ||
		difficulty == 'beginners' ||
		difficulty == 'newbies' ||
		difficulty == 'novices' ||
		difficulty == 'newcomers' ||
		difficulty == 'starter'
	) {
		heroLearningCurve = 'easy';
	} else if (
		difficulty == 'normal' ||
		difficulty == 'medium' ||
		difficulty == 'common' ||
		difficulty == 'average' ||
		difficulty == 'epic' ||
		difficulty == 'explored'
	) {
		heroLearningCurve = 'medium';
	} else if (difficulty == 'hard' || difficulty == 'difficult') {
		heroLearningCurve = 'hard';
	} else if (
		difficulty == 'insane' ||
		difficulty == 'pro' ||
		difficulty == 'mythical' ||
		difficulty == 'hardest'
	) {
		heroLearningCurve = 'insane';
	}

	let roles = [
		{ name: 'marksman', id: '23d7af8a-0ef2-43f5-8bdc-19b958b23de4' },
		{ name: 'fighter', id: '5d648216-5543-406e-902c-d924d881f016' },
		{ name: 'assassin', id: '405ec09e-21d1-459f-b596-6599ca210846' },
		{ name: 'mage', id: 'ff9d20a5-4110-4111-bb6f-fb2969bcff66' },
		{ name: 'tank', id: 'beb78c7c-0655-4e8d-86cd-1dee68719355' },
		{ name: 'support', id: 'd58c5924-a6b7-4d67-ae53-fcb02b4610b0' }
	];
	let data = '';

	if (role == 'marksman') {
		data = await client.fetch(/* groq */ `{
        "heroes": ${heroesPerRoleDifficulty(roles[0].id, heroLearningCurve)},
        "role": ${getHeroRole(roles[0].id)}
        }`);
	} else if (role == 'fighter') {
		data = await client.fetch(/* groq */ `{
        "heroes": ${heroesPerRoleDifficulty(roles[1].id, heroLearningCurve)},
        "role": ${getHeroRole(roles[1].id)}
        }`);
	} else if (role == 'assassin') {
		data = await client.fetch(/* groq */ `{
        "heroes": ${heroesPerRoleDifficulty(roles[2].id, heroLearningCurve)},
        "role": ${getHeroRole(roles[2].id)}
        }`);
	} else if (role == 'mage') {
		data = await client.fetch(/* groq */ `{
        "heroes": ${heroesPerRoleDifficulty(roles[3].id, heroLearningCurve)},
        "role": ${getHeroRole(roles[3].id)}
        }`);
	} else if (role == 'tank') {
		data = await client.fetch(/* groq */ `{
        "heroes": ${heroesPerRoleDifficulty(roles[4].id, heroLearningCurve)},
        "role": ${getHeroRole(roles[4].id)}
        }`);
	} else if (role == 'support') {
		data = await client.fetch(/* groq */ `{
        "heroes": ${heroesPerRoleDifficulty(roles[5].id, heroLearningCurve)},
        "role": ${getHeroRole(roles[5].id)}
        }`);
	} else {
		return {
			status: 500,
			body: new Error('Invalid Top Data')
		};
	}

	if (data) {
		return {
			status: 200,
			body: data
		};
	}

	return {
		status: 500,
		body: new Error('Internal Server Error')
	};
}
