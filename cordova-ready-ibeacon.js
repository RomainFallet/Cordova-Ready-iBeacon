/**
 * Cordova ReadyToUse iBeacon
 *
 * The MIT License (MIT)
 *
 * Copyright 2015 by Romain Fallet <rfallet@numee.fr>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */
 
var ibeacon = {
	
	/*
	 * ======================================
	 *              LEXICONS
	 * ======================================
	 */
	 
    /**
     * All the text messages used by this script can be translated
     * with the lexicons.
     * Lexicons are based on the "navigator.language" parameter.
     */
	_lexicons: {
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
            bluetoothNotEnabledIosErrorButtons: 'Annuler,Ok',
            
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
            
            
		},
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
            bluetoothNotEnabledIosErrorButtons: 'Cancel,Ok',
            
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
	},
	
	
	/*
	 * ======================================
	 *        PARAMETERS
	 * ======================================
	 */
	 
    /**
     * The default language used in text messages
     * @var string ibeacon._lang
     */
    _lang: 'fr',
    /**
     * The identifiers of each beacon
     * @var array ibeacon._regions
     */
    _regions: [],
    /**
     * The user actions when a beacon is detected
     * @var function ibeacon._regions
     */
    _actions: function() {},
    /**
     * An event that is fired when bluetooth 4.0 compatibility verification is completed
     * @var function ibeacon._regions
     */
    _verificationComplete: new Event('verificationComplete'),
    /**
     * An event that is fired when ibeacon component is initialized and ready to scan (means that bluetooth and location service are enabled)
     * @var event ibeacon._ibeaconInitialized
     */
    _ibeaconInitialized: new Event('ibeaconInitialized'),
    /**
     * An event that is fired when ibeacon component is disabled by the user
     * @var event ibeacon._ibeaconDisabled
     */
    _ibeaconDisabled: new Event('ibeaconDisabled'),
    /**
     * An event that is fired when ibeacon component is not supported by the user device
     * @var event ibeacon._ibeaconNotSupported
     */
    _ibeaconNotSupported: new Event('ibeaconNotSupported'),
    /**
     * Determine if the app is waiting an interaction from the user
     * @var function ibeacon._isWaiting
     */
    _isWaiting: false,
    /**
     * Will store the setInterval function to check bluetooth activation
     * @var function ibeacon._blueToothInterval
     */
    _bluetoothInterval: undefined,
    /**
     * Will store the setInterval function to check location services activation
     * @var function ibeacon._locationInterval
     */
    _locationInterval: undefined,
    /**
     * Will store the setInterval function to check location authorization (iOS only)
     * @var function ibeacon._locationAuthInterval
     */
    _locationAuthInterval: undefined,
    /**
     * Will store the setInterval function to scan for beacons periodically
     * @var function ibeacon._scanInterval
     */
    _scanningInterval: undefined,
    
    
	/*
	 * ======================================
	 *        METHODS
	 * ======================================
	 */
	 
    /**
     * Initialize the ibeacon component
     *
     * @access public
     * @param object params The regions datas of each beacon you want to detect.
     */
    initialize: function(params) {
        /*
         * Use the language of the user device
         */
        ibeacon._lang = navigator.language.slice(0,2);
	    
        /*
         * Store the regions datas and the user parameters
         */
        ibeacon._regions = params.regions;
        ibeacon._actions = params.actions;
        
        /*
         * Bind events on DOM elements
         */
        ibeacon._bindEvents();

        /* 
         * Check if running device has bluetooth 4.0 or not
         */
        ibeacon._bluetoothCompatibilityVerification();
    },
    
    
    /**
     * Method for binding DOM event to html elements
     *
     * @access private
     */
    _bindEvents: function() {
	    
        /*
         * An event that is fired when bluetooth 4.0 compatibility verification is completed
         */
        document.addEventListener('verificationComplete', ibeacon._verificationCompleteCallback, false);

        /*
         * Pause event, it fires when an application is put into the background.
         */
        document.addEventListener('pause', function() {
	    	clearInterval(ibeacon._bluetoothInterval);
	    	clearInterval(ibeacon._locationInterval);
	    	clearInterval(ibeacon._locationAuthInterval);
	    	ibeacon.stopScan();
	    }, false);
	    
        /*
         * Resume event, it fires when an application is retrieved from the background.
         */
        document.addEventListener('resume', function() {
	    	ibeacon._isWaiting = false;
	    }, false);
    },


    /**
     * Check if the running device has bluetooth 4.0 or not
     *
     * @access private
     */
    _bluetoothCompatibilityVerification: function() {
        /*
         * Start the bluetooth verification only if the device has not been already checked
         */
        if (localStorage.getItem('ibeaconBluetoothCompatibility') !== null || localStorage.getItem('ibeaconFeaturesDisabled') === '1') {
            ibeacon._verificationCompleteCallback();
            return;
        }
        
        /*
         * The iOS verification consists to check if the running device matches one of the existing devices 
         * whom we are sure they are not bluetooth 4.0 compatible (assuming that the current list is exhaustive 
         * and that all future devices will be necessarily bluetooth 4.0 compatible)
         */
        if (device.platform.toLowerCase() === 'ios') {
            if (device.model === 'iPad1,1' || device.model === 'iPad2,1' || device.model === 'iPad2,2' || device.model === 'iPad2,3' || device.model === 'iPad2,4' || device.model === 'iPhone1,1' || device.model === 'iPhone1,2' || device.model === 'iPhone2,1' || device.model === 'iPhone3,1' || device.model === 'iPhone3,2' || device.model === 'iPhone3,3' || device.model === 'iPod1,1' || device.model === 'iPod2,1' || device.model === 'iPod3,1' || device.model === 'iPod4,1') { localStorage.setItem('ibeaconBluetoothCompatibility', '0'); }
            else { localStorage.setItem('ibeaconBluetoothCompatibility', '1'); }
            document.dispatchEvent(ibeacon._verificationComplete);
        }
        
        /*
         * The Android verification consists to enable bluetooth programmatically (if its disabled) and to check with the plugin method
         * if the running device has bluetooth 4.0 activated. If not, it means that bluetooth 4.0 is not supported.
         */
        else if (device.platform.toLowerCase() === 'android') {
    		/*
             * Display a loading spinner while the device is checked
             */
            window.plugins.spinnerDialog.hide();
            window.plugins.spinnerDialog.show(null, ibeacon._lexicons[ibeacon._lang].deviceCheckingMessage, true);
	        
			/*
             * Callback function called when bluetooth is enabled during the test
             */
			var bluetoothActivationCallback = function() {
                bluetoothle.initialize(function() {
                    bluetoothle.startScan(function() {
	                    /*
	                     * If the scan works, it means that Bluetooth 4.0 is supported
	                     */
						localStorage.setItem('ibeaconBluetoothCompatibility', '1');
						document.dispatchEvent(ibeacon._verificationComplete);
	                },
	                function() {
	                    /*
	                     * If not, Bluetooth 4.0 is not supported
	                     */
						localStorage.setItem('ibeaconBluetoothCompatibility', '0');
						document.dispatchEvent(ibeacon._verificationComplete);
		            },
		            {'serviceUuids': []});
                },
                function() {
	               	window.plugins.spinnerDialog.hide();
		            navigator.notification.alert(
		                ibeacon._lexicons[ibeacon._lang].deviceCheckingErrorMessage,
		                function() { },
		                ibeacon._lexicons[ibeacon._lang].deviceCheckingErrorTitle,
		                ibeacon._lexicons[ibeacon._lang].deviceCheckingErrorButton
		            ); 
                }, {'request': false,'statusReceiver': false});
			};
			
            /*
             * Check is bluetooth is enabled
             */
            cordova.plugins.locationManager.isBluetoothEnabled().then(function(isBluetoothEnabled) {
                if (!isBluetoothEnabled) {
                    /*
                     * If not, we enable bluetooth programmatically
                     */
                    cordova.plugins.locationManager.enableBluetooth();
                    
                    setTimeout(function() {
						bluetoothActivationCallback();
						cordova.plugins.locationManager.disableBluetooth();
	                }, 4000);

                }
                else {
                    bluetoothActivationCallback();
                }
            }).fail(console.error).done();
        }
    },
    
    
    /**
     * Callback called when verificationComplete event is fired
     *
     * @access private
     */
    _verificationCompleteCallback: function() {
        /*
         * Close loading modal
         */
        bluetoothle.stopScan(function() {}, function() {});
        window.plugins.spinnerDialog.hide();
	    
        /*
         * Callback if the device is not compatible Bluetooth 4.0
         */
        if (localStorage.getItem('ibeaconBluetoothCompatibility') === '0' && localStorage.getItem('bluetoothErrorMsg') === null) {
            navigator.notification.alert(
                ibeacon._lexicons[ibeacon._lang].deviceNotSupportedErrorMessage,
                function() {
                    document.dispatchEvent(ibeacon._ibeaconNotSupported);
                },
                ibeacon._lexicons[ibeacon._lang].deviceNotSupportedErrorTitle,
                ibeacon._lexicons[ibeacon._lang].deviceNotSupportedErrorButton
            ); 
            localStorage.setItem('bluetoothErrorMsg', '1');
        }
        else if (localStorage.getItem('ibeaconBluetoothCompatibility') === '0' && localStorage.getItem('bluetoothErrorMsg') !== null) {
	        document.dispatchEvent(ibeacon._ibeaconNotSupported);
        }
        else if (localStorage.getItem('ibeaconFeaturesDisabled') === '1') {
	        document.dispatchEvent(ibeacon._ibeaconDisabled);
        }
        
        /*
         * Callback if the device is fully compatible Bluetooth 4.0
         */
        else if (localStorage.getItem('ibeaconBluetoothCompatibility') === '1') {
            /*
             * Request bluetooth and location services activation if needed
             */
            ibeacon.activateServices();
        }
    },
    
    /**
	 * Request activation of bluetooth and location service if disabled
	 * 
	 * @access public
	 */
	activateServices: function() {
		if (localStorage.getItem('ibeaconBluetoothCompatibility') !== '0' && localStorage.getItem('ibeaconFeaturesDisabled') !== '1') {
			ibeacon._bluetoothActivation();	
		}
		else if (localStorage.getItem('ibeaconBluetoothCompatibility') === '1') {
			document.dispatchEvent(ibeacon._ibeaconNotSupported);
		}
		else if (localStorage.getItem('ibeaconFeaturesDisabled') === '1') {
			document.dispatchEvent(ibeacon._ibeaconDisabled);
		}
	},
    
    /**
	 * Request activation of bluetooth if disabled
	 * 
	 * @access private
	 */
	_bluetoothActivation: function() {
        cordova.plugins.locationManager.isBluetoothEnabled().then(function(isBluetoothEnabled) {
			/*
	         * Check bluetooth status
	         */
	    	if (!isBluetoothEnabled) {
		    	if (device.platform.toLowerCase() === 'android') {
                    navigator.notification.confirm(
                        ibeacon._lexicons[ibeacon._lang].bluetoothNotEnabledAndroidErrorMessage,
                        ibeacon._onBluetoothConfirm,
                        ibeacon._lexicons[ibeacon._lang].bluetoothNotEnabledAndroidErrorTitle,
                        ibeacon._lexicons[ibeacon._lang].bluetoothNotEnabledAndroidErrorButtons
                    );
			    }
			    else if (device.platform.toLowerCase() === 'ios' && ibeacon._isWaiting === false) {
                    navigator.notification.confirm(
                        ibeacon._lexicons[ibeacon._lang].bluetoothNotEnabledIosErrorMessage,
                        ibeacon._onBluetoothConfirm,
                        ibeacon._lexicons[ibeacon._lang].bluetoothNotEnabledIosErrorTitle,
                        ibeacon._lexicons[ibeacon._lang].bluetoothNotEnabledIosErrorButtons
                    );
				}
	    	}
	    	else {
		    	if (device.platform.toLowerCase() === 'ios') {
					/*
				     * When bluetooth is enabled, it clears the bluetooth check and the waiting screen
				     */
					clearInterval(ibeacon._bluetoothInterval);
			    	window.plugins.spinnerDialog.hide();
			    	ibeacon._isWaiting = false;
			    	
					/*
				     * Check location service
				     */
					ibeacon._locationActivation();
				}
				else if (device.platform.toLowerCase() === 'android') {
					/*
			         * Dispatch initialized event
			         */
			    	document.dispatchEvent(ibeacon._ibeaconInitialized);
				}
	    	}
	    }).fail(console.error).done();
	},
	
	
    /**
	 * Method called after the close of bluetooth activation modal
	 * 
	 * @access private
	 */
	_onBluetoothConfirm: function(buttonIndex) {
	    /*
	     * If the user clicks on "Activate"
	     */
		if (buttonIndex === 2) {
			if (device.platform.toLowerCase() === 'android') { 
			    /*
			     * Activate bluetooth programatically and check the location service
			     */
				cordova.plugins.locationManager.enableBluetooth();
				
				/*
		         * Dispatch initialized event
		         */
		    	document.dispatchEvent(ibeacon._ibeaconInitialized);
			}
			else if (device.platform.toLowerCase() === 'ios') {
			    /*
			     * Display the waiting screen and check each second the bluetooth state
			     */
				ibeacon._isWaiting = true;
				window.plugins.spinnerDialog.show(null, ibeacon._lexicons[ibeacon._lang].waitingScreenBluetoothMessage, true);
				ibeacon._bluetoothInterval = setInterval(ibeacon._bluetoothActivation, 1000);
			}
		}
		
	    /*
	     * If the user click on "Cancel"
	     */
		else if (buttonIndex === 1) { ibeacon._onServicesActivationCancel(); }
	},
	
	
    /**
	 * Request activation of location services if disabled
	 * 
	 * @access private
	 */
    _locationActivation: function() {
        cordova.plugins.diagnostic.isLocationEnabledSetting(function(isLocationEnabled) {
	        /*
	         * Transform isLocationEnabled is boolean variable
	         */
	        if (isLocationEnabled === 0) { isLocationEnabled = false; }
	        else { isLocationEnabled = true; }
	
			/*
	         * Check location status
	         */
	    	if (!isLocationEnabled) {
			    if (ibeacon._isWaiting === false) {
                    navigator.notification.confirm(
                        ibeacon._lexicons[ibeacon._lang].locationNotEnabledIosErrorMessage,
                        ibeacon._onLocationConfirm,
                        ibeacon._lexicons[ibeacon._lang].locationNotEnabledIosErrorTitle,
                        ibeacon._lexicons[ibeacon._lang].locationNotEnabledIosErrorButtons
                    );
				}
	    	}
	    	else {
			    /*
			     * When location service is enabled, it clears the location check and the waiting screen then it checks for location authorization
			     */
		        clearInterval(ibeacon._locationInterval);
		        clearInterval(ibeacon._locationAuthInterval);
		    	window.plugins.spinnerDialog.hide();
		    	ibeacon._isWaiting = false;
		    	ibeacon._locationAuthInterval = setInterval(ibeacon._locationAuthorization, 1000);
		    	
				/*
		         * Dispatch initialized event
		         */
		    	document.dispatchEvent(ibeacon._ibeaconInitialized);	
	    	}
		}, function(e) { console.log('Error '+e); }  );                            
    },
    
    
    /**
	 * Method called after the close of location activation modal
	 * 
	 * @access private
	 */
    _onLocationConfirm: function(buttonIndex) {
	    /*
	     * If the user click on "Activate"
	     */
		if (buttonIndex === 2) {
		    /*
		     * Display the waiting screen and check each second the location service state
		     */
			ibeacon._isWaiting = true;
			window.plugins.spinnerDialog.show(null, ibeacon._lexicons[ibeacon._lang].waitingScreenLocationMessage, true);
			ibeacon._locationInterval = setInterval(ibeacon._locationActivation, 1000);
		}
	    /*
	     * If the user click on "Cancel"
	     */
		else if (buttonIndex === 1) { ibeacon._onServicesActivationCancel(); }
    },
    
    
    /**
	 * Request location authorization (iOS only)
	 * 
	 * @access private
	 */
    _locationAuthorization: function() {
        cordova.plugins.diagnostic.isLocationAuthorized(function(isLocationAuthorized) {
	        /*
	         * Transform isLocationEnabled is boolean variable
	         */
	        if (isLocationAuthorized === 0) { isLocationAuthorized = false; }
	        else { isLocationAuthorized = true; }
	        
            /*
             * Request location permission from user
             */
            cordova.plugins.locationManager.requestWhenInUseAuthorization();
            
			if (!isLocationAuthorized) {
				clearInterval(ibeacon._locationAuthInterval);
                navigator.notification.confirm(
                    ibeacon._lexicons[ibeacon._lang].locationNotAuthorizedErrorMessage,
                    ibeacon._onLocationAuthConfirm,
                    ibeacon._lexicons[ibeacon._lang].locationNotAuthorizedErrorTitle,
                    ibeacon._lexicons[ibeacon._lang].locationNotAuthorizedErrorButtons
                );
			}
        },function(e) { console.log('Error '+e); });
    },
    
    
    /**
	 * Method called after the close of location authorization modal
	 * 
	 * @access private
	 */
    _onLocationAuthConfirm: function(buttonIndex) {
	    
	    /*
	     * If the user click on "Authorize"
	     */
		if (buttonIndex === 2) {
			ibeacon._isWaiting = true;
			cordova.plugins.settings.open(function(){},function(){});
		}
		
	    /*
	     * If the user click on "Cancel"
	     */
		else if (buttonIndex === 1) { ibeacon._onServicesActivationCancel(); }
    },
    
    
    /**
	 * Method called after the close of an service activation modal
	 * 
	 * @access private
	 */
    _onServicesActivationCancel: function() {
	    if (device.platform.toLowerCase() === 'android') {
			navigator.notification.confirm(
			    ibeacon._lexicons[ibeacon._lang].servicesActivationCancelledAndroidMessage,
			    ibeacon._onServicesActivationCancelConfirm,
			    ibeacon._lexicons[ibeacon._lang].servicesActivationCancelledAndroidTitle,
			    ibeacon._lexicons[ibeacon._lang].servicesActivationCancelledAndroidButtons    
			);
	    }
	    else if (device.platform.toLowerCase() === 'ios') {
			navigator.notification.confirm(
			    ibeacon._lexicons[ibeacon._lang].servicesActivationCancelledIosMessage,
			    ibeacon._onServicesActivationCancelConfirm,
			    ibeacon._lexicons[ibeacon._lang].servicesActivationCancelledIosTitle,
			    ibeacon._lexicons[ibeacon._lang].servicesActivationCancelledIosButtons    
			);
	    }
    },
    
    
    /**
	 * Method called when the user make a choice on the onServicesActivationCancel modal
	 * 
	 * @access private
	 */
    _onServicesActivationCancelConfirm: function(buttonIndex) {
	    /*
	     * If the user click on "Deactivate"
	     */
		if (buttonIndex === 2) {
			localStorage.setItem('ibeaconFeaturesDisabled', '1');
			document.dispatchEvent(ibeacon._ibeaconDisabled);
		}
	    /*
	     * If the user click on "Activate"
	     */
		else if (buttonIndex === 1) {
			localStorage.setItem('ibeaconFeaturesDisabled', '0');
			ibeacon.activateServices();
		}
    },
    
    /**
     * Start searching for beacons
     *
     * @access public
     */
    startScan: function() {
        /*
         * Set the delegate value with the scanning callback
         */
        var delegate = new cordova.plugins.locationManager.Delegate();
    	delegate.didRangeBeaconsInRegion = function(pluginResult) {
    		ibeacon._didRangeBeaconsInRegion(pluginResult);
    	};
        cordova.plugins.locationManager.setDelegate(delegate);

    	/*
    	 * Start monitoring and ranging each region
    	 */
    	for (var r in ibeacon._regions) {
    		var region = ibeacon._regions[r],
    		    beaconRegion = new cordova.plugins.locationManager.BeaconRegion(region.id, region.uuid, region.major, region.minor);
    		cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion).fail(alert).done();
    	}
    },

    
    /**
     * Scanning callback
     *
     * @access private
     * @param object pluginResult The scanning datas returned by the ibeancon cordova plugin.
     */
    _didRangeBeaconsInRegion: function(pluginResult)
    {
        /*
         * Check if there is at least one result
         */
    	if (pluginResult.beacons.length === 0) {
    		return;
    	}

        /*
         * Shortcuts for the beacons datas
         */
    	var beacon = pluginResult.beacons[0],
            identifier = pluginResult.region.identifier;
    
        /*
         * Call user actions callback
         */
        ibeacon._actions(beacon, identifier);
    },
    
    
    /**
     * Stop searching for beacons
     *
     * @access prublic
     */
    stopScan: function() {
    	/*
    	 * Stop monitoring and ranging each region
    	 */
    	for (var r in ibeacon._regions) {
    		var region = ibeacon._regions[r],
    		    beaconRegion = new cordova.plugins.locationManager.BeaconRegion(region.id, region.uuid, region.major, region.minor);
    		cordova.plugins.locationManager.stopRangingBeaconsInRegion(beaconRegion).fail(console.error).done();
    	}
    }
};
