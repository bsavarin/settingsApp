/* ====== In case any bugs being found, please report them to @Silver. Thank you! ====== */

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = hmSetting.getDeviceInfo()

const DEFAULT_TEXT_Y_POS = 24
const TEXT_SIZE = 16
// Should also print log into console?
const CONSOLE_LOG_ENABLED = true
// -
const COLOR_WHITE = 0xFFFFFF
const COLOR_RED = 0xFF0000
const COLOR_YELLOW = 0xFFFF00

const PREFIX_LOG 	= "LOG: "
const PREFIX_WARN 	= "WARN: "
const PREFIX_ERR 	= "ERR: "

const TEXT_STYLE_SMALL = {
	x: 0,
	w: DEVICE_WIDTH, // - 42 * 2,
	h: 100,
	color: COLOR_WHITE,
	text_size: TEXT_SIZE,
	align_h: hmUI.align.LEFT, // CENTER_H
	text_style: hmUI.text_style.NONE, // WRAP
}


export class VisLog {
  	constructor(){
		this.z_private___logLastYpos = DEFAULT_TEXT_Y_POS
  	}
    /**
     * 
     * @log Prints message in white text. With a LOG prefix.
     */
	log(msg){ 	this.___makeWidget(PREFIX_LOG 	+ msg, COLOR_WHITE) }
    /**
     * 
     * @log Prints message in yellow text. With a WARN prefix.
     */
	warn(msg){ 	this.___makeWidget(PREFIX_WARN + msg, COLOR_YELLOW) }
    /**
     * 
     * @log Prints message in white text. With a ERR prefix.
     */
	err(msg){ 	this.___makeWidget(PREFIX_ERR 	+ msg, COLOR_RED) }
    /**
     * 
     * @lines Specify how many linebreaks do you need. Defaults to 1.
     */
    lineBreak(lines = 1){ this.z_private___logLastYpos += (TEXT_SIZE + 4) * lines }
	/**
	 * @private Not for outside use. Private method #makeWidget(msg, color)
	 */
	___makeWidget(msg, color){
		hmUI.createWidget(hmUI.widget.TEXT, {
			...TEXT_STYLE_SMALL,
			y: this.z_private___logLastYpos,
			color: color,
			text: msg
		}) 
		this.lineBreak()
		if (CONSOLE_LOG_ENABLED) 
            console.log(msg)
	}
}