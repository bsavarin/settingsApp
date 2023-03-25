Simple sample app to demonstrate how to store app settings in Zepp OS.

Some settings are to be internal (not in the settings menu) and are meant to act as status codes to be retained after the app is closed.  Others are meant to be changed by the user in the settings menu.
(These are still in progress as I do not know how to set them up - help required 🙏)

Settings:-
1. Status Codes (variable "statusSwitch" - internal) - tapping the status text will change the status code and the message displayed on the page.  The chosed status code should remin the same after the app has been closed.
2. Background colour (variable "backgroundColour" - internal) - tapping the top half of the screen will change the background colour and should remain at the changed colour after the app has been closed.
3. Date Format (variable "dateFormat" - settings menu) - the user will choose the date format in the settings menu and this should be retained even after the app has been closed, and reload with these new settings.
4. Temperature unit (variable "tempUnit" - settings menu) - the user will choose the temperature unit in the settings menu and this should be retained even after the app has been closed, and reload with these new settings.

For the first two, the changed information is in the console log, but it resets after reload.

For the last two (index.js 136-148), the settings menu has not been set up at all as I do not have any idea how to go about it, with no examples in the documentation.