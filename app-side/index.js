import { gettext } from 'i18n'
import { MessageBuilder } from '../shared/message'

 const messageBuilder = new MessageBuilder()

AppSideService({
  onInit() {
    console.log(gettext('example'))
    messageBuilder.listen(() => {})
 /*   settings.settingsStorage.addListener('change', async ({ key, newValue, oldValue }) => {
      if (key === 'token' && newValue) {
        // ...
        await reLogin()
      }
    })

    messageBuilder.on('request', (ctx) => {
      const jsonRpc = messageBuilder.buf2Json(ctx.request.payload)
      if (jsonRpc.method === 'GET_DATA') {
        return fetchData(ctx)
      }
    })*/
  },

  onRun() {
  },

  onDestroy() {
  }
})
