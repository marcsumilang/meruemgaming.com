import {
	highWinRateHeroes,
	highPickRateHeroes,
	highBanRateHeroes,
	highWinRateHeroesPerMarksman,
	highWinRateHeroesPerFighter,
	highWinRateHeroesPerAssassin,
	highWinRateHeroesPerMage,
	highWinRateHeroesPerTank,
	highWinRateHeroesPerSupport
} from '$lib/groq/heroesQueries';
import { client } from '$lib/sanityClient';
// import dayjs from 'dayjs';

// Fetch all valid posts & authors to display in the homepage
// prettier-ignore
export async function get() {
  const data = await client.fetch(/* groq */ `{
    "highWinRateHeroes": ${highWinRateHeroes()},
    "highPickRateHeroes": ${highPickRateHeroes()},
    "highBanRateHeroes": ${highBanRateHeroes()},
    "highWinRateHeroesPerMM": ${highWinRateHeroesPerMarksman()},
    "highWinRateHeroesPerFG": ${highWinRateHeroesPerFighter()},
    "highWinRateHeroesPerAs": ${highWinRateHeroesPerAssassin()},
    "highWinRateHeroesPerMG": ${highWinRateHeroesPerMage()},
    "highWinRateHeroesPerTK": ${highWinRateHeroesPerTank()},
    "highWinRateHeroesPerSP": ${highWinRateHeroesPerSupport()},
  }
`)
// data.top10ViewDate = dayjs().format("MMM DD, YYYY")

  if (data) {
    return {
      status: 200,
      body: data
    }
  }

  return {
    status: 500,
    body: new Error('Internal Server Error')
  }
}
