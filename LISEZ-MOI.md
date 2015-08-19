[Read the documentation in english](https://github.com/RomainFallet/Cordova-Ready-iBeacon)

# Cordova-Ready-iBeacon
Cordova Ready iBeacon est un script JS qui fournit une solution complète « prête à être utilisée », basée sur différents plugins Cordova, pour dialoguer avec des balises iBeacons dans une application Cordova.

Cela passe par la vérification de l’appareil en cours d'utilisation (pour vérifier qu’il est bien compatible avec les balises iBeacons) ainsi que la vérification de l'activation du Bluetooth et du Service de localisation (ce dernier étant pour iOS uniquement).
Le script informe l'utilisateur si son appareil n’est pas compatible et demande l’activation des services requis s'il sont désactivés.

## Plateformes supportées
- Android 4.4.2 (KitKat) et plus
- iOS 8 et plus

## Appareils supportés
Seuls les appareils compatibles avec le Bluetooth Low Energy (LE) peuvent se connecter aux balises iBeacons.<br />
[Voir la liste des appareils compatibles](http://www.bluetooth.com/Pages/Bluetooth-Smart-Devices-List.aspx)

## Balises iBeacons testées
Ce script a été testé avec la [balise iBeacon IBKS2015](http://ibeacon.accent-systems.com/shop/ibks105-kits).
N'hésitez pas à indiquer les modèles que vous avez utilisés avec succès.

## Installation

##### Plugins
Cordova Ready iBeacon est basé sur plusieurs plugins qui sont nécessaires pour son bon fonctionnement. Vous pouvez les installer avec ces commandes :

    cordova plugin add https://github.com/randdusing/BluetoothLE
    cordova plugin add https://github.com/petermetz/cordova-plugin-ibeacon
    cordova plugin add https://github.com/selahssea/Cordova-open-native-settings.git
    cordova plugin add https://github.com/Paldom/SpinnerDialog.git
    cordova plugin add https://github.com/numee/cordova-plugin-dialogs
    cordova plugin add cordova.plugins.diagnostic
    cordova plugin add cordova-plugin-device
    
##### HTML

Dans votre fichier HTML, ajoutez ces scripts avant la fin de la balise ```</body>```:

```html
<script src="cordova.js"></script>
<script src="cordova_plugins.js"</script>
<script src="cordova-ready-ibeacon.js"></script>
```

## Initialisation
Dans votre fichier JavaScript, tout votre code doit être encapsulé dans ceci :
```javascript
document.addEventListener('deviceready', function() {
    /* Votre code ici, sinon cela ne marchera pas, du tout */
});
```

Ensuite, vous devez appeler la méthode ```initialize()```. Il faut ajouter les identifiants de toutes les balises que vous souhaitez scanner.
```javascript
ibeacon.initialize({
    /* Les identifiants des balises à scanner */
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
    /* Les actions à effectuer lorsqu'une balise est détectée,
       vous pouvez faire différentes choses en fonction de la proximité */
    actions: function(beacon, identifier) {
    	if (beacon.proximity === 'ProximityImmediate') {
    	  alert('Je suis très près de : ' + identifier);
    	}
    	else if (beacon.proximity === 'ProximityNear') {
    	  alert('Je suis près de : ' + identifier);
    	}
    	else if (beacon.proximity === 'ProximityFar') {
    	  alert('Je suis loin de : ' + identifier);
    	}
    }
});
```

## Début du scan
Vous pouvez scanner les balises iBeacons en utilisant l’événement ``ìbeaconInitialized``` et la méthode ```startScan()``.
Cette événement est déclenché au lancement de l’application puis à chaque fois que celle-ci revient au premier plan.
```javascript
document.addEventListener('ibeaconInitialized', function() {
	ibeacon.startScan();
}, false);
```

## Arrêt du scan
Vous pouvez stopper le scan à tout moment en utilsant la méthode ```stopScan()```. Le script arrête automatiquement le scan lorsque l'application bascule en arrière-plan.
```javascript
ibeacon.stopScan();
````
## Demander l'activation du Bluetooth et de la localisation
Vous pouvez appeler la méthode ```activateServices()``` pour demander à l'utilisateur d'activer le Bluetooth ou la localisation si ce n'est pas déjà le cas. Cette méthode est appelée automatiquement lors de l'initialisation.
```javascript
ibeacon.activateServices();
```

## Autres événements
Certains événements sont écoutés pour vous permettre de réagir face à toutes les situations.

##### ibeaconNotSupported
Cet événement est déclenché lorsque l'appareil de l'utilisateur ne supporte pas le Bluetooth LE, qui est requis pour communiquer avec les balises iBeacons.
```javascript
document.addEventListener('ibeaconNotSupported', function() {
/* Effectuer une action */
}, false);
```

##### ibeaconDisabled
Cet événement est déclenché lorsque l'utilisateur désactive les fonctionalitées liées aux iBeacons grâce à la popup prévue dans le script. Cette popup apparait lorsque l'utilisateur refuse d'activer le Bluetooth ou le Service de localisation.
```javascript
document.addEventListener('ibeaconDisabled', function() {
/* Effectuer une action */
}, false);
```

## Les variables du localStorage
Certaines valeurs sont stockées dans le localStorage pour éviter que certaines actions ne se produisent continuellement.

##### ibeaconBluetoothCompatibility
Retourne une chaîne de caractères '0' lorsque l'appareil n'est pas compatible et '1' lorsque c'est le cas.
```javascript
localStorage.getItem('ibeaconBluetoothCompatibility');
```

##### ibeaconFeaturesDisabled
Retourne une chaîne de caractères '1' lorsque les fonctionalitées liées aux iBeacons sont désactivées par l'utilisateur. Sinon, retourne NULL.
```javascript
localStorage.getItem('ibeaconFeaturesDisabled');
```

##### bluetoothErrorMsg
Retourne une chaîne de caractères '1' lorsque le script affiche la popup indiquant que l'appareil n'est pas compatible. Sinon, retourne NULL.
```javascript
localStorage.getItem('bluetoothErrorMsg');
```

## Lexiques
Tous les textes affichés par ce script peuvent être traduits dans le langage de l'utilisateur, en fonction de son ```navigator.language```.
Pour l'instant, le script est disponible en anglais et en français.

Vous pouvez ajouter une traduction en ajoutant le code de langue ainsi que les textes correspondant en haut du fichier ```cordova-ready-ibeacon.js``` :
```javascript
fr: {
	deviceCheckingErrorTitle: 'Un problème est survenu',
	deviceCheckingErrorMessage: 'Impossible de vérifier si votre appareil est capable de se connecter aux objets connectés. Veuillez activer votre Bluetooth et relancer l\'application.',
	deviceCheckingErrorButton: 'Quitter',

	deviceCheckingMessage: 'Vérification de votre appareil.',

	deviceNotSupportedErrorTitle: 'Votre appareil n\'est pas compatible',
	deviceNotSupportedErrorMessage: 'Votre appareil n\'est pas compatible Bluetooth 4.0, les fonctionalités liées aux objets connectés sont désactivées.',
	deviceNotSupportedErrorButton: 'Continuer',
	
	bluetoothNotEnabledAndroidErrorTitle: 'Activer le Bluetooth ?',
	bluetoothNotEnabledAndroidErrorMessage: 'Vous devez activer le Bluetooth pour communiquer avec les objets connectés.',
	bluetoothNotEnabledAndroidErrorButtons: 'Annuler,Activer',
	
	bluetoothNotEnabledIosErrorTitle: 'Activer le Bluetooth ?',
	bluetoothNotEnabledIosErrorMessage: 'Vous devez activer le Bluetooth pour communiquer avec les objets connectés.\n\n(Réglages -> Bluetooth)',
	bluetoothNotEnabledIosErrorButtons: 'Annuler,Activer',
	
	waitingScreenBluetoothMessage: 'Veuillez activer le Bluetooth',
	
	locationNotEnabledIosErrorTitle: 'Activer le Service de localisation ?',
	locationNotEnabledIosErrorMessage: 'Vous devez activer le Service de localisation pour communiquer avec les objets connectés.\n\n(Réglages -> Confidentialité ->\nService de localisation)',
	locationNotEnabledIosErrorButtons: 'Annuler,Ok',
	
	waitingScreenLocationMessage: 'Veuillez activer la localisation',
	
	locationNotAuthorizedErrorTitle: 'Veuillez autoriser l\'application',
	locationNotAuthorizedErrorMessage: 'Vous devez autoriser cette application à utiliser le Service de localisation pour communiquer avec les objets connectés.',
	locationNotAuthorizedErrorButtons: 'Annuler,Autoriser',
	
	servicesActivationCancelledAndroidTitle: 'Désactiver les fonctionalités connectées ?',
	servicesActivationCancelledAndroidMessage: 'Si vous n\'activez pas le Bluetooth, les fonctionalités liées aux objets connectés vont être désactivées.\n\nÊtes-vous sûr ?',
	servicesActivationCancelledAndroidButtons: 'Activer,Désactiver',
	
	servicesActivationCancelledIosTitle: 'Désactiver les fonctionalités connectées ?',
	servicesActivationCancelledIosMessage: 'Si vous n\'activez pas le Bluetooth et le Service de localisation, les fonctionalités liées aux objets connectés vont être désactivées.\n\nÊtes-vous sûr ?',
	servicesActivationCancelledIosButtons: 'Activer,Désactiver'
}
```


