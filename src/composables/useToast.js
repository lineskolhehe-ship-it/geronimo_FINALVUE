import { reactive } from 'vue'

const toast = reactive({ msg: '' })

export function useToast() {
  const notify = (msg) => {
    toast.msg = msg
    setTimeout(() => (toast.msg = ''), 1800)
  }
  return { toast, notify }
}
