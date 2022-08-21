export let getScalingColors = (scaling) => {
  if (scaling == 'early') {
    return 'badge-success'
  } else if (scaling == 'normal') {
    return 'badge-info'
  } else if (scaling == 'late') {
    return 'badge-error'
  }
}

export let getLearningCurveColors = (learning) => {
  if (learning == 'easy') {
    return 'badge-success'
  } else if (learning == 'medium') {
    return 'badge-info'
  } else if (learning == 'hard') {
    return 'badge-warning'
  } else if (learning == 'insane') {
    return 'badge-error'
  }
}

export let getTiersColor = (tier) => {
  if (tier == 's+') {
    return 'bg-red-700 text-white'
  } else if (tier == 's') {
    return 'bg-orange-500 text-white'
  } else if (tier == 'a+') {
    return 'bg-yellow-400 text-black'
  } else if (tier == 'a') {
    return 'bg-blue-700 text-white'
  } else if (tier == 'b+') {
    return 'bg-red-300 text-black'
  } else if (tier == 'b') {
    return 'bg-yellow-200 text-black'
  } else if (tier == 'c') {
    return 'bg-purple-700 text-white'
  } else if (tier == 'd') {
    return 'bg-purple-300 text-black'
  }
}

export let getTiersRingColor = (tier) => {
  if (tier == 's+') {
    return 'ring-red-700'
  } else if (tier == 's') {
    return 'ring-orange-500'
  } else if (tier == 'a+') {
    return 'ring-yellow-400'
  } else if (tier == 'a') {
    return 'ring-blue-700'
  } else if (tier == 'b+') {
    return 'ring-red-300'
  } else if (tier == 'b') {
    return 'ring-yellow-200'
  } else if (tier == 'c') {
    return 'ring-purple-700'
  } else if (tier == 'd') {
    return 'ring-purple-300'
  }
}

export let getPowerColor = (power) => {
  if (power >= 8) {
    return 'progress-success'
  } else if (power >= 6) {
    return 'progress-warning'
  } else if (power >= 5) {
    return 'progress-info'
  } else {
    return 'progress-error'
  }
}

export let getPowerRadialColor = (power) => {
  if (power >= 50) {
    return 'text-success'
  } else if (power >= 30) {
    return 'text-warning'
  } else if (power >= 10) {
    return 'text-info'
  } else {
    return 'text-error'
  }
}
