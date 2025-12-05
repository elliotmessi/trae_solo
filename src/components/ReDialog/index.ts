import reDialog from './index.vue'
import { withInstall } from '@pureadmin/utils'
import type { EventType, ArgsType, DialogProps, ButtonProps, DialogOptions } from './type'
import { dialogStore, addDialog, closeDialog, updateDialog, closeAllDialog } from './utils'

/** 千万别忘了在下面这三处引入并注册下，放心注册，不使用`addDialog`调用就不会被挂载
 * https://github.com/pure-admin/vue-pure-admin/blob/main/src/App.vue#L4
 * https://github.com/pure-admin/vue-pure-admin/blob/main/src/App.vue#L12
 * https://github.com/pure-admin/vue-pure-admin/blob/main/src/App.vue#L22
 */
const ReDialog = withInstall(reDialog)

export type { EventType, ArgsType, DialogProps, ButtonProps, DialogOptions }
export { ReDialog, dialogStore, addDialog, closeDialog, updateDialog, closeAllDialog }
