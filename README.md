[Lire la documentation en français](https://github.com/RomainFallet/Cordova-Ready-iBeacon/blob/master/LISEZ-MOI.md)

# Cordova-Ready-iBeacon
Cordova Ready iBeacon is a script that give a complete solution "ready to use", based on several Cordova plugins, to connect to iBeacons in a Cordova application.

It provides by its own the device verification (to make sure the user device is compatible with iBeacons), Bluetooth and Location services verification. The script informs the user about compatibility (when it's not compatible) and request services activation if required ones are disabled.

## Supported platforms
- Android 4.4.2 (KitKat) and higher
- iOS 8 and higher

## Supported devices
Only devices that are compatible with Bluetooth Low Energy (LE) can connect to iBeacons.<br />
[The devices list is available here](http://www.bluetooth.com/Pages/Bluetooth-Smart-Devices-List.aspx)

## Tested iBeacons
• [IBKS105 iBeacon](http://ibeacon.accent-systems.com/shop/ibks105-kits) <br />
• [Beaconinside](http://www.beaconinside.com/buy-ibeacon/) <br /><br />
Feel free to indicates the model you use with success.

## Installation

##### Plugins
Cordova ReadyToUse iBeacon is based on several plugins that you have to install to make it works :

    cordova plugin add https://github.com/randdusing/BluetoothLE
    cordova plugin add https://github.com/petermetz/cordova-plugin-ibeacon
    cordova plugin add https://github.com/selahssea/Cordova-open-native-settings.git
    cordova plugin add https://github.com/Paldom/SpinnerDialog.git
    cordova plugin add https://github.com/numee/cordova-plugin-dialogs
    cordova plugin add cordova.plugins.diagnostic
    cordova plugin add cordova-plugin-device
    
##### HTML
In your HTML file, first add this scripts before the ```</body>``` tag :<br />

```html
<script src="cordova.js"></script>
<script src="cordova_plugins.js"</script>
<script src="cordova-ready-ibeacon.js"></script>
```

## Initialization
In your JavaScript file, all your code must be inside :
```javascript
document.addEventListener('deviceready', function() {
    /* Your code here, if not, it does not work, at all */
});
```

Then, you have to call the ```initialize()``` method. You must add the identifiers of all the beacons you have to scan.
```javascript
ibeacon.initialize({
    /* The identifiers of all the beacons to scan */
    regions: [
    	{
          id: 'myFirstBeacon',
    		uuid: 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
    		major: 1,
    		minor: 1
    	},
    	{
          id: 'mySecondBeacon',
    		uuid: 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
    		major: 1,
    		minor: 2
    	}
    ],
    /* The actions to do when a beacon is detected,
       you can do different things depending on the proximity */
    actions: function(beacon, identifier) {
    	if (beacon.proximity === 'ProximityImmediate') {
    	  alert('I am very next to : ' + identifier);
    	}
    	else if (beacon.proximity === 'ProximityNear') {
    	  alert('I am next to : ' + identifier);
    	}
    	else if (beacon.proximity === 'ProximityFar') {
    	  alert('I am far from : ' + identifier);
    	}
    }
});
```

## Start scanning
Your can start scanning for beacons using the ibeaconInitialized event and the ```startScan()``` method.
This event is fired at the first launch and each time your application is retreived from the background.
```javascript
document.addEventListener('ibeaconInitialized', function() {
	ibeacon.startScan();
}, false);
```

## Stop scanning
You can stop scanning whenever you want using the stopScan() method. This method is called automatically when the app is sent in background.
```javascript
ibeacon.stopScan();
````
## Request Bluetooth and Location activation
You can call ```activateServices()``` method to request Bluetooth and Location activation if disabled. This method is called within the ```initialize()``` method.
```javascript
ibeacon.activateServices();
```

## Other events
Some events are trigerred to let you manage all the situations :

##### ibeaconNotSupported
This event is fired when the user device does not support Bluetooth LE, which is required to connect to iBeacons.
```javascript
document.addEventListener('ibeaconNotSupported', function() {
/* Do something */
}, false);
```

##### ibeaconDisabled
This event is fired when the user disable ibeacons features with the modal provided by the script. This modal appears when the user refuse to enable Bluetooth or Location Services.
```javascript
document.addEventListener('ibeaconDisabled', function() {
/* Do something */
}, false);
```

## LocalStorage values
Some values are stored in the localStorage to prevent some actions to happend continually.

##### ibeaconBluetoothCompatibility
Returns a string '0' when device is not compatible and '1' when it is.
```javascript
localStorage.getItem('ibeaconBluetoothCompatibility');
```

##### ibeaconFeaturesDisabled
Returns a string '1' when ibeacon features are disabled by the user, else returns NULL.
```javascript
localStorage.getItem('ibeaconFeaturesDisabled');
```

##### bluetoothErrorMsg
Returns a string '1' when the script displayed the "bluetooth LE not supported" message, else returns NULL.
```javascript
localStorage.getItem('bluetoothErrorMsg');
```

## Lexicons
All texts displayed by this script can be translated in the user language, based on the ```navigator.language``` parameter.
For now, the script is available in english and french.

You can add a translation by adding your language code and the corresponding texts at the top of the ```cordova-ready-ibeacon.js``` file :
```javascript
en: {
	deviceCheckingErrorTitle: 'Something went wrong',
	deviceCheckingErrorMessage: 'Impossible to check if the device can connect to ibeacons. Please, activate Bluetooth and restart the application.',
	deviceCheckingErrorButton: 'Close',
        
	deviceCheckingMessage: 'Device checking.',
        
	deviceNotSupportedErrorTitle: 'Your device is not supported',
	deviceNotSupportedErrorMessage: 'Your device does not support Bluetooth 4.0, functionalities related to ibeacons are disabled.',
	deviceNotSupportedErrorButton: 'Continue',
	
	bluetoothNotEnabledAndroidErrorTitle: 'Enable Bluetooth ?',
	bluetoothNotEnabledAndroidErrorMessage: 'You must enable Bluetooth to connect to ibeacons.',
	bluetoothNotEnabledAndroidErrorButtons: 'Cancel,Enable',
	
	bluetoothNotEnabledIosErrorTitle: 'Enable Bluetooth ?',
	bluetoothNotEnabledIosErrorMessage: 'You must enable Bluetooth to connect to ibeacons.\n\n(Settings -> Bluetooth)',
	bluetoothNotEnabledIosErrorButtons: 'Cancel,Enable',
	
	waitingScreenBluetoothMessage: 'Please, enable Bluetooth',
	
	locationNotEnabledIosErrorTitle: 'Enable Location Services ?',
	locationNotEnabledIosErrorMessage: 'You must enable Location Services to connect to ibeacons.\n\n(Settings -> Privacy ->\nLocation Services)',
	locationNotEnabledIosErrorButtons: 'Cancel,Ok',
	
	waitingScreenLocationMessage: 'Please, enable Location Services',
	
	locationNotAuthorizedErrorTitle: 'You must authorize the application',
	locationNotAuthorizedErrorMessage: 'You must authorize this application to use Location Services to connect to ibeacons.',
	locationNotAuthorizedErrorButtons: 'Cancel,Authorize',
	
	servicesActivationCancelledAndroidTitle: 'Disable ibeacons features ?',
	servicesActivationCancelledAndroidMessage: 'If you do not enable Bluetooth, ibeacons features will be disabled.\n\nAre you sure ?',
	servicesActivationCancelledAndroidButtons: 'Enable,Disable',
	
	servicesActivationCancelledIosTitle: 'Disable ibeacons features ?',
	servicesActivationCancelledIosMessage: 'If you do not enable Bluetooth and Location Services, ibeacons features will be disabled.\n\nAre you sure ?',
	servicesActivationCancelledIosButtons: 'Enable,Disable'
}
```


