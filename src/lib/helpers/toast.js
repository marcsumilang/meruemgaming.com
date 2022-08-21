import {toast} from '@zerodevx/svelte-toast'

export const alertSuccess = (label) => {
  toast.push(label, {
    theme: {
      '--toastBackground': '#48BB78',
      '--toastBarBackground': '#2F855A'
    }
  })
}
export const alertError = (label) => {
  toast.push(label, {
    theme: {
      '--toastBackground': '#F56565',
      '--toastBarBackground': '#C53030'
    }
  })
}
