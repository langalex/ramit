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
        listAccounts: function() {
          var deferred = $.Deferred();
          privateClient.getAll('accounts/').then(function(all) {
            if(all) {
              deferred.resolve(_.chain(all).values().select(function(o) {
                return o && o['@context'] === "http://remotestoragejs.com/spec/modules/ramit/account"; }).value());
            } else {
              deferred.resolve([]);
            }
          });
          return deferred.promise();
        },
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
        getAccount: function(id) {
          return privateClient.getObject('accounts/' + id);
        },
        onAddAccount: function(callback) {
          privateClient.on('change', function(e) {
            if(e.oldValue === undefined && e.newValue['@context'] === 'http://remotestoragejs.com/spec/modules/ramit/account') {
              callback(e.newValue);
            }
          });
        },
        onRemoveAccount: function(callback) {
          privateClient.on('change', function(e) {
            if(e.newValue === undefined && e.oldValue['@context'] === 'http://remotestoragejs.com/spec/modules/ramit/account') {
              callback(e.oldValue);
            }
          });
        },

        // transactions
        listTransactions: function(accountId) {
          if(accountId === undefined) {
            throw new Ember.Error('no account id passed when listing transactiona');
          }
          var deferred = $.Deferred();
          privateClient.getAll('accounts/' + accountId + '/transactions/').then(function(all) {
            if(all) {
              deferred.resolve(_(all).values());
            } else {
              deferred.resolve([]);
            }
          });
          return deferred.promise();
        },
        addTransaction: function(accountId, description, amount) {
          var id = new Date().getTime().toString();
          var transaction = {
            id: id,
            account_id: accountId,
            description: description,
            amount: amount,
            date: new Date().getTime()
          };

          privateClient.storeObject('transaction', 'accounts/' + accountId + '/transactions/' + id, transaction);
          var d = $.Deferred();
          d.resolve(transaction);
          return d.promise();
        },
        getTransaction: function(accountId, id) {
          return privateClient.getObject('accounts/' + accountId + '/transactions/' + id);
        },
        removeTransaction: function(accountId, id) {
          privateClient.remove('accounts/' + accountId + '/transactions/' + id);
        },
        onAddTransaction: function(callback) {
          privateClient.on('change', function(e) {
            if(e.oldValue === undefined && e.newValue['@context'] === 'http://remotestoragejs.com/spec/modules/ramit/transaction') {
              callback(e.newValue);
            }
          });
        },
        onRemoveTransaction: function(callback) {
          privateClient.on('change', function(e) {
            if(e.newValue === undefined && e.oldValue['@context'] === 'http://remotestoragejs.com/spec/modules/ramit/transaction') {
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
