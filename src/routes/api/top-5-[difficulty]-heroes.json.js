import { heroesPerDifficulty, getHeroRole } from '$lib/groq/heroesQueries';
import { client } from '$lib/sanityClient';

export async function get({ params: { difficulty } }) {
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

	let data = '';

	data = await client.fetch(/* groq */ `{
        "heroes": ${heroesPerDifficulty(heroLearningCurve)},
        }`);

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
