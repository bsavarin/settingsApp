import { gettext } from 'i18n'
import * as util from '../utils/index.js'

 /* let defaultSettings = {
    dateFormat: 0,
    displaySeconds: true,
    btVibrate: true,
    tempUnit: 0,
    weatherProvider: "owm",
    weatherAPIKey: appID,
    weatherUpdate: 3,
    outer_bg_colour: "black",
    inner_bg_colour: "black",
    dial_colour: "white",
    dial_text_colour: "black",
    fg_colour: "white", 
    btStatus: 1
  };
  
  let settings = defaultSettings;*/

/*export let defaultSettings = {
    dateFormat: 0,
    tempUnit: 0,
  };
  
export let user = defaultSettings;*/

  export function saveMenuSettings(key, value) {
    user.key = value;
    console.log("Settings saved from menu - "+key+", "+value);
  }
  
  /*export function storeSettings(key) {
    console.log("Settings saved from menu - "+key+", "+value);
  }*/