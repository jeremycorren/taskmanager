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

function create(data, callback) {
   const entity = {
      key: ds.key(kind),
      data: toDatastore(data, ['description'])
   }

   ds.save(entity, (err) => {
      data.id = entity.key.id;
      callback(err, err ? null : data);
   });
}

module.exports = {
   create
};