export let getHeroGradeLetter = (heroGrade) => {
  //Hero Grade Max 100
  if (heroGrade >= 60) {
    return 's+'
  } else if (heroGrade >= 50) {
    return 's'
  } else if (heroGrade >= 45) {
    return 'a+'
  } else if (heroGrade >= 35) {
    return 'a'
  } else if (heroGrade >= 25) {
    return 'b+'
  } else if (heroGrade >= 15) {
    return 'b'
  } else if (heroGrade >= 5) {
    return 'c'
  } else {
    return 'd'
  }
}
