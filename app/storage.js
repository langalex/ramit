/* global RemoteStorage, remoteStorage, $ */
export default function() {
  RemoteStorage.defineModule('ramit', function(privateClient) {
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

    privateClient.declareType('transaction', {
      "description": "a financial transaction",
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "format": "id"
        },
        "account_id": {
          "type": "string",
          "format": "id"
        },
        "description": {
          "type": "string"
        },
        "amount": {
          "type": "integer"
        },
        "date": {
          "type": "integer"
        }
      }
    });


    return {
      exports: {
        // accounts
        addAccount: function (name) {
          var d = $.Deferred();
          var id = new Date().getTime().toString();
          var data = {id: id, name: name};
          privateClient.storeObject('account', 'accounts/' + id, data).then(function() {
            d.resolve(data);
          });
          return d.promise();
        },
        removeAccount: function(id) {
          privateClient.remove('accounts/' + id);
        },
        onAddAccount: function(callback) {
          privateClient.on('change', function(e) {
            const newValue = typeof e.newValue === 'string' ? JSON.parse(e.newValue) : e.newValue;
            if(e.oldValue === undefined && newValue['@context'] === 'http://remotestorage.io/spec/modules/ramit/account') {
              callback(newValue);
            }
          });
        },
        onRemoveAccount: function(callback) {
          privateClient.on('change', function(e) {
            if(e.newValue === undefined && e.oldValue['@context'] === 'http://remotestorage.io/spec/modules/ramit/account') {
              callback(e.oldValue);
            }
          });
        },
        // transactions
        addTransaction: function(accountId, description, amount) {
          var id = new Date().getTime().toString();
          var transaction = {
            id: id,
            account_id: accountId,
            description: description || '',
            amount: amount,
            date: new Date().getTime()
          };

          privateClient.storeObject('transaction', 'transactions/' + id, transaction);
          var d = $.Deferred();
          d.resolve(transaction);
          return d.promise();
        },
        removeTransaction: function(id) {
          privateClient.remove('transactions/' + id);
        },
        onAddTransaction: function(callback) {
          privateClient.on('change', function(e) {
            const newValue = typeof e.newValue === 'string' ? JSON.parse(e.newValue) : e.newValue;
            if(e.oldValue === undefined && newValue['@context'] === 'http://remotestorage.io/spec/modules/ramit/transaction') {
              callback(newValue);
            }
          });
        },
        onRemoveTransaction: function(callback) {
          privateClient.on('change', function(e) {
            if(e.newValue === undefined && e.oldValue['@context'] === 'http://remotestorage.io/spec/modules/ramit/transaction') {
              callback(e.oldValue);
            }
          });
        },
      }
    };
  });
  remoteStorage.access.claim('ramit', 'rw');
  remoteStorage.caching.enable('/ramit/');
  }
