var Scorm = function() {
  var module = {
    win: window.opener || window.parent || window,
    init: function(options) {
      var me = this;
      this.options = options;
      this.el = document.getElementById(this.options.id);
      this.api = this.win.API;
      if (this.api) {
        this.addListeners();
      } else {
        console.error('API not found...');
      }
      window.addEventListener('hashchange', function() {
        me.checkHash();
      });
      this.checkHash();
    },
    addListeners: function () {
      var me = this;
      window.addEventListener('load', function() {
        var response = me.api.LMSInitialize('');
        me.checkError('load', response);
      });
      window.addEventListener('unload', function() {
        var response = me.api.LMSFinish('');
        me.checkError('unload', response);
      });
      window.addEventListener('beforeunload', function() {
        var response = me.api.LMSFinish('');
        me.checkError('beforeunload', response);
      });
    },
    checkError: function(type, result) {
      if (!result || result === 'false') {
        console.error(`checkError\nNumber: ${API.LMSGetLastError()}\nDescription: ${API.LMSGetErrorString(errorNumber)}\nDiagnostic: ${API.LMSGetDiagnostic(errorNumber)}`);
      } else {
        console.log('checkError', type, result);
      }
    },
    checkHash: function() {
      console.log('checkHash', this.currentPage, window.location.hash.slice(2));
      if (this.currentPage && this.currentPage !== '') {
        this.el.classList.remove('page-' + this.currentPage);
      } else {
        this.el.classList.remove('page-default');
      }
      this.currentPage = window.location.hash.slice(2);
      if (this.currentPage && this.currentPage !== '') {
        this.el.classList.add('page-' + this.currentPage);
      } else {
        this.el.classList.add('page-default');
      }
    },
  };
  return module;
};
