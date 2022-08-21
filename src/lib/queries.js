/**
 * Example of how you could re-use GROQ queries across different contexts with Javascript.
 * As your schema evolves, this pattern will be useful to keep your data in sync across all surfaces.
 */
export function sitemapTournaments() {
  return /* groq */ `*[ _type == "tournament" && defined(slug.current) && !(_id in path("drafts.**")) ] {
    slug,
  }`
}
export function sitemapBlogs() {
  return /* groq */ `*[ _type == "post" && defined(slug.current) && !(_id in path("drafts.**")) ] {
    slug,
  }`
}
export function sitemapAuthors() {
  return /* groq */ `*[ _type == "author" && defined(slug.current) && !(_id in path("drafts.**")) ] {
    slug,
  }`
}
export function sitemapNews() {
  return /* groq */ `*[ _type == "post" && "news" in categories[]->slug.current && defined(slug.current) && !(_id in path("drafts.**")) ] {
    slug,
  }`
}
export function sitemapCountry() {
  return /* groq */ `*[ _type == "country" && defined(slug.current) && !(_id in path("drafts.**"))] {
    slug,
  }`
}
export function sitemapTeams() {
  return /* groq */ `*[ _type == "team" && defined(slug.current) && !(_id in path("drafts.**"))] {
    slug,
  }`
}
export function sitemapPlayers() {
  return /* groq */ `*[ _type == "player" && defined(slug.current) && !(_id in path("drafts.**"))] {
    slug,
  }`
}
export function sitemapMatches() {
  return /* groq */ `*[ _type == "match" && defined(slug.current) && !(_id in path("drafts.**"))] {
    slug,
  }`
}
export function sitemapAboutPages() {
  return /* groq */ `*[ _type == "about" && defined(slug.current) && !(_id in path("drafts.**"))] {
    slug,
  }`
}
export function sitemapCategories() {
  return /* groq */ `*[ _type == "category" && defined(slug.current) && !(_id in path("drafts.**"))] {
    slug,
  }`
}

export function getPostsQuery(extraFilter) {
  return /* groq */ `*[
    _type == "post" &&
    defined(slug.current)  && !(_id in path("drafts.**"))
    ${extraFilter ? `&& ${extraFilter}` : ''}
  ] | order(publishedAt desc) {
    _id,
    title,
    slug,
    categories[]->{
      title,
      slug,
      description
    },
    short_description,
    image,
    publishedAt,
  }`
}

export function getPostsBySlug(slug) {
  return /* groq */ ` *[_type == "post" && slug.current match "${slug}" && !(_id in path("drafts.**"))][0]{
    ...,
		"authors": authors[].author->{
			${AUTHOR_CARD_FRAGMENT}
		},
    body[] {
      ...,
          markDefs[]{
      ...,
      _type == "internalLink" => {
        "slug": @.reference->slug
      }
    },
			children[] {
				...,
				// authorReference is an inline block, and will show inside PortableText spans (block.children)
				// Let's expand the reference to the author document & get its name, slug & image
				_type == "authorReference" => {
					author->{
						${AUTHOR_CARD_FRAGMENT}
					}
				}
			}
    }
   },
  }`
}

export function getAboutPages() {
  return /* groq */ `*[
    _type == "about" &&
    defined(slug.current)  && !(_id in path("drafts.**"))
  ] | order(publishedAt desc) {
    name,
    slug,
    image,
    publishedAt,
  }`
}

export function getAboutPageBySlug(slug) {
  return /* groq */ `*[_type == "about" && slug.current match "${slug}" && !(_id in path("drafts.**"))][0]{
  name,
  slug,
  image,
    publishedAt,
    references,
    bio[]{
    ...,
    markDefs[]{
      ...,
      _type == "internalLink" => {
        "slug": @.reference->slug
      }
    }
  }
   }`
}
export function getCategoryDetails(keyword) {
  return /* groq */ `*[_type == "category"  && slug.current == "${keyword}" && !(_id in path("drafts.**"))]{
  title,
  description
 }[0]`
}

// prettier-ignore
export function getPostsByCategory(keyword) {
  return /* groq */ `*[_type == "post" && categories[]->slug.current match "${keyword}"  && !(_id in path("drafts.**"))] | order(publishedAt desc)  {
    title,
    slug,
    categories[]->{
      title,
      slug,
      description
    },
    short_description,
    image,
    publishedAt,
 }`
}

// prettier-ignore
export function getCountryBySlug(slug) {
  return /* groq */ `*[_type == "country" && (slug.current match "${slug}" || name match "${slug}" || country_code match "${slug}") && !(_id in path("drafts.**"))] | order(order asc) [0]{
      name,
      image,
      slug,
      "tournaments": *[_type == "tournament" && references(^._id)]{
        name,
        image,
        slug,
"teams": teams[]->{
		name,
    code,
    slug,
    image
	},
  "teamReference": teams[].team->{
		name,
    code,
    slug,
    image
	},
    }
 }
 {
   ...,
   "teams" : teams[name != null] + teamReference[name != null],
 }`
}

export function getNews() {
  return /* groq */ `*[_type == "category" && title == "news" && !(_id in path("drafts.**"))]{
"posts": *[_type == "post" && references(^._id)]{
     title,
    slug,
    categories[]->{
      title,
      slug,
      description
    },
    short_description,
    image,
    publishedAt,
  }  
}[0]`
}

/**
 * You can also re-use parts of projections as fragments.
 * In this case, we're defining that, to render an author card, we need their name, slug & image.
 */
export const AUTHOR_CARD_FRAGMENT = `
name,
slug,
image,
`
export const TEAM_CARD_FRAGMENT = `
name,
code,
slug,
image
`
export const TOURNAMENTS_FRAGMENT = `
name,
image,
slug,
`
export const MATCHES_FRAGMENT = `
match_no,
week_no,
slug,
day_no,
matchDate,
status,
team1,
team2,
`
const MATCH_TEAM_FRAGMENT = /* groq */ `
match_no,
week_no,
day_no,
slug,
matchDate,
status,
team1{game1,game2,game3,info->{country_code, name, code,image,slug}},
team2{game1,game2,game3,info->{country_code, name, code,image,slug}},
`

const PLAYOFF_MATCH_TEAM_FRAGMENT = /* groq */ `
subtitle,
match_length,
slug,
matchDate,
status,
team1{game1,game2,game3,game4,game5,game6,game7,info->{country_code, name, code,image,slug}},
team2{game1,game2,game3,game4,game5,game6,game7,info->{country_code, name, code,image,slug}},
`

export function getDailyRandomFacts() {
  return /* groq */ `*[_type == "randomFact" && !(_id in path("drafts.**"))]|order(_createdAt desc){
description
}[0]`
}
export function getCategories() {
  return /* groq */ `*[_type == "category" && !(_id in path("drafts.**")) ]|order(order asc){
  title,
  slug,
  _id
 }`
}

// prettier-ignore
export function getBannersHome() {
  return /* groq */ `*[
    _type == "banner" && target == "home"
  ] {
    target,
    image,
 }`
}

export function getTournamentQuery(status) {
  return /* groq */ ` *[_type == "tournament" && status == "${status}" && !(_id in path("drafts.**"))]|order(order asc){
  _id,
  name,
  slug,
  image,
  livestream,
  livestreamCover,
  matchFormat,
  countryBased,
  pointSystems->{sweepSeriesWin, win, loss},
  country->{
  name,
  country_code,
  image,
  slug
  },
 "participatingCountries": participatingCountries[]->{
		 name,
  country_code,
  image,
  slug
	},
"teams": teams[]->{
		name,
    code,
    slug,
    image
	},
  "teamReference": teams[].team->{
		name,
    code,
    slug,
    image
	},
  "regularSeasonMatches": regularSeasonMatches[]->{
		match_no,
    week_no,
    day_no,
    slug,
    matchDate,
    status,
    team1{
      game1,    
      game2,    
      game3,    
      info->{
       code,
       image,
       slug,
      }
    },
    team2{
      game1,    
      game2,    
      game3,    
      info->{
       code,
       image,
       slug,
      }
    }
	},
  "standings": *[_type == "team" && references(^._id) && !(_id in path("drafts.**"))]|order(_createdAt desc){
    code,
    image,
    slug,
    "team1Matches": *[ _type == "match" && team1.info->._id == ^._id && status == "finished" && references(^._id) && !(_id in path("drafts.**"))]{team1},
    "team2Matches": *[ _type == "match" && team2.info->._id == ^._id && status == "finished" && references(^._id) && !(_id in path("drafts.**"))]{team2},
    "team1MatchesLeft": *[ _type == "match" && team1.info->._id == ^._id && (status == "upcoming" || status == "ongoing") && references(^._id) && !(_id in path("drafts.**"))]{team1},
    "team2MatchesLeft": *[ _type == "match" && team2.info->._id == ^._id && (status == "upcoming" || status == "ongoing") && references(^._id) && !(_id in path("drafts.**"))]{team2},
  }
  {
    //...,
    code,
    image,
    slug,
    "matchesLeft": count(team1MatchesLeft) + count(team2MatchesLeft),
    "totalMatches" : count(team1Matches) + count(team2Matches),
    "team1Matches" : count(team1Matches),
    "team2Matches" : count(team2Matches),
    
    "sweepSeriesWins" : count(team1Matches[team1.game1 == true && team1.game2 == true ]) + count(team2Matches[team2.game1 == true && team2.game2 == true ]),
    "nonSweepSeriesWins" : 
    count(team1Matches[team1.game1 == true && team1.game2 == false  && team1.game3 == true ]) + 
    count(team1Matches[team1.game1 == false && team1.game2 == true  && team1.game3 == true ]) + 
    count(team2Matches[team2.game1 == true && team2.game2 == false  && team2.game3 == true ])+ 
    count(team2Matches[team2.game1 == false && team2.game2 == true  && team2.game3 == true ]),
    
    "sweepSeriesLoses" : count(team1Matches[team1.game1 == false && team1.game2 == false ]) + count(team2Matches[team2.game1 == false && team2.game2 == false ]),
    "nonSweepSeriesLoses" : 
    count(team1Matches[team1.game1 == false && team1.game2 == true  && team1.game3 == false ]) + 
    count(team1Matches[team1.game1 == true && team1.game2 == false  && team1.game3 == false ]) + 
    count(team2Matches[team2.game1 == false && team2.game2 == true  && team2.game3 == false ])+ 
    count(team2Matches[team2.game1 == true && team2.game2 == false  && team2.game3 == false ]),
    
    
    "game1Wins" : count(team1Matches[team1.game1 == true]) + count(team2Matches[team2.game1 == true]),
    "game2Wins" : count(team1Matches[team1.game2 == true]) + count(team2Matches[team2.game2 == true]),
    "game3Wins" : count(team1Matches[team1.game3 == true]) + count(team2Matches[team2.game3 == true]),
    
    "game1Loses" : count(team1Matches[team1.game1 == false]) + count(team2Matches[team2.game1 == false]),
    "game2Loses" : count(team1Matches[team1.game2 == false]) + count(team2Matches[team2.game2 == false]),
    "game3Loses" : count(team1Matches[team1.game1 == false && team1.game2 == true && team1.game3 == false]) + count(team1Matches[team1.game1 == true && team1.game2 == false && team1.game3 == false]) + count(team2Matches[team2.game2 == false && team2.game2 == true && team2.game3 == false]) + count(team2Matches[team2.game2 == true && team2.game2 == false && team2.game3 == false]),
  }
  {
    ...,
    "seriesWins": sweepSeriesWins + nonSweepSeriesWins,
    "seriesLoses": sweepSeriesLoses + nonSweepSeriesLoses,
    "totalGames" : (sweepSeriesWins * 2) + (sweepSeriesLoses * 2) + (nonSweepSeriesWins * 3) + (nonSweepSeriesLoses * 3),
    "wins": game1Wins + game2Wins + game3Wins,
    "loses": game1Loses + game2Loses + game3Loses,
  }
  {
    ...,
    "seriesWinRate": (seriesWins / totalMatches) * 100,
    "gameWinRate":  (wins / totalGames) * 100,
    "points": (sweepSeriesWins * 3) + (nonSweepSeriesWins * 2) + nonSweepSeriesLoses
  }| order(points desc),
}
 {
   ...,
   "teams" : teams[name != null] + teamReference[name != null],
 }
{
   ...,
   "upcomingMatches" :  regularSeasonMatches[status == 'upcoming' || status == 'ongoing' && !(_id in path("drafts.**"))]| order(matchDate asc) [0..5]
}` //groq query end
}

export function getTournamentBySlug(slug) {
  return /* groq */ ` *[_type == "tournament" && slug.current == "${slug}" && !(_id in path("drafts.**"))] | order(order asc) [0]{
  _id,
  name,
  slug,
  image,
  livestream,
  livestreamCover,
  currentWeek,
  hideStanding,
  countryBased,
  groupStage,
  status,
  groupA[]->{
		name,
    country_code,
    image,
    slug
	},
  groupB[]->{
		name,
    country_code,
    image,
    slug
	},
  groupC[]->{
		name,
    country_code,
    image,
    slug
	},
  groupD[]->{
		name,
    country_code,
    image,
    slug
	},
  tournamentChampion->{
		name,
    "players": players[].player->{
      name,
      image,
      slug,
      "roles": playerRole[]->{name}
    },
    code,
    country_code,
    slug,
    image
	},
  tournament2ndPlace->{
		name,
    "players": players[].player->{
      name,
      image,
      slug,
      "roles": playerRole[]->{name}
    },
    code,
    country_code,
    slug,
    image
	},
  tournament3rdPlace->{
		name,
    "players": players[].player->{
      name,
      image,
      slug,
      "roles": playerRole[]->{name}
    },
    code,
    country_code,
    slug,
    image
	},
  startDate,
  endDate,
  rules,
  matchFormat,
  country->{
  name,
  country_code,
  image,
  slug
  },
 "participatingCountries": participatingCountries[]->{
		 name,
  country_code,
  image,
  slug
	},
"teams": teams[]->{
		name,
    code,
    slug,
    image
	},
  "teamReference": teams[].team->{
		name,
    code,
    slug,
    image
	},
  playoffBracketFormat->{
    name,
    description,
    image,
    slug
  },
  "playoffMatches": playoffMatches[]->{${PLAYOFF_MATCH_TEAM_FRAGMENT}}| order(matchDate desc),
  "regularSeasonMatches": regularSeasonMatches[]->{${MATCH_TEAM_FRAGMENT}},
  "standings": *[_type == "team" && references(^._id) && !(_id in path("drafts.**"))]|order(_createdAt desc){
    name,
    code,
    image,
    slug,
    "team1Matches": *[ _type == "match" && team1.info->._id == ^._id && status == "finished" && slug.current match "${slug}" && !(_id in path("drafts.**"))]{team1},
    "team2Matches": *[ _type == "match" && team2.info->._id == ^._id && status == "finished" && slug.current match "${slug}" && !(_id in path("drafts.**"))]{team2},
    "team1MatchesLeft": *[ _type == "match" && team1.info->._id == ^._id && (status == "upcoming" || status == "ongoing") && slug.current match "${slug}" && !(_id in path("drafts.**"))]{team1},
    "team2MatchesLeft": *[ _type == "match" && team2.info->._id == ^._id && (status == "upcoming" || status == "ongoing") && slug.current match "${slug}" && !(_id in path("drafts.**"))]{team2},
  }
  {
    //...,
    name,
    code,
    country_code,
    image,
    slug,
    "matchesLeft": count(team1MatchesLeft) + count(team2MatchesLeft),
    "totalMatches" : count(team1Matches) + count(team2Matches),
    "team1Matches" : count(team1Matches),
    "team2Matches" : count(team2Matches),
    
    "sweepSeriesWins" : count(team1Matches[team1.game1 == true && team1.game2 == true ]) + count(team2Matches[team2.game1 == true && team2.game2 == true ]),
    "nonSweepSeriesWins" : 
    count(team1Matches[team1.game1 == true && team1.game2 == false  && team1.game3 == true ]) + 
    count(team1Matches[team1.game1 == false && team1.game2 == true  && team1.game3 == true ]) + 
    count(team2Matches[team2.game1 == true && team2.game2 == false  && team2.game3 == true ])+ 
    count(team2Matches[team2.game1 == false && team2.game2 == true  && team2.game3 == true ]),
    
    "sweepSeriesLoses" : count(team1Matches[team1.game1 == false && team1.game2 == false ]) + count(team2Matches[team2.game1 == false && team2.game2 == false ]),
    "nonSweepSeriesLoses" : 
    count(team1Matches[team1.game1 == false && team1.game2 == true  && team1.game3 == false ]) + 
    count(team1Matches[team1.game1 == true && team1.game2 == false  && team1.game3 == false ]) + 
    count(team2Matches[team2.game1 == false && team2.game2 == true  && team2.game3 == false ])+ 
    count(team2Matches[team2.game1 == true && team2.game2 == false  && team2.game3 == false ]),
    
    
    "game1Wins" : count(team1Matches[team1.game1 == true]) + count(team2Matches[team2.game1 == true]),
    "game2Wins" : count(team1Matches[team1.game2 == true]) + count(team2Matches[team2.game2 == true]),
    "game3Wins" : count(team1Matches[team1.game3 == true]) + count(team2Matches[team2.game3 == true]),
    
    "game1Loses" : count(team1Matches[team1.game1 == false]) + count(team2Matches[team2.game1 == false]),
    "game2Loses" : count(team1Matches[team1.game2 == false]) + count(team2Matches[team2.game2 == false]),
    "game3Loses" : count(team1Matches[team1.game1 == false && team1.game2 == true && team1.game3 == false]) + 
    count(team1Matches[team1.game1 == true && team1.game2 == false && team1.game3 == false]) + 
    count(team2Matches[team2.game2 == false && team2.game2 == true && team2.game3 == false]) + 
    count(team2Matches[team2.game2 == true && team2.game2 == false && team2.game3 == false]),
  }
  {
    ...,
    "seriesWins": sweepSeriesWins + nonSweepSeriesWins,
    "seriesLoses": sweepSeriesLoses + nonSweepSeriesLoses,
    "totalGames" : (sweepSeriesWins * 2) + (sweepSeriesLoses * 2) + (nonSweepSeriesWins * 3) + (nonSweepSeriesLoses * 3),
    "wins": game1Wins + game2Wins + game3Wins,
    "loses": game1Loses + game2Loses + game3Loses,
  }
  {
    ...,
    "seriesWinRate": (seriesWins / totalMatches) * 100,
    "gameWinRate":  (wins / totalGames) * 100,
    "points": (sweepSeriesWins * 3) + (nonSweepSeriesWins * 2) + nonSweepSeriesLoses
  }| order(points desc),
}
{
   ...,
     "teams" : teams[name != null] + teamReference[name != null],
   "upcomingMatches" :  regularSeasonMatches[status == 'upcoming']| order(matchDate asc),
   "ongoingMatches" :  regularSeasonMatches[status == 'ongoing']| order(matchDate asc),
   "finishedMatches" :  regularSeasonMatches[status == 'finished']| order(matchDate desc),
}` //groq query end
}

export function getTournamentsByStatus(status) {
  return /* groq */ ` *[_type == "tournament" && status == "${status}" && !(_id in path("drafts.**"))]|order(_createdAt desc){
  _id,
  name,
  slug,
  status,
  image,
  currentWeek,
  country->{
  name,
  country_code,
  image,
  slug
  },
 "participatingCountries": participatingCountries[]->{
	name,
  country_code,
  image,
  slug
	},
"teams": teams[]->{
		name,
    code,
    slug,
    image
	},
  "teamReference": teams[].team->{
		name,
    code,
    slug,
    image
	},
}
 {
   ...,
   "teams" : teams[name != null] + teamReference[name != null],
 }` //groq query end
}

export function getTournamentsByStatusLandingPage(status) {
  return /* groq */ ` *[_type == "tournament" && status == "${status}" && featured == null && !(_id in path("drafts.**"))]|order(order asc){
  name,
  slug,
  image,
  currentWeek,
  country->{
    name,
    country_code,
    image,
    slug
  },
 "participatingCountries": participatingCountries[]->{
	name,
    country_code,
    image,
    slug
	}
}` //groq query end
}

export function getTournamentsByFeatured() {
  return /* groq */ ` *[_type == "tournament"  && (status == "ongoing" || status == "upcoming") && featured == true && !(_id in path("drafts.**"))]|order(order asc){
  name,
  slug,
  image,
  currentWeek,
  featured,
  country->{
    name,
    country_code,
    image,
    slug
  },
 "participatingCountries": participatingCountries[]->{
	name,
    country_code,
    image,
    slug
	}
}` //groq query end
}

export function getPLayerBySlug(slug) {
  return /* groq */ ` *[_type == "player" && slug.current match "${slug}" && !(_id in path("drafts.**"))] | order(_createdAt asc) [0]{  
  _id,
  name,
  bio,
  _createdAt,
  _updatedAt,
  image,
  slug,
  "playerRole" : playerRole[]->{name,slug},
  "team": *[_type=="team" && ^._id in players[].player._ref][0]{
  name,
  slug,
  image,
  country->{
      name,
      country_code,
      image,
      slug
  },
  "tournaments": tournaments[]->{
    name,
    slug,
    image,
    "teams": teams[]->{
      name,
      code,
      slug,
      image
    },
    "teamReference": teams[].team->{
      name,
      code,
      slug,
      image
    },
    country->{
      name,
      country_code,
      image,
      slug
    }
   }
  }}`
}

export function getTeamBySlug(slug) {
  return /* groq */ ` *[_type == "team" && slug.current == "${slug}" && !(_id in path("drafts.**"))] | order(_createdAt asc) [0]{
	name,
    code,
    slug,
    image,
    bio[] {
      ...,
			children[] {
				...,
			}
    },
  country->{
      name,
      country_code,
      image,
      slug
  },
 "tournaments": tournaments[]->{
   name,
    slug,
    image,
    status,
    _createdAt,
    matchFormat,
    countryBased,
  "standings": *[_type == "team" && slug.current == "${slug}" && references(^._id) && !(_id in path("drafts.**"))]|order(_createdAt desc){
    code,
    image,
    slug,
    "team1Matches": *[ _type == "match" && team1.info->._id == ^._id && status == "finished" && slug.current match ^.^.slug.current && !(_id in path("drafts.**"))]{team1},
    "team2Matches": *[ _type == "match" && team2.info->._id == ^._id && status == "finished" && slug.current match ^.^.slug.current && !(_id in path("drafts.**"))]{team2},
    "team1MatchesLeft": *[ _type == "match" && team1.info->._id == ^._id && (status == "upcoming" || status == "ongoing") && slug.current match ^.^.slug.current && !(_id in path("drafts.**"))]{team1},
    "team2MatchesLeft": *[ _type == "match" && team2.info->._id == ^._id && (status == "upcoming" || status == "ongoing") && slug.current match ^.^.slug.current && !(_id in path("drafts.**"))]{team2},
  }
  {
    //...,
    code,
    image,
    slug,
    "matchesLeft": count(team1MatchesLeft) + count(team2MatchesLeft),
    "totalMatches" : count(team1Matches) + count(team2Matches),
    "team1Matches" : count(team1Matches),
    "team2Matches" : count(team2Matches),
    
    "sweepSeriesWins" : count(team1Matches[team1.game1 == true && team1.game2 == true ]) + count(team2Matches[team2.game1 == true && team2.game2 == true ]),
    "nonSweepSeriesWins" : 
    count(team1Matches[team1.game1 == true && team1.game2 == false  && team1.game3 == true ]) + 
    count(team1Matches[team1.game1 == false && team1.game2 == true  && team1.game3 == true ]) + 
    count(team2Matches[team2.game1 == true && team2.game2 == false  && team2.game3 == true ])+ 
    count(team2Matches[team2.game1 == false && team2.game2 == true  && team2.game3 == true ]),
    
    "sweepSeriesLoses" : count(team1Matches[team1.game1 == false && team1.game2 == false ]) + count(team2Matches[team2.game1 == false && team2.game2 == false ]),
    "nonSweepSeriesLoses" : 
    count(team1Matches[team1.game1 == false && team1.game2 == true  && team1.game3 == false ]) + 
    count(team1Matches[team1.game1 == true && team1.game2 == false  && team1.game3 == false ]) + 
    count(team2Matches[team2.game1 == false && team2.game2 == true  && team2.game3 == false ])+ 
    count(team2Matches[team2.game1 == true && team2.game2 == false  && team2.game3 == false ]),
    
    
    "game1Wins" : count(team1Matches[team1.game1 == true]) + count(team2Matches[team2.game1 == true]),
    "game2Wins" : count(team1Matches[team1.game2 == true]) + count(team2Matches[team2.game2 == true]),
    "game3Wins" : count(team1Matches[team1.game3 == true]) + count(team2Matches[team2.game3 == true]),
    
    "game1Loses" : count(team1Matches[team1.game1 == false]) + count(team2Matches[team2.game1 == false]),
    "game2Loses" : count(team1Matches[team1.game2 == false]) + count(team2Matches[team2.game2 == false]),
    "game3Loses" : count(team1Matches[team1.game1 == false && team1.game2 == true && team1.game3 == false]) + count(team1Matches[team1.game1 == true && team1.game2 == false && team1.game3 == false]) + count(team2Matches[team2.game2 == false && team2.game2 == true && team2.game3 == false]) + count(team2Matches[team2.game2 == true && team2.game2 == false && team2.game3 == false]),
  }
  {
    ...,
    "seriesWins": sweepSeriesWins + nonSweepSeriesWins,
    "seriesLoses": sweepSeriesLoses + nonSweepSeriesLoses,
    "wins": game1Wins + game2Wins + game3Wins,
    "loses": game1Loses + game2Loses + game3Loses,
     "totalGames" : game1Wins + game2Wins + game3Wins + game1Loses + game2Loses + game3Loses,
  }
  {
    ...,
    "seriesWinRate": (seriesWins / totalMatches) * 100,
    "gameWinRate":  (wins / totalGames) * 100,
    "points": (sweepSeriesWins * 3) + (nonSweepSeriesWins * 2) + nonSweepSeriesLoses
  }| order(points desc)
  ,
"teams": teams[]->{
		name,
    code,
    slug,
    image
	},
  "teamReference": teams[].team->{
		name,
    code,
    slug,
    image
	},
 }| order(_createdAt desc),
  "players": players[].player->{
      name,
      image,
      slug,
      "roles": playerRole[]->{name}
  },
 "team1Matches": *[ _type == "match" && team1.info->._id == ^._id && status == "finished" && !(_id in path("drafts.**"))]{${MATCH_TEAM_FRAGMENT}},
  "team2Matches": *[ _type == "match" && team2.info->._id == ^._id && status == "finished" && !(_id in path("drafts.**"))]{${MATCH_TEAM_FRAGMENT}},
  "team1MatchesLeft": *[ _type == "match" && team1.info->._id == ^._id && (status == "upcoming" || status == "ongoing") && !(_id in path("drafts.**"))] {${MATCH_TEAM_FRAGMENT}},
  "team2MatchesLeft": *[ _type == "match" && team2.info->._id == ^._id && (status == "upcoming" || status == "ongoing") && !(_id in path("drafts.**"))]{${MATCH_TEAM_FRAGMENT}}
 
}
{
    ...,
    "upcomingMatches" :  team1MatchesLeft[status == 'upcoming'] + team2MatchesLeft[status == 'upcoming'],
    "ongoingMatches" :  team1MatchesLeft[status == 'ongoing']  + team2MatchesLeft[status == 'ongoing'],
    "finishedMatches" :  team1Matches[status == 'finished'] + team2Matches[status == 'finished'] ,
    "matchWins": team1Matches[team1.game1 == true && team1.game2 == true ] + team2Matches[team2.game1 == true && team2.game2 == true ] +
    team1Matches[team1.game1 == true && team1.game2 == false  && team1.game3 == true ] + 
    team1Matches[team1.game1 == false && team1.game2 == true  && team1.game3 == true ] + 
    team2Matches[team2.game1 == true && team2.game2 == false  && team2.game3 == true ]+ 
    team2Matches[team2.game1 == false && team2.game2 == true  && team2.game3 == true ],
   "matchLoses": team1Matches[team1.game1 == false && team1.game2 == false ] + team2Matches[team2.game1 == false && team2.game2 == false ] + 
    team1Matches[team1.game1 == false && team1.game2 == true  && team1.game3 == false ] + 
    team1Matches[team1.game1 == true && team1.game2 == false  && team1.game3 == false ] + 
    team2Matches[team2.game1 == false && team2.game2 == true  && team2.game3 == false ]+ 
    team2Matches[team2.game1 == true && team2.game2 == false  && team2.game3 == false ],
    "matchesLeft": count(team1MatchesLeft) + count(team2MatchesLeft),
    "totalMatches" : count(team1Matches) + count(team2Matches),
    "team1Matches" : count(team1Matches),
    "team2Matches" : count(team2Matches),
    
    "sweepSeriesWins" : count(team1Matches[team1.game1 == true && team1.game2 == true ]) + count(team2Matches[team2.game1 == true && team2.game2 == true ]),
    "nonSweepSeriesWins" : 
    count(team1Matches[team1.game1 == true && team1.game2 == false  && team1.game3 == true ]) + 
    count(team1Matches[team1.game1 == false && team1.game2 == true  && team1.game3 == true ]) + 
    count(team2Matches[team2.game1 == true && team2.game2 == false  && team2.game3 == true ])+ 
    count(team2Matches[team2.game1 == false && team2.game2 == true  && team2.game3 == true ]),
    
    "sweepSeriesLoses" : count(team1Matches[team1.game1 == false && team1.game2 == false ]) + count(team2Matches[team2.game1 == false && team2.game2 == false ]),
    "nonSweepSeriesLoses" : 
    count(team1Matches[team1.game1 == false && team1.game2 == true  && team1.game3 == false ]) + 
    count(team1Matches[team1.game1 == true && team1.game2 == false  && team1.game3 == false ]) + 
    count(team2Matches[team2.game1 == false && team2.game2 == true  && team2.game3 == false ])+ 
    count(team2Matches[team2.game1 == true && team2.game2 == false  && team2.game3 == false ]),
    
    
    "game1Wins" : count(team1Matches[team1.game1 == true]) + count(team2Matches[team2.game1 == true]),
    "game2Wins" : count(team1Matches[team1.game2 == true]) + count(team2Matches[team2.game2 == true]),
    "game3Wins" : count(team1Matches[team1.game3 == true ]) + count(team2Matches[team2.game3 == true]),
    
    "game1Loses" : count(team1Matches[team1.game1 == false]) + count(team2Matches[team2.game1 == false]),
    "game2Loses" : count(team1Matches[team1.game2 == false]) + count(team2Matches[team2.game2 == false]),
    "game3Loses" : count(team1Matches[team1.game1 == false && team1.game2 == true && team1.game3 == false]) + 
    count(team1Matches[team1.game1 == true && team1.game2 == false && team1.game3 == false]) +  
    count(team2Matches[team2.game2 == false && team2.game2 == true && team2.game3 == false]) + 
    count(team2Matches[team2.game2 == true && team2.game2 == false && team2.game3 == false]),
  }
  {
    ...,
    "seriesWins": sweepSeriesWins + nonSweepSeriesWins,
    "seriesLoses": sweepSeriesLoses + nonSweepSeriesLoses,
    "totalGames" : game1Wins + game2Wins + game3Wins + game1Loses + game2Loses + game3Loses,
    "wins": game1Wins + game2Wins + game3Wins,
    "loses": game1Loses + game2Loses + game3Loses,
  }
  {
    ...,
    "ongoingMatches": ongoingMatches | order(matchDate asc),
    "upcomingMatches": upcomingMatches | order(matchDate asc),
    "finishedMatches": finishedMatches | order(matchDate desc),
    "matchWins": matchWins | order(matchDate desc),
    "matchLoses": matchLoses | order(matchDate desc),
    "seriesWinRate": (seriesWins / totalMatches) * 100,
    "gameWinRate":  (wins / totalGames) * 100,
    "points": (sweepSeriesWins * 3) + (nonSweepSeriesWins * 2) + nonSweepSeriesLoses
  }
 ` //groq query end
}
