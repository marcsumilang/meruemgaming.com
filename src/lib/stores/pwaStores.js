import {writable} from 'svelte/store'

export const showInstallButton = writable(null)

export const showInstallPromotion = () => {
  showInstallButton.set(true)
}

export const hideInstallPromotion = () => {
  showInstallButton.set(null)
}
