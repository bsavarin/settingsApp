import { gettext } from 'i18n'

AppSettingsPage({
  build() {
    console.log(gettext('example'))
  },
 /* onDestroy() {
     function saveSettings() {
      dateFormat = storage.setKey("dateFormat", value);
      tempUnit = storage.setKey("tempUnit", value);
    }
  },*/
})