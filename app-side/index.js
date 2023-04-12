import { gettext } from 'i18n'
import { MessageBuilder } from '../shared/message'

 const messageBuilder = new MessageBuilder()

 const fetchData = async (ctx) => {
  try {
    console.log("Settings saved from appside");
 //       // A network request is simulated here
//        const { body: { data = {}} = {} } = await mockAPI();
        settings.settingsStorage.setItem(key, JSON.stringify(key))
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
      console.log("Settings saved from appside - listening: "+key+", "+newValue);
//      messageBuilder.call(JSON.parse(newValue));
     if (key) {
        // ...
       // await reLogin()
       if (newValue !== oldValue) {
        messageBuilder.call(JSON.parse(newValue));
   //     newValue = JSON.parse(settings.settingsStorage.getItem(key));
        console.log("Settings saved from appside - "+key+", "+newValue);
       } else {
        console.log("No new settings from appside");
       }
      }
    })



    messageBuilder.on('request', (ctx) => {
      const res = { body: { data = {} } = {} };
      const res1 = typeof res.body === 'string' ?  JSON.parse(res.body) : res.body;
      console.log("Data fetch from appside - "+JSON.stringify(res1));
/*      ctx.response({
        data: { result: JSON.stringify(res1) },
      })*/
      const jsonRpc = messageBuilder.buf2Json(ctx.request.payload)
      if (jsonRpc.method === 'GET_DATA') {
     //   return fetchData(ctx)
        ctx.response({
          data: { result: JSON.stringify(res1) },
        })
      }

/*      if (jsonRpc.method) {
        console.log("Data fetch from appside");
        const newValue = JSON.parse(settings.settingsStorage.getItem(key));
        settings.settingsStorage.setItem('todoList', JSON.stringify(newValue))
        ctx.response({
          data: { result: newValue },
        })
      }*/

    })
  },

  onRun() {
  },

  onDestroy() {
  }
})
