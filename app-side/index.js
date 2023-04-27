import { gettext } from 'i18n'
import { MessageBuilder } from '../shared/message'

 const messageBuilder = new MessageBuilder()

 const defaultData = [
    {text: 'HELLO ZEPPOS'},
    {dateFormat: 0},
    {tempUnit: 0}
 ];
 let dataObjects = Object.entries(defaultData);
 let dataKeys = Object.keys(defaultData);
 let dataValues = Object.values(defaultData);

 // Simulating an asynchronous network request using Promise
const mockAPI = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        body: {
          data: { 
            text: 'HELLO ZEPPOS',
            dateFormat: 0,
            tempUnit: 0,
          }
        }
      })
    }, 1000)
  })
}

const fetchData = async (ctx) => {
  try {
    const res = await mockAPI()
    const data = typeof res === "string" ? JSON.parse(res) : res;
    settings.settingsStorage.setItem("item", JSON.stringify(data))

    console.log("Settings saved from appside - setItem: " + data)
    ctx.response({
      data: { result: data }
    })
    console.log("Settings saved from appside - FETCH SUCCESS");
  } catch (error) {
    console.log("Settings saved from appside - FETCH ERROR");
    ctx.response({
      data: { result: 'ERROR' },
    })
  }
}

AppSideService({
  onInit() {
    console.log(gettext('example'))
    messageBuilder.listen(() => {})
    console.log("Settings saved from appside - Message LISTEN");
    settings.settingsStorage.addListener('change', async ({ key, newValue, oldValue }) => {
     if (key) {
       if (newValue !== oldValue) {
          messageBuilder.call(key, newValue);
  //      settings.settingsStorage.setItem(key, newValue);
        console.log("Settings saved from appside - Message LISTEN for CHANGE: "+key+", "+newValue);
       } else {
        console.log("No new settings from appside");
       }
      }
    })

    messageBuilder.on('request', (ctx) => {
      console.log("Data fetch from appside - Message ON - REQUEST");
      const jsonRpc = messageBuilder.buf2Json(ctx.request.payload)
      if (jsonRpc.method === 'GET_DATA') {
        console.log("Data fetch from appside - Message ON - GET DATA");
         return fetchData(ctx)
      }
    })
  },

  onRun() {
  },

  onDestroy() {
  }
})
