	document.addEventListener("offline", onOffline, false);
    document.addEventListener("online", onOnline, false);

	function onOffline() {		
		localStorage.setItem('network',"false");
	}
	function onOnline(){
		localStorage.setItem('network',"true");	    
	}
	
