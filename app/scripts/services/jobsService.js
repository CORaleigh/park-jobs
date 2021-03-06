(function(angular) {

  'use strict';

  angular.module('appServices').factory('jobsService', ['$http', '$q', '$timeout', 'jobsMapConfig',
    function ($http, $q, $timeout, jobsMapConfig) {

    var jobs = { list: [], mappable: [], categories: {}, otherLocations: {} };

    var today = new Date().valueOf();

    var getJobsFeed = function (query) {
      return $http({
        method: 'GET',
        url : 'https://maps.raleighnc.gov/arcgis/rest/services/Parks/ParkLocator/MapServer/5/query?where=' + (query || '1%3D1') + '&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=pjson'
      });
    };

    var parseDescription = function (desc) {
      if (!desc || desc === '<br />') { return 'No description preview available'; }

      var htmlParser = new DOMParser();
      var nodes = htmlParser.parseFromString(desc, 'text/html');

      return nodes.getElementsByTagName('body')[0].innerText;
    };

    var parseCategories = function (categories) {
      var arr = [];
      if (categories.constructor === Object) {
        arr.push(categories.Category);
      } else if (categories.constructor === Array) {
        angular.forEach(categories, function (cat) {
          this.push(cat.Category);
        }, arr);
      } else {
        arr = categories.split(',');
      }
      return arr;
    };

    var constructJob = function (job) {
      var id = job.JOBID;
      var description = parseDescription(job.DESCRIPTION);
      var categories = parseCategories(job.CATEGORIES);
      var titleUrl = job.TITLE.replace(/\W+/ig, '-').toLowerCase();
      var minSalary = Number(job.MINIMUMSALARY) || 7.25;
      var maxSalary = Number(job.MAXIMUMSALARY) || undefined; // What should we do with null/0 values??
      // String specifies it is GMT which is automatically localized when it is parsed
      var pubDate = new Date(Date.parse(job.PUBDATE));
      // 5 hour offset from UTC to EST = 18,000s or 18,000,000ms
      var createdDate = new Date(Date.parse(job.ADVERTISEFROMDATEUTC) - 18000000);
      // Handle 'Continous' cases with a valid date instead of NaN or Invalid Date obj
      var endDate = new Date((Date.parse(job.ADVERTISETODATEUTC) - 18000000) || 'Dec 31 2020 23:59:59');
      titleUrl = titleUrl[titleUrl.length - 1] === '-' ? titleUrl.substring(0, titleUrl.length - 1) : titleUrl;

      return {
        id: Number(id),
        objectId: job.OBJECTID,
        title: job.TITLE,
        titleUrl: titleUrl,
        categories: categories,
        department: job.DEPARTMENT,
        description: description,
        jobType: job.JOBTYPE,
        latitude: job.LAT,
        longitude: job.LNG,
        location: job.LOCATION,
        state: 'North Carolina',
        minSalary: minSalary,
        maxSalary: maxSalary,
        interval: job.SALARYINTERVAL,
        pubDate: pubDate,
        createdDate: createdDate,
        endDate: endDate,
        isNew: today - createdDate <= 604800000,
        expiresSoon : endDate - today <= 604800000,
        link: job.LINK,
        detailsUrl: ('https://www.governmentjobs.com/careers/raleighnc/jobs/' + id + '/' + titleUrl),
        
        icon: jobsMapConfig.jobMarkersConfig.icon,
        markerClick: jobsMapConfig.markerClick,
        options: {
          labelContent: job.TITLE,
          labelClass: 'marker-label',
          labelVisible: false,
          animation: 2
        }
      };
    };

    var isPRCRjob = function (job) {
      var matcher = new RegExp(/prc|parks|recreation/i);
      angular.forEach(job.categories, function (cat) {
        if (matcher.test(cat)) { return true; }
      });
      return matcher.test(job.department);
    };

    var groupById = function (job) {
      return angular.isDefined(jobs[job.id]) ? jobs[job.id].push(job) : jobs[job.id] = [job];
    };

    var storeCategory = function (job) {
      angular.forEach(job.categories, function (cat) {
        if (jobs.categories[cat]) {
          jobs.categories[cat].jobCount += 1; 
        } else {
          jobs.categories[cat] = {
            name: cat,
            jobCount: 1,
            checked: false
          };
        }
      });
    };

    var extractJobData = function (jsonjobs) {
      angular.forEach( jsonjobs, function (job) {

        var processedJob = constructJob(job.attributes);
        if (processedJob.jobType === 'Full-Time' || !isPRCRjob(processedJob) ) { return; }
        
        groupById(processedJob);
        storeCategory(processedJob);
        
        this.push(processedJob);
        if (processedJob.latitude !== 0 || processedJob.longitude !== 0) {
          jobs.mappable.push(processedJob);
        }

      }, jobs.list);
    };

    // Pre-filter the other job locations to avoid making a call to | filter on the DOM
    var calculateOtherLocations = function () {
      angular.forEach( jobs.list, function (listedJob) {
        jobs.otherLocations[listedJob.objectId] = [];
        angular.forEach( jobs[listedJob.id], function (groupedJob) {
          if (listedJob.objectId !== groupedJob.objectId) {
            // We can't store this as a property of the job itself due to max stack reached error
            jobs.otherLocations[listedJob.objectId].push(groupedJob);
          }
        });
      });
    };

    var readResponse = function(response) {
      if (response.status === 200) {
        var rawJobs = response.data.features;
        extractJobData(rawJobs);
        calculateOtherLocations();
        return $q.resolve(response);
      } 
      console.log('Did not get the expected results', response);
      return $q.reject(response);
    };

    var logError = function (response) {
      console.log('Failed to get data from jobs server', response);
      return $q.reject(response);
    };
    
    getJobsFeed().then(readResponse, logError);

    return {
      jobs: jobs
    };

  }]);

})(window.angular);
