// import axios from 'axios'
import { writable } from 'svelte/store';
import { supabase } from '$lib/supabase/supabaseClient';
import { alertError, alertSuccess } from '$lib/helpers/toast';

export const loading = writable(false);
export const editMode = writable(false);
export const heroes = writable();
export const heroes2 = writable();
export const heroesPerDifficulty = writable();

export const selectHeroModal = writable({
	boardType: 'heroTier',
	arrayGroup: 'left',
	tier: 'S+'
});

export const heroMatchupLeft = writable();
export const heroMatchupRight = writable();
export const matchup = writable([]);
export const heroLinks = writable();
export const allItems = writable([]);
export const itemsList = writable([]);
export const allSpells = writable([]);
export const selectedFilterItem = writable('All');
export const viewStyle = writable('table');
export const heroDetails = writable();
export const itemDetails = writable();
export const spellDetails = writable();
export const savedTiers = writable([]);
export const publishedTiers = writable([]);
export const publishedLaneTiers = writable([]);
export const publishedHeroTiers = writable([]);
export const publishedHeroMatchUps = writable([]);
export const lowWinHeroStatsFromML = writable();
export const lowPickHeroStatsFromML = writable();
export const lowBanHeroStatsFromML = writable();
export const highWinHeroStatsFromML = writable();
export const highPickHeroStatsFromML = writable();
export const highBanHeroStatsFromML = writable();
export const highWinRateHeroesPerMarksman = writable();
export const highWinRateHeroesPerFighter = writable();
export const highWinRateHeroesPerAssassin = writable();
export const highWinRateHeroesPerMage = writable();
export const highWinRateHeroesPerTank = writable();
export const highWinRateHeroesPerSupport = writable();
export const highWinHeroStatsFromMLPrev = writable();
export const highPickHeroStatsFromMLPrev = writable();
export const highBanHeroStatsFromMLPrev = writable();
export const highWinRateHeroesPerMarksmanPrev = writable();
export const highWinRateHeroesPerFighterPrev = writable();
export const highWinRateHeroesPerAssassinPrev = writable();
export const highWinRateHeroesPerMagePrev = writable();
export const highWinRateHeroesPerTankPrev = writable();
export const highWinRateHeroesPerSupportPrev = writable();
export const guideSlug = writable();
export const currentPatch = writable();
export const existingHeroTierOnCurrentPatch = writable(false);
export const existingLaneTierOnCurrentPatch = writable(false);
export const pagination = writable({
	start: 0,
	end: 5
});

export const tierBoardId = writable(null);
export const tierPublished = writable(false);
export const tierType = writable('laneTier');
export const tierBoardName = writable('');
export const tierBoardDescription = writable('');
export const heroMatchupBoard = writable({
	lane: 'Jungle',
	left: {
		name: 'left',
		items: '',
		early: 1,
		mid: 1,
		late: 1,
		mobility: 1,
		teamUtility: 1,
		clearWaves: 1,
		pickOff: 1,
		spell: '',
		builds: []
	},
	right: {
		name: 'right',
		items: '',
		early: 1,
		mid: 1,
		late: 1,
		mobility: 1,
		teamUtility: 1,
		clearWaves: 1,
		pickOff: 1,
		spell: '',
		builds: []
	}
});
export const tiersLaneBoard = writable([
	{
		name: 'S+',
		color: 'bg-yellow-400',
		roles: [
			{
				id: 1,
				name: 'EXP LANE',
				items: []
			},
			{
				id: 2,
				name: 'MID LANE',
				items: []
			},
			{
				id: 3,
				name: 'GOLD LANE',
				items: []
			},
			{
				id: 4,
				name: 'ROAMER',
				items: []
			},
			{
				id: 5,
				name: 'JUNGLE',
				items: []
			}
		]
	},
	{
		name: 'S',
		color: 'bg-blue-400',
		roles: [
			{
				id: 1,
				name: 'EXP LANE',
				items: []
			},
			{
				id: 2,
				name: 'MID LANE',
				items: []
			},
			{
				id: 3,
				name: 'GOLD LANE',
				items: []
			},
			{
				id: 4,
				name: 'ROAMER',
				items: []
			},
			{
				id: 5,
				name: 'JUNGLE',
				items: []
			}
		]
	},
	{
		name: 'A',
		color: 'bg-green-400',
		roles: [
			{
				id: 1,
				name: 'EXP LANE',
				items: []
			},
			{
				id: 2,
				name: 'MID LANE',
				items: []
			},
			{
				id: 3,
				name: 'GOLD LANE',
				items: []
			},
			{
				id: 4,
				name: 'ROAMER',
				items: []
			},
			{
				id: 5,
				name: 'JUNGLE',
				items: []
			}
		]
	},
	{
		name: 'B',
		color: 'bg-red-400',
		roles: [
			{
				id: 1,
				name: 'EXP LANE',
				items: []
			},
			{
				id: 2,
				name: 'MID LANE',
				items: []
			},
			{
				id: 3,
				name: 'GOLD LANE',
				items: []
			},
			{
				id: 4,
				name: 'ROAMER',
				items: []
			},
			{
				id: 5,
				name: 'JUNGLE',
				items: []
			}
		]
	}
]);
export const tiersHeroBoard = writable([
	{
		name: 'S+',
		color: 'bg-yellow-400',
		items: []
	},
	{
		name: 'S',
		color: 'bg-blue-400',
		items: []
	},
	{
		name: 'A',
		color: 'bg-green-400',
		items: []
	},
	{
		name: 'B',
		color: 'bg-red-400',
		items: []
	}
]);

export const getHeroStatsFromML = async () => {
	loading.set(true);
	let headersList = {
		Accept: '*/*',
		'Content-Type': 'application/x-www-form-urlencoded'
	};

	let bodyContent = 'lang=en&language=en&type=1';

	fetch('https://api.mobilelegends.com/m/hero/getRankData', {
		method: 'POST',
		body: bodyContent,
		headers: headersList
	})
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log(data);

			let highWin = data;
			let lowWin = data;
			let highPick = data;
			let lowPick = data;
			let highBan = data;
			let lowBan = data;

			highWin.data.data.sort(compareDecimalsAsc);
			lowWin.data.data.sort((a, b) => {
				return parseFloat(b.win) - parseFloat(a.win);
			});
			highPick.data.data.sort((a, b) => {
				return parseFloat(a.use) - parseFloat(b.use);
			});
			lowPick.data.data.sort((a, b) => {
				return parseFloat(b.use) - parseFloat(a.use);
			});
			highBan.data.data.sort((a, b) => {
				return parseFloat(a.ban) - parseFloat(b.ban);
			});
			lowBan.data.data.sort((a, b) => {
				return parseFloat(b.ban) - parseFloat(a.ban);
			});

			highWinHeroStatsFromML.set(highWin);
			lowWinHeroStatsFromML.set(lowWin);
			highPickHeroStatsFromML.set(highPick);
			lowPickHeroStatsFromML.set(lowPick);
			highBanHeroStatsFromML.set(highBan);
			lowBanHeroStatsFromML.set(lowBan);

			window.localStorage.setItem('highWinHeroStatsFromML', JSON.stringify(highWin));
			window.localStorage.setItem('lowWinHeroStatsFromML', JSON.stringify(lowWin));
			window.localStorage.setItem('highPickHeroStatsFromML', JSON.stringify(highPick));
			window.localStorage.setItem('lowPickHeroStatsFromML', JSON.stringify(lowPick));
			window.localStorage.setItem('highBanHeroStatsFromML', JSON.stringify(highBan));
			window.localStorage.setItem('lowBanHeroStatsFromML', JSON.stringify(lowBan));
		})
		.catch(function () {
			highWinHeroStatsFromML.set(JSON.parse(window.localStorage.getItem('highWinHeroStatsFromML')));
			lowWinHeroStatsFromML.set(JSON.parse(window.localStorage.getItem('lowWinHeroStatsFromML')));
			highPickHeroStatsFromML.set(
				JSON.parse(window.localStorage.getItem('highPickHeroStatsFromML'))
			);
			lowPickHeroStatsFromML.set(JSON.parse(window.localStorage.getItem('lowPickHeroStatsFromML')));
			highBanHeroStatsFromML.set(JSON.parse(window.localStorage.getItem('highBanHeroStatsFromML')));
			lowBanHeroStatsFromML.set(JSON.parse(window.localStorage.getItem('lowBanHeroStatsFromML')));
		});
	loading.set(false);
};

export function compareDecimalsAsc(a, b) {
	if (a === b) return 0;

	return a < b ? -1 : 1;
}

export const getPublishedTiers = async (allData = [], start = 0, end = 5) => {
	loading.set(true);
	const { data, error } = await supabase
		.from('tiers')
		.select()
		.eq('published', true)
		.order('id', { ascending: false })
		.range(start, end)
		.limit(5);

	if (data) {
		publishedTiers.set([...allData, ...data]);
		console.log('publishedTiers', [...allData, ...data]);
	} else {
		console.log('error getMyTiers', error);
	}
	loading.set(false);
};

export const getPublishedLaneTiers = async (allData = [], start = 0, end = 5) => {
	loading.set(true);
	const { data, error } = await supabase
		.from('tiers')
		.select()
		.match({ published: true, tier_type: 'laneTier' })
		.order('id', { ascending: false })
		.range(start, end)
		.limit(5);

	if (data) {
		publishedLaneTiers.set([...allData, ...data]);
		console.log('publishedLaneTiers', [...allData, ...data]);
	} else {
		console.log('error publishedLaneTiers', error);
	}
	loading.set(false);
};

export const getPublishedHeroTiers = async (allData = [], start = 0, end = 5) => {
	loading.set(true);
	const { data, error } = await supabase
		.from('tiers')
		.select()
		.match({ published: true, tier_type: 'heroTier' })
		.order('id', { ascending: false })
		.range(start, end)
		.limit(5);

	if (data) {
		publishedHeroTiers.set([...allData, ...data]);
		console.log('publishedHeroTiers', [...allData, ...data]);
	} else {
		console.log('error publishedHeroTiers', error);
	}
	loading.set(false);
};

export const getPublishedHeroMatchUps = async (allData = [], start = 0, end = 5) => {
	loading.set(true);
	const { data, error } = await supabase
		.from('tiers')
		.select()
		.match({ published: true, tier_type: 'heroMatchup' })
		.order('id', { ascending: false })
		.range(start, end)
		.limit(5);

	if (data) {
		publishedHeroMatchUps.set([...allData, ...data]);
		console.log('publishedHeroMatchUps', [...allData, ...data]);
	} else {
		console.log('error publishedHeroMatchUps', error);
	}
	loading.set(false);
};

export const getExistingLaneTier = async (userProfile, currentPatch) => {
	clearBoard();
	loading.set(true);
	const { data, error } = await supabase
		.from('tiers')
		.select()
		.match({ email: userProfile.email, tier_type: 'laneTier', patchVersion: currentPatch })
		.limit(1)
		.single();

	if (data) {
		existingLaneTierOnCurrentPatch.set(true);
		existingHeroTierOnCurrentPatch.set(data);
		tierBoardName.set(data.tier_name);
		tierBoardDescription.set(data.tier_description);
		tierType.set(data.tier_type);
		tierPublished.set(data.published);
		guideSlug.set(data.slug);
		tiersLaneBoard.set(data.board);

		tierBoardId.set(data.id);
		console.log('existingLaneTierOnCurrentPatch yes');
	} else {
		console.log('existingLaneTierOnCurrentPatch no existing Lane Tier');
	}
	loading.set(false);
};

export const getExistingHeroTier = async (userProfile, currentPatch) => {
	clearBoard();
	loading.set(true);
	const { data, error } = await supabase
		.from('tiers')
		.select()
		.match({ email: userProfile.email, tier_type: 'heroTier', patchVersion: currentPatch })
		.eq('email', userProfile.email)
		.eq('tier_type', 'heroTier')
		.limit(1)
		.single();

	if (data) {
		existingHeroTierOnCurrentPatch.set(data);
		tierBoardName.set(data.tier_name);
		tierBoardDescription.set(data.tier_description);
		tierType.set(data.tier_type);
		tierPublished.set(data.published);
		guideSlug.set(data.slug);
		tiersHeroBoard.set(data.board);
		tierBoardId.set(data.id);

		console.log('existingHeroTierOnCurrentPatch yes');
	} else {
		console.log('existingHeroTierOnCurrentPatch no existing Lane Tier');
	}
	loading.set(false);
};

export const saveTier = async (
	boardName,
	tierBoardDescription,
	boardValue,
	userSession,
	tierType,
	tierPublished,
	userProfile,
	currentPatch
) => {
	try {
		console.log(tierType);
		loading.set(true);

		if (boardName == '') {
			alertError('Tier name is required.');
			loading.set(false);
			return '';
		}
		if (tierBoardDescription == '') {
			alertError('Please say something about this tier.');
			loading.set(false);
			return '';
		}

		console.log(userProfile);
		let slug = `${boardName.trim().toLowerCase().replace(/\s+/g, '-').slice(0, 200)}-by-${
			userProfile?.ign
				? userProfile?.ign?.trim().toLowerCase().replace(/\s+/g, '-').slice(0, 200)
				: userProfile?.name?.trim().toLowerCase().replace(/\s+/g, '-').slice(0, 200)
		}`;

		const { data, error } = await supabase.from('tiers').insert(
			[
				{
					tier_name: boardName,
					tier_description: tierBoardDescription,
					board: boardValue,
					email: userSession.user.email,
					tier_type: tierType,
					created_by: userProfile?.ign ?? userProfile?.name,
					created_by_image: userProfile?.image,
					slug: slug,
					patchVersion: currentPatch.name,
					published: tierPublished
				}
			],
			{
				returning: 'minimal'
			}
		);

		if (error) {
			alertError('You already used this tier name. Please try a different tier name.');
		} else {
			alertSuccess('Tier Saved.');
			getLastSavedTier(userSession);
		}

		loading.set(false);
	} catch (error) {
		console.log(error);
	}
};

export const updateTier = async (
	boardName,
	tierBoardDescription,
	boardValue,
	id,
	tierPublished,
	userProfile
) => {
	try {
		loading.set(true);
		if (boardName == '') {
			alertError('Tier name is required.');
			loading.set(false);
			return '';
		}
		if (tierBoardDescription == '') {
			alertError('Please say something about this tier.');
			loading.set(false);
			return '';
		}

		const { data, error } = await supabase
			.from('tiers')
			.update({
				board: boardValue,
				tier_name: boardName,
				tier_description: tierBoardDescription,
				published: tierPublished,
				created_by: userProfile?.ign ?? userProfile?.name,
				created_by_image: userProfile?.image
			})
			.match({ id: id });
		alertSuccess('Tier Updated.');
		loading.set(false);
	} catch (error) {
		console.log(error);
	}
};

export const deleteTier = async (id) => {
	try {
		loading.set(true);
		const { data, error } = await supabase.from('tiers').delete().match({ id: id });
		alertSuccess('Tier Deleted.');
		loading.set(false);
	} catch (error) {
		console.log(error);
	}
};

export const getMyTiers = async (userSession) => {
	loading.set(true);
	const { data, error } = await supabase
		.from('tiers')
		.select('id,tier_name,published,created_at')
		.eq('email', userSession.user.email);

	if (data) {
		console.log('getMyTiers', data);
		savedTiers.set(data);
	} else {
		console.log('error getMyTiers', error);
	}
	loading.set(false);
};

export const getTierBoardData = async (id) => {
	loading.set(true);
	const { data, error } = await supabase.from('tiers').select().eq('id', id).single();

	if (data) {
		tierBoardName.set(data.tier_name);
		tierBoardDescription.set(data.tier_description);
		tierType.set(data.tier_type);
		tierPublished.set(data.published);
		if (data.tier_type == 'laneTier') {
			tiersLaneBoard.set(data.board);
		} else if (data.tier_type == 'heroTier') {
			tiersHeroBoard.set(data.board);
		} else if (data.tier_type == 'heroMatchup') {
			heroMatchupBoard.set(data.board);
		}
		tierBoardId.set(data.id);
		console.log('getTierBoardData', data);
		console.log('data.board', data.board);
	} else {
		console.log('error getMyTiers', error);
	}
	loading.set(false);
};

export const getLastSavedTier = async (userSession) => {
	loading.set(true);
	const { data, error } = await supabase
		.from('tiers')
		.select()
		.eq('email', userSession.user.email)
		.order('id', { ascending: false })
		.limit(1)
		.single();

	if (data) {
		tierBoardName.set(data.tier_name);
		tierBoardDescription.set(data.tier_description);
		tierType.set(data.tier_type);
		tierPublished.set(data.published);
		guideSlug.set(data.slug);
		if (data.tier_type == 'laneTier') {
			tiersLaneBoard.set(data.board);
		} else if (data.tier_type == 'heroTier') {
			tiersHeroBoard.set(data.board);
		} else if (data.tier_type == 'heroMatchup') {
			heroMatchupBoard.set(data.board);
		}
		tierBoardId.set(data.id);
		console.log('getTierBoardData', data);
		console.log('data.board', data.board);
	} else {
		console.log('error getMyTiers', error);
	}

	loading.set(false);
};

export const clearBoard = () => {
	existingLaneTierOnCurrentPatch.set(false);
	existingHeroTierOnCurrentPatch.set(false);
	tierBoardId.set(null);
	tierPublished.set(false);
	tierBoardName.set('');
	tierBoardDescription.set('');
	heroMatchupBoard.set({
		lane: 'Jungle',
		left: {
			name: 'left',
			items: '',
			early: 1,
			mid: 1,
			late: 1,
			mobility: 1,
			teamUtility: 1,
			clearWaves: 1,
			pickOff: 1,
			spell: '',
			builds: []
		},
		right: {
			name: 'right',
			items: '',
			early: 1,
			mid: 1,
			late: 1,
			mobility: 1,
			teamUtility: 1,
			clearWaves: 1,
			pickOff: 1,
			spell: '',
			builds: []
		}
	});
	tiersHeroBoard.set([
		{
			name: 'S+',
			color: 'bg-yellow-400',
			items: []
		},
		{
			name: 'S',
			color: 'bg-blue-400',
			items: []
		},
		{
			name: 'A',
			color: 'bg-green-400',
			items: []
		},
		{
			name: 'B',
			color: 'bg-red-400',
			items: []
		}
	]);
	tiersLaneBoard.set([
		{
			name: 'S+',
			color: 'bg-yellow-400',
			roles: [
				{
					id: 1,
					name: 'EXP LANE',
					items: []
				},
				{
					id: 2,
					name: 'MID LANE',
					items: []
				},
				{
					id: 3,
					name: 'GOLD LANE',
					items: []
				},
				{
					id: 4,
					name: 'ROAMER',
					items: []
				},
				{
					id: 5,
					name: 'JUNGLE',
					items: []
				}
			]
		},
		{
			name: 'S',
			color: 'bg-blue-400',
			roles: [
				{
					id: 1,
					name: 'EXP LANE',
					items: []
				},
				{
					id: 2,
					name: 'MID LANE',
					items: []
				},
				{
					id: 3,
					name: 'GOLD LANE',
					items: []
				},
				{
					id: 4,
					name: 'ROAMER',
					items: []
				},
				{
					id: 5,
					name: 'JUNGLE',
					items: []
				}
			]
		},
		{
			name: 'A',
			color: 'bg-green-400',
			roles: [
				{
					id: 1,
					name: 'EXP LANE',
					items: []
				},
				{
					id: 2,
					name: 'MID LANE',
					items: []
				},
				{
					id: 3,
					name: 'GOLD LANE',
					items: []
				},
				{
					id: 4,
					name: 'ROAMER',
					items: []
				},
				{
					id: 5,
					name: 'JUNGLE',
					items: []
				}
			]
		},
		{
			name: 'B',
			color: 'bg-red-400',
			roles: [
				{
					id: 1,
					name: 'EXP LANE',
					items: []
				},
				{
					id: 2,
					name: 'MID LANE',
					items: []
				},
				{
					id: 3,
					name: 'GOLD LANE',
					items: []
				},
				{
					id: 4,
					name: 'ROAMER',
					items: []
				},
				{
					id: 5,
					name: 'JUNGLE',
					items: []
				}
			]
		}
	]);
};
