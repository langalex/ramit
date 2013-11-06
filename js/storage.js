(function() {
  'use strict';

  window.Ramith = window.Ramith || {};

  Ramith.Storage = {
    init: function() {
      RemoteStorage.defineModule('accounts', function(privateClient, publicClient) {

        // Define a common data type using JSON Schema
        privateClient.declareType('account', {
          "description": "an account with a balance",
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "format": "id"
            },
            "name": {
              "type": "string"
            }
          }
        });

        return {
          exports: {
            list: function() {
              var deferred = $.Deferred();
              privateClient.getAll('').then(function(all) {
                if(all) {
                  deferred.resolve(_(all).values());
                } else {
                  deferred.resolve([]);
                }
              });
              return deferred.promise();
            },
            add: function (name) {
              var id = new Date().getTime().toString();
              return privateClient.storeObject('account', id, {
                id: id,
                name: name
              });
            },
            remove: function(id) {
              privateClient.remove(id);
            },
            get: function(id) {
              return privateClient.getObject(id);
            },
            onChange: function (callback) {
              privateClient.on('change', callback);
            }
          }
        };
      });
    }
  };
})();
