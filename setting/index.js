import { gettext } from 'i18n'

function saveMenuSettings(key, value) {
  console.log("Settings saved from menu - "+key+", "+value);
}

AppSettingsPage({
  state: {
    props: {},
  },
  
/*setDefaults(props) {
  //   props.settingsStorage.clear();
  //this.state.props = props;
   if (!this.state.props.settings.tempUnit) {this.state.props.settingsStorage.setItem('tempUnit', JSON.stringify({selected:[0], values:[{name:"Celsius", value:"0"}]}));}  
   if (!this.state.props.settings.dateFormat) {this.state.props.settingsStorage.setItem('dateFormat', JSON.stringify({selected:[0], values:[{name:"dd/mm/yyyy", value:"0"}]}));} 
   if (!props.settings.backgroundColour) {props.settingsStorage.setItem('backgroundColour', JSON.stringify("#000000"));} 
   console.log("default menu settings loaded - "+JSON.stringify(this.state.props.settings));
 },*/

  build(props) {
    this.state.props = props;
 //   this.setDefaults(props);
    console.log(gettext('example')) 
    return View(
      {
        style: {
          padding: '12px 20px',
        },
      },
      [
        Section({
          style: {
            padding: '12px 0px',
            fontSize: '30px',
            fontWeight: 'bold',
            textAlign: 'center',
          },
          title: "Settings Menu",
        }),
        Section({
          style: {
            padding: '12px 0px 12px 0px',
          },
        }),
        Text ({ fontSize: '15px', verticalAlign: "bottom"}, "Date Format ㅤㅤㅤㅤㅤㅤ"),
 //       Text ({ fontSize: '15px', verticalAlign: 'bottom'}, 'ㅤㅤㅤㅤㅤㅤ'),
        Select({
          settingsKey: "dateFormat",
 //         value: props.settingsStorage.getItem("dateFormat"),
          options: [
            {
              name: "dd/mm/yyyy",
              value: '0',
            },
            {
              name: "mm/dd/yyyy",
              value: '1',
            },
          ],
   /*       onChange: (value) => {
            props.settingsStorage.setItem("dateFormat", value);
            saveMenuSettings("dateFormat", value)
          },*/
        }),
        Section({
          style: {
            padding: '12px 0px 12px 0px',
          },
        }),
        Text ({ fontSize: '15px', verticalAlign: 'bottom'}, "Temperature Unit ㅤㅤㅤㅤ"),
 //       Text ({ fontSize: '15px', verticalAlign: 'bottom'}, 'ㅤㅤㅤㅤ'),
        Select({
          settingsKey: "tempUnit",
   //       value: props.settingsStorage.getItem("tempUnit"),
          options: [
            {
              name: 'Celsius',
              value: '0',
            },
            {
              name: 'Fahrenheit',
              value: '1',
            },
          ],
       /*   onChange: (value) => {
            props.settingsStorage.setItem("tempUnit", value);
            saveMenuSettings("tempUnit", value)
          },*/
        }),
        Section({
          style: {
            padding: '12px 0px 12px 0px',
          },
        }),
        TextInput({
          type: 'color',
          fontSize: '30px',
          label: "Background Colour",
          settingsKey: "backgroundColour",
   //       value: props.settingsStorage.getItem("backgroundColour"),
          placeholder: props.settingsStorage.getItem("backgroundColour"),
 /*         onChange: (value) => {
            props.settingsStorage.setItem("backgroundColour", value);
            saveMenuSettings("backgroundColour", value)
          },*/
        }),
        Section({
          style: {
            padding: '64px 0px 0px 0px',
            fontWeight: 'bold',
          },
          title: "Help and Support",
        }),
        Section({
          style: {
            padding: '12px 0px 12px 0px',
          },
        },
        [Link({ source: "http://www.bvdesigns.info/faq" }, "FAQ - most answers are here")]
        ),
        Section({
          style: {
 //           padding: '12px 0px 12px 0px',
          },
        },
        [Link({ source: "mailto:bvdesigns11@gmail.com?subject=App Name - Support Request" }, "Support E-mail")]
        ),
        Section({
          style: {
            padding: '20px 0px',
            alignItems: 'center',
            textAlign: 'center',
          },
        }),
        Button({
          label: "Save Settings",
          onClick: () => {
         //   this.build();
            console.log("Settings Saved - "+JSON.stringify(this.state.props.settings));
          },
        }),
      ],
    );
  },
 /* onDestroy() {
     function saveSettings() {
      dateFormat = storage.setKey("dateFormat", value);
      tempUnit = storage.setKey("tempUnit", value);
    }
  },*/
})