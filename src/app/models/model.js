/**
 * Data Model
 */

const Datastore = require('@google-cloud/datastore');
const ds = Datastore({
	projectId: 'taskmanager-193523'
});

const kind = 'Task';

function fromDatastore (obj) {
   obj.id = obj[Datastore.KEY].id;
   return obj;
}

function toDatastore (obj, nonIndexed) {
   nonIndexed = nonIndexed || [];
   const results = [];

   Object.keys(obj).forEach((k) => {
      if (obj[k] === undefined) {
         return;
      }

      results.push({
         name: k,
         value: obj[k],
         excludeFromIndexes: nonIndexed.indexOf(k) !== -1
      });
   });
   return results;
}

function formatDate(date) {
   return date.toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'numeric', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric'
   });

}

function update(id, data, callback) {
   let key;
   if (id) {
      key = ds.key([kind, parseInt(id, 10)]);
   } else {
      key = ds.key(kind);
   }
   data.updated = formatDate(new Date());

   const entity = {
      key: key,
      data: toDatastore(data, ['description'])
   }

   ds.save(entity, function(err) {
      callback(err);
   });
}

function create(data, callback) {
   update(null, data, callback);
}

function _delete(data, callback) {
   const id = data.id;
   const key = ds.key([kind, parseInt(id, 10)]);
   ds.delete(key, callback);
}

function list(callback) {
   let query = ds.createQuery([kind])
      .order('updated', { descending: true });
   ds.runQuery(query, function(err, entities, nextQuery) {
      if (err) {
         callback(err);
         return;
      }
      callback(null, entities.map(fromDatastore));
   });
}

module.exports = {
   create,
   update,
   delete: _delete,
   list
};