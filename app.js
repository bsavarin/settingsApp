import './shared/device-polyfill'
import { MessageBuilder } from './shared/message'
import LocalStorage from "./utils/storage"
const fileName = 'localSettings.txt';

const appId = 20000
const messageBuilder = new MessageBuilder({ appId })

App({
  globalData: {
    messageBuilder: messageBuilder,
    localStorage: null,
    backgroundColour: 0
  },

  onCreate(options) {
    console.log('app on create invoke')
    this.globalData.localStorage = new LocalStorage(fileName);
    const data = this.globalData.localStorage.get();
    this.globalData.backgroundColour = data.backgroundColour || 0;
    messageBuilder.connect()
  },

  onDestroy(options) {
    console.log('app on destroy invoke')
    messageBuilder.disConnect()
  }
})