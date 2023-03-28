/* ====== In case any bugs being found, please report them to @Silver. Thank you! ====== */

const STORAGE_FILE_NAME = "easy_save_storage.json"  // specify the name of you database
const AUTOSAVE_ENABLED = true                       // should autosave on each write action?

export default class EasySave {
	constructor () {
		this.z_private___fileName = STORAGE_FILE_NAME
		this.z_private___contentObj = {}

		if (Object.keys(this.z_private___contentObj).length === 0) 
			this.z_private___load()
	}

	/**
	 * @param {*} key 
	 * @param {*} value 
	 * @comment saves the VALUE into the specified KEY.
	 */
	setKey(key, value){
		this.z_private___contentObj[key] = value;
		if (AUTOSAVE_ENABLED) this.saveAll()
	}

	/**
	 * @param {*} key 
	 * @param {*} defaultValue 
	 * @returns value if found or default value if assigned. Otherwise "undefined".
	 */
	getKey(key, defaultValue = ''){
		if (key in this.z_private___contentObj) 
			return this.z_private___contentObj[key]
		return defaultValue !== '' ? defaultValue : "undefined"
	}

	/**
	 * @param key
	 * @returns TRUE/FALSE depending if the key exists in the storage.
	 */
	hasKey(key){
		return this.z_private___contentObj.hasOwnProperty(key)
	}

	/**
	 * @param key 
	 * @comment removes the KEY from the storage.
	 */
	removeKey(key){
		delete this.z_private___contentObj[key]
		if (AUTOSAVE_ENABLED) this.saveAll()
	}

	/**
	 * @comment writes all the KEYS into the storage for the case when AUTOSAVE_ENABLED is turned off.
	 */
	saveAll(){
		this.z_private___save()
	}

	/**
	 * @comment removes all the KEYS from the storage. If autosave is enabled saves the changes to the file.
	 */
	deleteAll(){
		this.z_private___contentObj = {}
		if (AUTOSAVE_ENABLED) this.saveAll()
	}

	/**
	 * @returns a STRING of all contents in the storage.
	 */
	getContents(){
		return JSON.stringify(this.z_private___contentObj)
	}

	/**
	 * @private core function.
	 */
	z_private___save() {
		const file = hmFS.open(this.z_private___fileName, hmFS.O_RDWR | hmFS.O_TRUNC)
		const contentBuffer = str2ab(JSON.stringify(this.z_private___contentObj))

		hmFS.write(file, contentBuffer, 0, contentBuffer.byteLength)
		hmFS.close(file)
	}

	/**
	 * @private core function.
	 */
	z_private___load() {
		const [fsStat, err] = hmFS.stat(this.z_private___fileName)
		
		if (err === 0) {
			const { size } = fsStat
			const fileContentUnit = new Uint16Array(new ArrayBuffer(size))
			const file = hmFS.open(this.z_private___fileName, hmFS.O_RDONLY | hmFS.O_CREAT)
			hmFS.seek(file, 0, hmFS.SEEK_SET)
			hmFS.read(file, fileContentUnit.buffer, 0, size)
			hmFS.close(file)

			try {
				const val = String.fromCharCode.apply(null, fileContentUnit)
				this.z_private___contentObj = val ? JSON.parse(val) : {}
			} catch (error) {
				this.z_private___contentObj = {}
			}
		}
		return this.z_private___contentObj
	}
}

function str2ab(str) {
	const buf = new ArrayBuffer(str.length * 2) // 2 bytes for each char
	const bufView = new Uint16Array(buf)
	for (let i = 0, strLen = str.length; i < strLen; i++) {
	  	bufView[i] = str.charCodeAt(i)
	}
	return buf
}