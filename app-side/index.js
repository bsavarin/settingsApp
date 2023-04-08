import { gettext } from 'i18n'
import { MessageBuilder } from '../shared/message'

 const messageBuilder = new MessageBuilder()

 const mockAPI = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        body: {
          data: {
            text: 'HELLO ZEPPOS',
            dateFormat: dateFormat,
            tempUnit: tempUnit

          }
        }
      })
    }, 1000)
  })
}

 const fetchData = async (ctx) => {
  try {
    console.log("Settings saved from appside");
        // A network request is simulated here
        const { body: { data = {}} = {} } = await mockAPI();
    ctx.response({
      data: { result: data }
    })
  } catch (error) {
    ctx.response({
      data: { result: 'ERROR' },
    })
  }

}

AppSideService({
  onInit() {
    console.log(gettext('example'))
    messageBuilder.listen(() => {})
    settings.settingsStorage.addListener('change', async ({ key, newValue, oldValue }) => {
     if (key && newValue) {
        // ...
       // await reLogin()
        newValue = JSON.parse(settings.settingsStorage.getItem(key));
        console.log("Settings saved from appside - "+key+", "+newValue);
      }
    })

    messageBuilder.on('request', (ctx) => {
      const jsonRpc = messageBuilder.buf2Json(ctx.request.payload)
      if (jsonRpc.method === 'GET_DATA') {
        return fetchData(ctx)
      }
    })
  },

  onRun() {
  },

  onDestroy() {
  }
})
