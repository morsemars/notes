'use strict';

angular.module('app').factory('Version', function($resource) {
    return $resource('/api/notes/:noteId/versions/:versionId', {}, {});
});
