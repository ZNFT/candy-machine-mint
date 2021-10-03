    // multi tab detection
    export function register_tab_GUID() {
      // detect local storage available
      if (typeof (Storage) !== "undefined") {
          // get (set if not) tab GUID and store in tab session
          if (sessionStorage["tabGUID"] == null) sessionStorage["tabGUID"] = tab_GUID();
          var guid = sessionStorage["tabGUID"];

          // add eventlistener to local storage
          window.addEventListener("storage", storage_Handler, false);

          // set tab GUID in local storage
          localStorage["tabGUID"] = guid;
      }
  }

 function storage_Handler(e: any) {
      // if tabGUID does not match then more than one tab and GUID
      if (e.key === 'tabGUID') {
          if (e.oldValue !== e.newValue) tab_Warning();
      }
  }

 function tab_GUID() {
      function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
  }

 function tab_Warning() {
      alert("Another tab is open!");
      window.close()
  }
