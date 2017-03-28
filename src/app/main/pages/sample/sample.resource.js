(function ()
{
	'use strict';

	angular
		.module('app.sample')
		.factory('SampleResource', SampleResource); 

	function SampleResource($resource, api)
	{

		var Sample = $resource(api.baseUrl + "api/company/:id", { id: '@id' }, 
			{ 
				'update': { method:'PUT' }, 
				'query': { method:'POST' , url: api.baseUrl + 'api/company/query' }
			});

		var resource = {

			create: function(data){

				return new Sample(data).$save();
			},

			get: function(id){	

				return Sample.get({ id: id });
			},

			update: function(id, data){

				return Sample.update({ id: id }, data); 
			},

			delete: function(id){

				return Sample.delete({ id: id });
			},

			query: function(options){

				var options = options || {};

				return Sample.query(options);
			}

		};

		api.sample = Sample ;


		return resource;

	}

})();