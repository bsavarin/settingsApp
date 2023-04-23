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
  //  console.log("Settings saved from appside");
    // A network request is simulated here
     const res = { body: { data = {}} = {} } = await mockAPI();
     const res1 = typeof res.body === 'string' ?  JSON.parse(res.body) : res.body;
//     settings.settingsStorage.setItem(key, JSON.stringify(key))
//     console.log("Settings saved from appside - setItem: "+key);
 //   settings.settingsStorage.setItem(data, JSON.stringify(res1.data))
 //   console.log("Settings saved from appside - setItem: "+data);
     console.log("Settings saved from appside - FETCH DATA: "+res1.data);
    ctx.response({
      data: { result: res1.data },
   /*   data: { 
        result: {
          text: res1["text"],
          dateFormat: res1["dateFormat"],
          tempUnit: res1["tempUnit"]
        }
      }*/
    })
    console.log("Settings saved from appside - FETCH SUCCESS");
    console.log("Settings saved from appside - FETCH RESPONSE: "+res1.data);
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
        // ...
       // await reLogin()
       if (newValue !== oldValue) {
        messageBuilder.call(JSON.parse(newValue));
        settings.settingsStorage.setItem(key, newValue);
   //     newValue = JSON.parse(settings.settingsStorage.getItem(key));
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
