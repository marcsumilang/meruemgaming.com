export function getPostsByKeyword(searchKeyword) {
  return /* groq */ ` *[_type == "post" && (slug.current match "${searchKeyword}*" || title match "${searchKeyword}*" || short_description match "${searchKeyword}*" ) && !(_id in path("drafts.**"))][0..9]{
    title, image, slug
   }`
}

export function getHeroesByKeyword(searchKeyword) {
  return /* groq */ ` *[_type == "hero" && (slug.current match "${searchKeyword}*" || name match "${searchKeyword}*" ) && !(_id in path("drafts.**"))][0..9]{
    name, image, slug
   }`
}

export function getTournamentByKeyword(searchKeyword) {
  return /* groq */ ` *[_type == "tournament" && (slug.current match "${searchKeyword}*" || name match "${searchKeyword}*" ) && !(_id in path("drafts.**"))][0..9]{
    name, image, slug
   }`
}

export function getMatchByKeyword(searchKeyword) {
  return /* groq */ ` *[_type == "match" && (slug.current match "${searchKeyword}*" || team1.info->.name match "${searchKeyword}*" || team2.info->.name match "${searchKeyword}*" ) && !(_id in path("drafts.**"))][0..9]{
   ${MATCH_TEAM_FRAGMENT}
   }`
}

export function getAboutByKeyword(searchKeyword) {
  return /* groq */ ` *[_type == "about" && (slug.current match "${searchKeyword}*" || name match "${searchKeyword}*" ) && !(_id in path("drafts.**"))][0..9]{
    name, image, slug
   }`
}

export function getTeamByKeyword(searchKeyword) {
  return /* groq */ ` *[_type == "team" && (slug.current match "${searchKeyword}*" || code match "${searchKeyword}*" || name match "${searchKeyword}*" ) && !(_id in path("drafts.**"))][0..9]{
    name, image, slug
   }`
}

const MATCH_TEAM_FRAGMENT = `
match_no,
week_no,
day_no,
slug,
matchDate,
livestream,
status,
team1{game1,game2,game3,info->{name,code,image,slug}},
team2{game1,game2,game3,info->{name,code,image,slug}},
`
