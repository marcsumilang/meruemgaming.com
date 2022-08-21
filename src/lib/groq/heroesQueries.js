export function getHeroes() {
	return /* groq */ ` *[_type == "hero" && !(_id in path("drafts.**"))]|order(_createdAt desc) {
   ${HERO_SEARCH_SCHEMA}
   }| order(heroGrade desc)`;
}

export function getHeroesForFilters() {
	return /* groq */ ` *[_type == "hero" && !(_id in path("drafts.**"))]|order(_createdAt desc) {
   ${HERO_WITH_IMAGE_SCHEMA}
   }`;
}

export function getHeroesByName(name) {
	return /* groq */ ` *[_type == "hero" && name match "${name}" && !(_id in path("drafts.**"))][0] {
   ${HERO_VERSUS_DETAILS_SCHEMA}
   }`;
}

export function getHeroesWithImage() {
	return /* groq */ ` *[_type == "hero" && !(_id in path("drafts.**"))]|order(_createdAt desc) {
   ${HERO_WITH_IMAGE_SCHEMA}
   }| order(heroGrade desc)`;
}

export function getHeroesForTiers() {
	return /* groq */ ` *[_type == "hero" && !(_id in path("drafts.**"))]|order(_createdAt desc) {
   ${HERO_TIER_DETAILS_SCHEMA}
   }| order(heroGrade desc)`;
}
export function getHeroesForFAQ() {
	return /* groq */ ` *[_type == "hero" && !(_id in path("drafts.**"))]|order(_createdAt desc) {
   ${HERO_TIER_DETAILS_SCHEMA}
   }| order(heroGrade desc)`;
}
export function getHeroRole(role) {
	return /* groq */ ` *[_type == "heroRole" && _id == "${role}"  && !(_id in path("drafts.**"))][0] {
       name,image,slug,description
   }`;
}

export function highWinRateHeroes() {
	return /* groq */ ` *[_type == "hero" && !(_id in path("drafts.**"))]| order(winRate desc){
   ${top10Heroes}
   }[0..9]`;
}

export function highPickRateHeroes() {
	return /* groq */ ` *[_type == "hero" && !(_id in path("drafts.**"))]| order(pickRate desc){
   ${top10Heroes}
   }[0..9]`;
}
export function highBanRateHeroes() {
	return /* groq */ ` *[_type == "hero" && !(_id in path("drafts.**"))]| order(banRate desc){
   ${top10Heroes}
   }[0..9]`;
}
export function highWinRateHeroesPerRole(role, number) {
	return /* groq */ ` *[_type == "hero" && references("${role}") && !(_id in path("drafts.**"))]| order(winRate desc){
   ${HERO_TOP_PER_ROLE}
   }[0..${number}]`;
}
export function heroesPerRoleDifficulty(role, difficulty) {
	return /* groq */ ` *[_type == "hero" && references("${role}") && heroLearningCurve == "${difficulty}" && !(_id in path("drafts.**"))]| order(winRate desc){
   ${HERO_TOP_PER_ROLE}
   }`;
}
export function heroesPerDifficulty(difficulty) {
	return /* groq */ ` *[_type == "hero" && heroLearningCurve == "${difficulty}" && !(_id in path("drafts.**"))]| order(winRate desc){
   ${HERO_VERSUS_DETAILS_SCHEMA}
   }[0..4]`;
}
export function highWinRateHeroesPerMarksman() {
	return /* groq */ ` *[_type == "hero" && references("23d7af8a-0ef2-43f5-8bdc-19b958b23de4") && !(_id in path("drafts.**"))]| order(winRate desc){
   ${top10Heroes}
   }[0..9]`;
}
export function highWinRateHeroesPerFighter() {
	return /* groq */ ` *[_type == "hero" && references("5d648216-5543-406e-902c-d924d881f016") && !(_id in path("drafts.**"))]| order(winRate desc){
   ${top10Heroes}
   }[0..9]`;
}
export function highWinRateHeroesPerAssassin() {
	return /* groq */ ` *[_type == "hero" && references("405ec09e-21d1-459f-b596-6599ca210846") && !(_id in path("drafts.**"))]| order(winRate desc){
   ${top10Heroes}
   }[0..9]`;
}
export function highWinRateHeroesPerMage() {
	return /* groq */ ` *[_type == "hero" && references("ff9d20a5-4110-4111-bb6f-fb2969bcff66") && !(_id in path("drafts.**"))]| order(winRate desc){
   ${top10Heroes}
   }[0..9]`;
}
export function highWinRateHeroesPerTank() {
	return /* groq */ ` *[_type == "hero" && references("beb78c7c-0655-4e8d-86cd-1dee68719355") && !(_id in path("drafts.**"))]| order(winRate desc){
   ${top10Heroes}
   }[0..9]`;
}
export function highWinRateHeroesPerSupport() {
	return /* groq */ ` *[_type == "hero" && references("d58c5924-a6b7-4d67-ae53-fcb02b4610b0") && !(_id in path("drafts.**"))]| order(winRate desc){
   ${top10Heroes}
   }[0..9]`;
}

export function getItems() {
	return /* groq */ ` *[_type == "item" && (references("695b7699-288b-475d-815b-aa1151346a40") || references("e22963ad-868e-417a-8ec0-e7d5165f9408")|| references("7a02e438-cd41-4b5e-b399-44215f708cf4")|| references("858b4de2-356a-44bc-b40c-68fcda995673")) && !(_id in path("drafts.**"))]|order(category desc) {
   ${ITEM_SCHEMA}
   }`;
}
export function getSpells() {
	return /* groq */ ` *[_type == "spell" && !(_id in path("drafts.**"))]|order(_createdAt desc) {
   ${SPELL_DETAILS_SCHEMA}
   }`;
}

export function getHeroesBySlug(slug) {
	return /* groq */ ` *[_type == "hero" && slug.current match "${slug}" && !(_id in path("drafts.**"))][0]{
   ${HERO_DETAILS_SCHEMA}
   }`;
}
export function getHeroesByNameFullDetails(name) {
	return /* groq */ ` *[_type == "hero" && name match "${name}" && !(_id in path("drafts.**"))][0]{
   ${HERO_DETAILS_SCHEMA}
   }`;
}

export function getHeroLinks() {
	return /* groq */ ` *[_type == "hero" && !(_id in path("drafts.**"))]|order(name asc){
  name,slug
   }`;
}

export function getCurrentPatch() {
	return /* groq */ ` *[_type == "patchNote" && active == true && !(_id in path("drafts.**"))][0]{
   name, slug
   }`;
}
export function getPatchNote(slug) {
	return /* groq */ ` *[_type == "patchNote" && slug.current match "${slug}*" && !(_id in path("drafts.**"))][0]{
  ${PATCH_NOTE_DETAILS_SCHEMA}
   }`;
}
export function getPatches() {
	return /* groq */ ` *[_type == "patchNote" && !(_id in path("drafts.**"))]|order(_createdAt desc){
  name,slug, releaseDate
   }`;
}

const HERO_SEARCH_SCHEMA = `
"id": _id,
name,
slug,
image,
"heroGrade": (((earlyPower + midPower + latePower) / 30) * 50) + (((banRate + winRate + pickRate) / 200) * 50),
heroRoles[]->{name},
heroSpecialties[]->{name},
`;
const ITEM_SCHEMA = `
"id": _id,name,image,slug, itemStats, uniqueAttribute,uniquePassive, recipe[]->{name, image, slug},cost, sell, category->{name}, tier->{name}
`;
const SPELL_SCHEMA = `
name,image,cd,subtitle,description
`;

const HERO_TIER_DETAILS_SCHEMA = `
"id": _id,
name,
_updatedAt,
slug,
image,
"heroGrade": (((earlyPower + midPower + latePower) / 30) * 50) + (((banRate + winRate + pickRate) / 200) * 50),
heroLearningCurve,
heroScaling,
heroSkills,
heroSkillsEnhanced,
winRate,
pickRate,
banRate,
earlyPower,
midPower,
latePower,
notes,
heroRoles[]->{name,image,slug,description},
heroSpecialties[]->{name,slug,description},
"patchNote": *[_type == "patchNote" && active == true && references(^._id)][0]{
 name,
 releaseDate,
 slug,
 "heroAdjustments": heroAdjustments[hero->name == ^.^.name]{adjustment,description},
},
`;

const HEROES_FAQ_DETAILS_SCHEMA = `
"id": _id,
name,
_updatedAt,
slug,
image,
"heroGrade": (((earlyPower + midPower + latePower) / 30) * 50) + (((banRate + winRate + pickRate) / 200) * 50),
heroLearningCurve,
heroScaling,
winRate,
pickRate,
banRate,
earlyPower,
midPower,
latePower,
},
`;

const HERO_TOP_PER_ROLE = `
"id": _id,
name,
_updatedAt,
slug,
banner,
image,
"heroGrade": (((earlyPower + midPower + latePower) / 30) * 50) + (((banRate + winRate + pickRate) / 200) * 50),
heroLearningCurve,
heroScaling,
winRate,
pickRate,
banRate,
earlyPower,
midPower,
latePower,
notes,
heroRoles[]->{name,image,slug,description},
heroSpecialties[]->{name,slug,description},
"patchNote": *[_type == "patchNote" && active == true && references(^._id)][0]{
 name,
 releaseDate,
 slug,
 "heroAdjustments": heroAdjustments[hero->name == ^.^.name]{adjustment,description},
},
`;

const HERO_VERSUS_DETAILS_SCHEMA = `
"id": _id,
name,
_updatedAt,
slug,
youtubeGuides, 
skillCombo,
heroSkills,
heroSkillsEnhanced,
"pros": pros.text,
"cons": cons.text,
banner,
image,
"heroGrade": (((earlyPower + midPower + latePower) / 30) * 50) + (((banRate + winRate + pickRate) / 200) * 50),
heroLearningCurve,
heroScaling,
winRate,
pickRate,
banRate,
earlyPower,
midPower,
latePower,
notes,
heroRoles[]->{name,image,slug,description},
heroSpecialties[]->{name,slug,description},
"patchNote": *[_type == "patchNote" && active == true && references(^._id)][0]{
 name,
 releaseDate,
 slug,
 "heroAdjustments": heroAdjustments[hero->name == ^.^.name]{adjustment,description},
},
`;

const HERO_WITH_IMAGE_SCHEMA = `
"id": _id,
name,
slug,
image,
heroRoles[]->{name},
`;

const HERO_DETAILS_SCHEMA = `
name,
youtubeGuides, 
skillCombo,
heroSkills,
heroSkillsEnhanced,
_createdAt,
_updatedAt,
slug,
image,
banner,
"heroGrade": (((earlyPower + midPower + latePower) / 30) * 50) + (((banRate + winRate + pickRate) / 200) * 50),
heroLearningCurve,
heroScaling,
build1Description,
build2Description,
build3Description,
"patchNote": *[_type == "patchNote" && active == true && references(^._id)][0]{
 name,
 releaseDate,
 slug,
 "heroAdjustments": heroAdjustments[hero->name == ^.^.name]{adjustment,description},
},
spells[]->{${SPELL_SCHEMA}},
build1[]->{${ITEM_SCHEMA}},
build2[]->{${ITEM_SCHEMA}},
build3[]->{${ITEM_SCHEMA}},
itemWeakness[]->{${ITEM_SCHEMA}},
heroCounter[]->{name,image,slug},
heroWeakness[]->{name,image,slug},
bestTeamMates[]->{name,image,slug},
winRate,
pickRate,
banRate,
earlyPower,
midPower,
latePower,
"pros": pros.text,
"cons": cons.text,
notes,
heroRoles[]->{name,image,slug,description},
heroSpecialties[]->{name,slug,description},
releaseDate,
story,
`;

const PATCH_NOTE_DETAILS_SCHEMA = `
"id": _id,
 name,
 description,
 battlefieldAdjustments,
 bugsAdjustments,
 releaseDate,
 "heroAdjustments": heroAdjustments[]{hero->{name,image,slug}, description, adjustment},
 "itemAdjustments": itemAdjustments[]{item->{name,image,slug}, description},
 "spellAdjustments": spellAdjustments[]{spell->{name,image,slug}, description}
`;

const SPELL_DETAILS_SCHEMA = `
"id": _id,
name,
slug,
image,
cd,
subtitle,
description,
`;

const top10Heroes = `
"id": _id,
_updatedAt,
name,
slug,
image,
winRate,
pickRate,
banRate,
`;
