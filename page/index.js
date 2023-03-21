import { gettext } from 'i18n'
import * as util from '../utils/index.js'
import { readFileSync, writeFileSync } from '../utils/fs'

hmUI.setStatusBarVisible(false)

const logger = DeviceRuntimeCore.HmLogger.getLogger("fetch_api");
const { messageBuilder } = getApp()._options.globalData

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = hmSetting.getDeviceInfo();
const deviceInfo = hmSetting.getDeviceInfo();
const screenShape = deviceInfo.screenShape;
const screenType = hmSetting.getScreenType();
const clockWidth = Math.min(DEVICE_WIDTH, DEVICE_HEIGHT);
const clockRadius = clockWidth/2;
const clockSquareWidth = Math.round(Math.sqrt(Math.pow(DEVICE_WIDTH,2) + Math.pow(DEVICE_HEIGHT,2))); // hypotenuse
const widthDiff = DEVICE_WIDTH > DEVICE_HEIGHT ? Math.abs(DEVICE_WIDTH-DEVICE_HEIGHT) : 0;
const heightDiff = DEVICE_HEIGHT > DEVICE_WIDTH ? Math.abs(DEVICE_WIDTH-DEVICE_HEIGHT) : 0;

const time = hmSensor.createSensor(hmSensor.id.TIME);
const battery = hmSensor.createSensor(hmSensor.id.BATTERY);

    // time/date
    let hour = 0;
    let minute = 0;
    let second = 0;
    let date = 0;

    let weekdayNum = 0;
    let day = "";
    let monthNum = 0;
    let month = "";
    let separator = "";

    let batteryLevel = 0;

    // text
    let ampm = "";
    let dateText = "";
    let timeDateText = "";
    let timeText1 = "";
    let timeText = "";
    let hourText = "";
    let minText = "";
    let secsText = "";
    let batteryText = "";
    let weatherText = "";

    // weather
    let tempUnit = 0;
    let tempC = 10;
    let tempF = (tempC*9/5) + 32;
    let currentTemp = 0;
    let currTempUnit = "";


    // colour
    let backgroundColour = 0;//0x000000;
    let textColour = 0xffffff;

    // cycle through colours (text, background, foreground)
    let bgColourArray = [0x000000, 0x2F4F4F, 0x696969, 0xBEBEBE, 0xB03060, 0x8B4513, 0xB8860B, 0xDAA520,
      0xBC8F8F, 0x000080, 0x0000FF, 0x1E90FF, 0x00BFFF, 0x808000, 0x006400, 0x00FF00, 
      0x32CD32, 0x483D8B, 0x6A5ACD, 0xA020F0, 0xA020F0, 0xDA70D6, 0xBDB76B, 0xFF4500, 
      0xFF7F50, 0xDB7093, 0xFF1493, 0xCB4154, 0xDC143C, 0xFF0000, 0x008080, 0x4682B4, 
      0xFF6347, 0x6B8E23, 0xA52A2A, 0x8A2BE2, 0x54FF9F, 0xB22222, 0xD2691E, 0xFF8C00, 
      0x4B0082, 0x778899];

   function decimalToHexString(number) {
    if (number < 0) {
      number = 0xFFFFFFFF + number + 1;
    }
    return number.toString(16).toUpperCase();
  }

    // Date Format
    let dateFormat = 0;

    // test status codes
    let statusText = "";
    let statusSwitch = 0;



Page({
  state: {
    scrollList: null,
    tipText: null,
    refreshText: null,
    addButton: null,
    dataList: readFileSync()
  },
  onInit() {
    logger.debug('page onInit invoked')
    this.onMessage()
   // this.getTodoList()
  },
  build() {
    try {
      console.log(gettext('example'))

    // time/date
    hour = util.zeroPad(time.is24Hour == true ? time.hour : (time.hour % 12 ? time.hour % 12 : 12));
    minute = util.zeroPad(time.minute);
    second = util.zeroPad(time.second);
    date = util.zeroPad(time.day);
    timeDiff = (60 - time.second) * 1000;
    currentDate = time.day;

    weekdayNum = time.week == 7 ? 0 : time.week;
    day = gettext(`day_short_${weekdayNum}`).toUpperCase();  
    monthNum = time.month == 12 ? 0 : time.month;
    month = gettext(`month_short_${monthNum-1}`).toUpperCase();
    separator = gettext(`day_month_separator`);

    ampm = (time.is24Hour == true ? "" : (time.hour < 12 ? "am" : "pm"));
    //dateText = (`${day}, ${time.day} ${month} ${time.year}`);
    timeText1 = (`${hour}:${minute} ${ampm}`);
    timeText = (`${hour}:${minute}`);
//    timeDateText = (`${day} ${date} ${month}, ${hour}:${minute}`);
    hourText = (`${hour}`);
    minText = (`${minute}`);
    secsText = (`${second}`);
    batteryText = (`${batteryLevel}%`);

    currTempUnit = tempUnit == 0 ? "°C" : "°F";
    weatherText = (`London - Cloudy ${currentTemp}${currTempUnit}`);

    function loadSettings() {
        // Date Format (settings menu)
        if (dateFormat == 0) {// ddd dd mm
          dateText = (`${day} ${date} ${month}`);
        } else if (dateFormat == 1) {// ddd mm dd
          dateText = (`${day} ${month} ${date}`);
        }

        // Temperature Unit (settinge menu)
        if (tempUnit == 0) { //Celsius
          currentTemp = tempC;
        } else if (tempUnit == 1) { //Fahrenheit
          currentTemp = tempF;
        }

        // test status codes (not on settings menu)
        if (statusSwitch == 1) {
          statusText = "Status 01";
        } else if (statusSwitch == 2) {
          statusText = "Status 02";
        } else if (statusSwitch == 3) {
          statusText = "Status 03";
        } else if (statusSwitch == 4) {
          statusText = "Status 04";
        } else if (statusSwitch == 5) {
          statusText = "Status 05";
        } 

        statusText = "Status "+statusSwitch;
      }

      // tap to change date format
      function click_statusChange() {
        statusSwitch++;
        if (statusSwitch > 5) statusSwitch = 0; 
        console.log("Button pressed - status code "+statusSwitch);
        loadSettings();
        drawBackground();
        drawTestBackground();
        drawAppSettings();
      }

      // tap to change background colours by cycling through the array
      function click_backgroundColour() {
      backgroundColour = bgColourArray[Math.floor(Math.random() * bgColourArray.length)];
      console.log("Button pressed - background colour changed to "+backgroundColour);
      loadSettings();
      drawBackground();
      drawTestBackground();
      drawAppSettings();
    };

    function drawBackground() {
      // background images (round or rect)
      if (screenShape == 1) {
      hmUI.createWidget(hmUI.widget.CIRCLE, {
          //...IMG_BG_ROUND,
          center_x: DEVICE_WIDTH/2,
          center_y: DEVICE_HEIGHT/2,
          radius: DEVICE_WIDTH,
          color: backgroundColour, //screenType == hmSetting.screen_type.AOD ? 0x000000 : backgroundColour,
        })
      } else {
        hmUI.createWidget(hmUI.widget.FILL_RECT, {
          //...IMG_BG_RECT,
          x: 0,
          y: 0,
          w: DEVICE_WIDTH,
          h: DEVICE_HEIGHT,
          radius: 0,
          color: backgroundColour, //screenType == hmSetting.screen_type.AOD ? 0x000000 : backgroundColour,
        })
      }
    }

    function drawTestBackground() { //testing background sizes
      hmUI.createWidget(hmUI.widget.FILL_RECT, {
        // Full size filled rect
        x: 0,
        y: 0,
        w: DEVICE_WIDTH,
        h: DEVICE_HEIGHT,
        radius: 0,
        color: backgroundColour,
      })
      hmUI.createWidget(hmUI.widget.CIRCLE, {
        // Full size filled circle
        center_x: DEVICE_WIDTH/2,
        center_y: DEVICE_HEIGHT/2,
        radius: DEVICE_WIDTH,
        color: backgroundColour,
      })
      hmUI.createWidget(hmUI.widget.STROKE_RECT, {
        // Full size outline rect
        x: 0,
        y: 0,
        w: DEVICE_WIDTH,
        h: DEVICE_HEIGHT,
        radius: 0,
        line_width: 4,
        color: 0xfc6950
      })

      hmUI.createWidget(hmUI.widget.ARC, {
        //Full size outline circle
        x: widthDiff,
        y: heightDiff,
        w: clockWidth,
        h: clockWidth,
        start_angle: -90,
        end_angle: 270,
        color: 0x008b00,
        alpha: 100,
        line_width: 8
      })
    }

    function drawAppSettings() {
      hmUI.createWidget(hmUI.widget.TEXT, {
        text: dateText,
        x: 0,
        y: DEVICE_HEIGHT * 0.35 - 20,
        w: DEVICE_WIDTH,
        h: px(40),
        color: textColour,
        text_size: px(30),
        align_h: hmUI.align.CENTER_H,
        align_v: hmUI.align.CENTER_V,
        text_style: hmUI.text_style.NONE,
        font: 'fonts/DIN1451MittelschriftAlternat-Regular.ttf',
      })

      hmUI.createWidget(hmUI.widget.TEXT, {
        text: weatherText,
        x: 0,
        y: DEVICE_HEIGHT * 0.5 - 15,
        w: DEVICE_WIDTH,
        h: px(30),
        color: textColour,
        text_size: px(20),
        align_h: hmUI.align.CENTER_H,
        align_v: hmUI.align.CENTER_V,
        text_style: hmUI.text_style.NONE,
        font: 'fonts/DIN1451MittelschriftAlternat-Regular.ttf',
      })

      hmUI.createWidget(hmUI.widget.TEXT, {
        text: statusText,
        x: 0,
        y: DEVICE_HEIGHT * 0.65 - 15,
        w: DEVICE_WIDTH,
        h: px(30),
        color: textColour,
        text_size: px(20),
        align_h: hmUI.align.CENTER_H,
        align_v: hmUI.align.CENTER_V,
        text_style: hmUI.text_style.NONE,
        font: 'fonts/DIN1451MittelschriftAlternat-Regular.ttf',
      })

      // tap to change background colours by cycling through the array
      hmUI.createWidget(hmUI.widget.BUTTON, {
        //...IMG_CHG_DFORMAT_BUTTON,
        x: 0,
        y: 0,//DEVICE_HEIGHT * 0.75 - (screenShape == 1 ? 45 : 40),
        text: '',
        w: DEVICE_WIDTH,
        h: DEVICE_HEIGHT * 0.5,
        normal_src: 'transpImgFull.png', // transparent image
        press_src: 'transpImgFull.png',  // transparent image
        show_level: hmUI.show_level.ONLY_NORMAL,
        click_func: () => {
          click_backgroundColour();
        }
      });

      // Tap to switch through status codes
      hmUI.createWidget(hmUI.widget.BUTTON, {
        //...IMG_CHG_DFORMAT_BUTTON,
        x: 0,
        y: DEVICE_HEIGHT * 0.75 - (screenShape == 1 ? 45 : 40),
        text: '',
        w: 400,
        h: 50,
        normal_src: 'transpImg.png', // transparent image
        press_src: 'transpImg.png',  // transparent image
        show_level: hmUI.show_level.ONLY_NORMAL,
        click_func: () => {
          click_statusChange();
        }
      });
    }

      loadSettings();
      drawBackground();
      drawTestBackground();
      drawAppSettings();

    } catch (e) {
      console.log('LifeCycle Error', e)
      e && e.stack && e.stack.split(/\n/).forEach((i) => console.log('error stack', i))
    }
  },
  onDestroy() {
    logger.debug('page onDestroy invoked')
    writeFileSync(this.state.dataList, false)
  },
  onMessage() {
    messageBuilder.on('call', ({ payload: buf }) => {
      const data = messageBuilder.buf2Json(buf)
      const dataList = data.map((i) => ({ name: i }))
      logger.log('call dataList', dataList)
      this.refreshAndUpdate(dataList)
    })
  },
  getTodoList() {
    messageBuilder
      .request({
        method: 'GET_TODO_LIST'
      })
      .then(({ result }) => {
        this.state.dataList = result.map((d) => ({ name: d }))
        logger.log('GET_TODO_LIST dataList', this.state.dataList)
    //    this.createAndUpdateList()
      })
      .catch((res) => {})
  },
  refreshAndUpdate(dataList = []) {
    this.state.dataList = []
    //this.createAndUpdateList(false)

    setTimeout(() => {
      this.state.dataList = dataList
    //  this.createAndUpdateList()
    }, 20)
  }
})
