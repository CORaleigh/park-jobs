!function(a){"use strict";a.module("appServices",[])}(window.angular),function(a){"use strict";a.module("appControllers",[])}(window.angular),function(a){"use strict";a.module("appFilters",[])}(window.angular),function(a){"use strict";a.module("appDirectives",[])}(window.angular),function(a){"use strict";a.module("appServices").factory("deviceService",["$window",function(a){var b=a.innerWidth,c=function(){return 960>b},d={name:"map",list:!c(),map:!0};return{isMobile:c,activeTab:d}}])}(window.angular),function(a){"use strict";a.module("appServices").factory("mapService",["uiGmapGoogleMapApi","$mdToast",function(a,b){var c,d={coords:{latitude:35.79741992502266,longitude:-78.64118938203126}},e={zoom:13,dragging:!1,refresh:!1,pan:!1,location:d,control:{},events:{},bounds:{northeast:{longitude:-78.33689,latitude:36.113561},southwest:{latitude:35.437814,longitude:-78.984583}},options:{disableDefaultUI:!0,draggable:!0,scrollwheel:!1,minZoom:9,tilt:0,zoomControl:!0,zoomControlOptions:{position:c?c.ControlPosition.LEFT_BOTTOM:6,style:c?c.ZoomControlStyle.SMALL:1},mapTypeControl:!1,scaleControl:!1,streetViewControl:!0,streetViewControlOptions:{position:c?c.ControlPosition.LEFT_BOTTOM:6},rotateControl:!1,panControl:!1}};e.options.styles=[{featureType:"administrative",elementType:"all",stylers:[{visibility:"on"},{lightness:33}]},{featureType:"landscape",elementType:"all",stylers:[{color:"#f2e5d4"}]},{featureType:"poi.park",elementType:"geometry",stylers:[{color:"#c5dac6"}]},{featureType:"poi.park",elementType:"labels",stylers:[{visibility:"on"},{lightness:20}]},{featureType:"road",elementType:"all",stylers:[{lightness:20}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#c5c6c6"}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#e4d7c6"}]},{featureType:"road.local",elementType:"geometry",stylers:[{color:"#fbfaf7"}]},{featureType:"water",elementType:"all",stylers:[{visibility:"on"},{color:"#acbcc9"}]}],e.myLocationMarker={id:0,coords:{latitude:d.coords.latitude,longitude:d.coords.longitude},options:{draggable:!0,clickable:!1,icon:"https://s3.amazonaws.com/davidmeza/Park_Locator/user.png",animation:c?c.Animation.DROP:2}};var f=function(a,b){e.location.coords.latitude=a,e.location.coords.longitude=b,e.myLocationMarker.coords.latitude=a,e.myLocationMarker.coords.longitude=b,e.zoom=14},g=function(a){var c=b.simple().textContent(a).action("ok").highlightAction(!1).hideDelay(4e3).position("top right");b.show(c)},h=function(){navigator.geolocation?navigator.geolocation.getCurrentPosition(function(a){f(a.coords.latitude,a.coords.longitude)},function(a){g("Could not locate you due to: "+a.message),console.log(a)},{enableHighAccuracy:!0,timeout:1e4,maximumAge:3e4}):(g("Your browser does not support geolocation. Please upgrade it."),console.log("Geolocation not supported. Defaulting to backup location."))};return h(),a.then(function(a){c=a,e.options.zoomControlOptions.position=a.ControlPosition.LEFT_BOTTOM,e.options.zoomControlOptions.style=a.ZoomControlStyle.SMALL,e.options.streetViewControlOptions.position=a.ControlPosition.LEFT_BOTTOM}),{map:e,updateUserCoords:f,geoLocate:h}}])}(window.angular),function(a){"use strict";a.module("appServices").factory("jobsService",["$http","$q","$timeout","jobsMapConfig",function(b,c,d,e){var f={list:[],mappable:[],categories:{},otherLocations:{}},g=(new Date).valueOf(),h=function(a){return b({method:"GET",url:"https://maps.raleighnc.gov/arcgis/rest/services/Parks/ParkLocator/MapServer/5/query?where="+(a||"1%3D1")+"&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=pjson"})},i=function(a){if(!a||"<br />"===a)return"No description preview available";var b=new DOMParser,c=b.parseFromString(a,"text/html");return c.getElementsByTagName("body")[0].innerText},j=function(b){var c=[];return b.constructor===Object?c.push(b.Category):b.constructor===Array?a.forEach(b,function(a){this.push(a.Category)},c):c=b.split(","),c},k=function(a){var b=a.JOBID,c=i(a.DESCRIPTION),d=j(a.CATEGORIES),f=a.TITLE.replace(/\W+/gi,"-").toLowerCase(),h=Number(a.MINIMUMSALARY)||7.25,k=Number(a.MAXIMUMSALARY)||void 0,l=new Date(Date.parse(a.PUBDATE)),m=new Date(Date.parse(a.ADVERTISEFROMDATEUTC)-18e6),n=new Date(Date.parse(a.ADVERTISETODATEUTC)-18e6||"Dec 31 2020 23:59:59");return f="-"===f[f.length-1]?f.substring(0,f.length-1):f,{id:Number(b),objectId:a.OBJECTID,title:a.TITLE,titleUrl:f,categories:d,department:a.DEPARTMENT,description:c,jobType:a.JOBTYPE,latitude:a.LAT,longitude:a.LNG,location:a.LOCATION,state:"North Carolina",minSalary:h,maxSalary:k,interval:a.SALARYINTERVAL,pubDate:l,createdDate:m,endDate:n,isNew:6048e5>=g-m,expiresSoon:6048e5>=n-g,link:a.LINK,detailsUrl:"https://www.governmentjobs.com/careers/raleighnc/jobs/"+b+"/"+f,icon:e.jobMarkersConfig.icon,markerClick:e.markerClick,options:{labelContent:a.TITLE,labelClass:"marker-label",labelVisible:!1,animation:2}}},l=function(b){var c=new RegExp(/prc|parks|recreation/i);return a.forEach(b.categories,function(a){return c.test(a)?!0:void 0}),c.test(b.department)},m=function(b){return a.isDefined(f[b.id])?f[b.id].push(b):f[b.id]=[b]},n=function(b){a.forEach(b.categories,function(a){f.categories[a]?f.categories[a].jobCount+=1:f.categories[a]={name:a,jobCount:1,checked:!1}})},o=function(b){a.forEach(b,function(a){var b=k(a.attributes);"Full-Time"!==b.jobType&&l(b)&&(m(b),n(b),this.push(b),(0!==b.latitude||0!==b.longitude)&&f.mappable.push(b))},f.list)},p=function(){a.forEach(f.list,function(b){f.otherLocations[b.objectId]=[],a.forEach(f[b.id],function(a){b.objectId!==a.objectId&&f.otherLocations[b.objectId].push(a)})})},q=function(a){if(200===a.status){var b=a.data.features;return o(b),p(),c.resolve(a)}return console.log("Did not get the expected results",a),c.reject(a)},r=function(a){return console.log("Failed to get data from jobs server",a),c.reject(a)};return h().then(q,r),{jobs:f}}])}(window.angular),function(a){"use strict";a.module("appServices").factory("jobsMapConfig",["mapService",function(b){var c,d,e=function(b){b.show=!1,a.isDefined(c)&&(c.removeClass("selected"),c=void 0)},f={show:!1,coords:{},control:{},options:{pixelOffset:{width:0,height:-75}},closeclick:e,templateUrl:"views/partials/job-window.html",templateParameter:{}},g={shallowWatch:!1,fitToMap:!1,markerEvents:{mouseover:function(a){a.setIcon("/img/icons/job-marker-hovered.97bdcabc.svg"),a.labelVisible=!0,a.label.setVisible()},mouseout:function(a){a.setIcon("/img/icons/job-marker.af09f409.svg"),a.labelVisible=!1,a.label.setVisible()}},rebuild:!1,control:{},icon:"/img/icons/job-marker.af09f409.svg",type:"spider",typeOptions:{title:"Zoom in to find more jobs!",gridSize:60,minimumClusterSize:4},typeEvents:{}};g.typeOptions.styles=[{textColor:"#FFF",textSize:18,fontFamily:"Roboto, Helvetica, Verdana, sans-serif",anchorText:[5,-5],url:"img/icons/job-marker-cluster.5e7078dc.svg",height:48,width:48},{textColor:"#FFF",textSize:18,fontFamily:"Roboto, Helvetica, Verdana, sans-serif",anchorText:[5,-5],url:"img/icons/job-marker-cluster.5e7078dc.svg",height:50,width:50},{textColor:"#FFF",textSize:18,fontFamily:"Roboto, Helvetica, Verdana, sans-serif",anchorText:[5,-5],url:"img/icons/job-marker-cluster.5e7078dc.svg",height:54,width:54},{textColor:"#FFF",textSize:18,fontFamily:"Roboto, Helvetica, Verdana, sans-serif",anchorText:[5,-5],url:"img/icons/job-marker-cluster.5e7078dc.svg",height:58,width:58},{textColor:"#FFF",textSize:18,fontFamily:"Roboto, Helvetica, Verdana, sans-serif",anchorText:[5,-5],url:"img/icons/job-marker-cluster.5e7078dc.svg",height:62,width:62}];var h=function(a){f.coords.latitude=a.latitude,f.coords.longitude=a.longitude,f.templateParameter.title=a.title,f.templateParameter.minSalary=a.minSalary,f.templateParameter.maxSalary=a.maxSalary,f.templateParameter.jobType=a.jobType,f.templateParameter.interval=a.interval,f.templateParameter.detailsUrl=a.detailsUrl,f.templateParameter.formattedAddress=a.formattedAddress,f.templateParameter.location=a.location,f.show=!0},i=function(b){c&&c.removeClass("selected"),d=d||a.element(document.getElementById("jobs-list")),c=a.element(document.querySelector(".md-card[data-job-id='"+b+"']")),d.scrollToElementAnimated(c,90),c.addClass("selected")},j=function(a,c,d){b.map.location.coords.latitude=d.latitude,b.map.location.coords.longitude=d.longitude,h(d),i(d.objectId)};return{jobWindow:f,jobMarkersConfig:g,markerClick:j}}])}(window.angular),function(a){"use strict";a.module("appServices").factory("jobsFilterService",function(){var a={salary:0,distance:9999,categories:[],totalJobs:void 0,searchText:void 0,selectedSort:"-minSalary"},b=[{view:"nearest",model:"distance"},{view:"furthest",model:"-distance"},{view:"oldest",model:"createdDate"},{view:"newest",model:"-createdDate"},{view:"expiring soon",model:"endDate"},{view:"salary ($ - $$$)",model:"minSalary"},{view:"salary ($$$ - $)",model:"-minSalary"},{view:"job title (A-Z)",model:"title"},{view:"job title (Z-A)",model:"-title"}];return{filters:a,sortOptions:b}})}(window.angular),function(a){"use strict";a.module("appServices").factory("httpInterceptor",["$q","$rootScope",function(a,b){var c=0;return{request:function(d){return 1===++c&&b.$broadcast("loading:progress"),d||a.when(d)},response:function(d){return--c<=0&&b.$broadcast("loading:finish"),d||a.when(d)},responseError:function(d){return--c<=0&&b.$broadcast("loading:finish"),a.reject(d)}}}])}(window.angular),function(a){"use strict";a.module("appFilters").filter("applySelectedFilters",["jobsFilterService","mapService","$timeout",function(b,c,d){var e,f=b.filters,g=function(a,b){return b.some(function(b){return a.indexOf(b)>=0})},h=function(a,b){var c=b.replace(/[^\w\s]/gi,""),d=new RegExp(c,"i");return d.test(a.title)||d.test(a.description)||d.test(a.categories.join(", "))||d.test(a.jobType)},i=function(b){return b.minSalary>=Number(f.salary)&&(!b.distance||b.distance<=Number(f.distance))&&(0===f.categories.length||g(b.categories,f.categories))&&(a.isUndefined(f.searchText)||h(b,f.searchText))},j=c.map.myLocationMarker.coords,k=function(a){if(a.latitude&&a.longitude){var b=Math.abs(j.longitude-a.longitude),c=Math.abs(j.latitude-a.latitude);a.distance=80*Math.sqrt(Math.pow(b,2)+Math.pow(c,2))}},l=[];return function(b){return e?l:(e=d(function(){l.splice(0,l.length),a.forEach(b,function(a){k(a),i(a)&&this.push(a)},l),f.totalJobs=l.length},2e3).then(function(){e=void 0}),l)}}])}(window.angular),function(a){"use strict";a.module("appControllers").controller("tourCtrl",["$scope","ipCookie","$timeout","deviceService",function(a,b,c,d){c(function(){a.currentStep=d.isMobile()?5:b("guided-tour")||0},1e4),a.stepComplete=function(){b("guided-tour",a.currentStep,{expires:30})}}])}(window.angular),function(a){"use strict";a.module("appControllers").controller("navbarCtrl",["$scope","$rootScope","deviceService","$mdSidenav","jobsFilterService","$timeout","$interval",function(b,c,d,e,f,g,h){b.title="Map My Park Job",b.progress="indeterminate",b.searchProgress=100,b.activeTab=d.activeTab,b.isMobile=d.isMobile,b.filters={searchText:void 0};var i,j,k,l=function(){a.isUndefined(j)&&(j=h(function(){b.searchProgress+=15},100,0,!0))},m=function(){a.isDefined(j)&&(h.cancel(j),j=void 0)};b.$watch("filters.searchText",function(c){a.isUndefined(c)||(g.cancel(i),b.searchProgress=0,l(),i=g(function(){k=k||document.getElementById("jobs-list"),k.scrollTop=0,f.filters.searchText=c,m(),b.searchProgress=100},1e3))}),b.toggleSidenav=function(){e("left").toggle()},c.$on("loading:progress",function(){b.progress="indeterminate"}),c.$on("loading:finish",function(){b.progress=void 0}),b.$on("$destroy",function(){m()})}])}(window.angular),function(a){"use strict";a.module("appControllers").controller("devicesCtrl",["$scope","deviceService",function(a,b){a.isMobile=b.isMobile,a.activeTab=b.activeTab,a.showList=function(){return a.isMobile()&&a.activeTab.list}}])}(window.angular),function(a){"use strict";a.module("appControllers").controller("autocompleteCtrl",["$scope","uiGmapGoogleMapApi","mapService","$mdDialog",function(a,b,c,d){var e;b.then(function(b){var c=document.getElementById(a.inputId),d={componentRestrictions:{country:"us"}};e=new b.places.Autocomplete(c,d),e.addListener("place_changed",f);var g=new b.Circle({center:{lat:35.79741992502266,lng:-78.64118938203126},radius:15e3});e.setBounds(g.getBounds())});var f=function(){d.hide().then(function(){var a=e.getPlace().geometry.location;c.updateUserCoords(a.lat(),a.lng())})}}])}(window.angular),function(a){"use strict";a.module("appControllers").controller("jobsListSmCtrl",["$scope","$mdDialog","$mdSidenav","mapService","jobsService","$timeout","jobsFilterService","$mdToast",function(a,b,c,d,e,f,g,h){a.map=d.map,a.currentPlace={name:"Raleigh, NC"},a.jobs=e.jobs,a.selectedFilters=g.filters,a.sortOptions=g.sortOptions;var i=function(){h.show(h.simple().textContent("Oops! This job does not have a set location.").position("top right").hideDelay(3e3))};a.centerToJob=function(b){return b.latitude?(a.map.zoom=13,a.map.location.coords.latitude=b.latitude,a.map.location.coords.longitude=b.longitude,void f(function(){b.markerClick(null,"card click",b)},200)):i()},a.openFilterSelection=function(){c("filter").toggle()}}])}(window.angular),function(a){"use strict";a.module("appControllers").controller("mapActionsCtrl",["$scope","mapService","$mdDialog",function(a,b,c){a.geoLocate=b.geoLocate,a.editLocation=function(a){c.show({templateUrl:"views/partials/edit-location-dialog.html",targetEvent:a,fullscreen:!0,clickOutsideToClose:!0,controller:"DialogCtrl",bindToController:!0})},a.speedDial={hidden:!1,isOpen:!1,openDirection:"up",items:[{tooltipVisible:!1,name:"Edit Location",direction:"left",icon:"core2:person-pin",action:a.editLocation,addIconClass:"person-pin"},{tooltipVisible:!1,name:"Find Me!",direction:"left",icon:"core2:my-location",action:a.geoLocate,addIconClass:"my-location"}]}}])}(window.angular),function(a){"use strict";a.module("appControllers").controller("mapCtrl",["$scope","mapService","jobsService","jobsMapConfig",function(a,b,c,d){a.map=b.map,a.jobs=c.jobs,a.jobMarkersConfig=d.jobMarkersConfig,a.jobWindow=d.jobWindow,a.map.events.zoom_changed=function(b){a.jobWindow.show=!1,a.jobMarkersConfig.type=b.getZoom()>=13?"spider":"cluster"}}])}(window.angular),function(a){"use strict";a.module("appControllers").controller("DialogCtrl",["$scope","$mdDialog",function(a,b){a.hide=function(){b.hide()},a.cancel=function(){b.cancel()},a.answer=function(a){b.hide(a)}}])}(window.angular),function(a){"use strict";a.module("appDirectives").directive("ngNavbar",function(){return{restrict:"E",replace:!0,templateUrl:"views/directives/navbar.html",controller:"navbarCtrl"}})}(window.angular),function(a){"use strict";a.module("appDirectives").directive("ngMain",function(){return{restrict:"E",templateUrl:"views/main.html",controller:"devicesCtrl"}})}(window.angular),function(a){"use strict";a.module("appDirectives").directive("ngSidenavs",function(){return{restrict:"E",replace:!0,templateUrl:"views/directives/sidenavs.html",controller:["$scope","$mdSidenav","jobsFilterService","deviceService","jobsService",function(b,c,d,e,f){var g=document.getElementById("jobs-list");b.showJobsList=function(){e.activeTab.list=!0,e.activeTab.map=!1,e.activeTab.name="list",b.closeSidenav("left")},b.hideJobsList=function(){e.activeTab.list=!1,e.activeTab.map=!0,e.activeTab.name="map",b.closeSidenav("left")},b.closeSidenav=function(a){c(a).close()},b.settings={distance:{name:"Distance",extraScreen:"distance",icon:"core2:location",filtersOn:"core2:filter-none"},categories:{name:"Category",extraScreen:"categories",icon:"core2:work",filtersOn:"core2:filter-none"},salary:{name:"Salary",extraScreen:"salary",icon:"core2:salary",filtersOn:"core2:filter-none"}},b.filters=d.filters,b.clearFilter=function(a,c){return a?(b.applyFilter(a,c),void("categories"===a&&i())):(b.clearFilter("salary",0),b.clearFilter("distance",9999),void b.clearFilter("categories",[]))},b.navigateTo=function(a){c(a).open()};var h=function(a){return"core2:filter-"+(a.constructor===Array?a.length>=10?"9-plus":a.length||"none":0===a||9999===a?"none":"1")};b.applyFilter=function(a,c){g=g||document.getElementById("jobs-list"),b.filters[a]=c,b.settings[a].filtersOn=h(c),g.scrollTop=0},b.categories=f.jobs.categories;var i=function(){a.forEach(b.categories,function(a){a.checked=!1})};b.salaryOptions=[8,10,12,15],b.distanceOptions=[5,10,15,20,25],b.catExists=function(a,b){return b.indexOf(a)>-1},b.catToggle=function(a,b){var c=b.indexOf(a);c>-1?b.splice(c,1):b.push(a)}}]}})}(window.angular),function(a){"use strict";a.module("appDirectives").directive("ngFooter",function(){return{restrict:"E",replace:!0,templateUrl:"views/directives/footer.html"}})}(window.angular),function(a){"use strict";a.module("appDirectives").directive("guidedTour",function(){return{restrict:"E",templateUrl:"views/directives/guided-tour.html",controller:"tourCtrl"}})}(window.angular),function(a){"use strict";a.module("appDirectives").directive("jobsListSm",function(){return{controller:"jobsListSmCtrl",restrict:"E",templateUrl:"views/directives/jobs-list-sm.html",replace:!0}})}(window.angular),function(a){"use strict";a.module("appDirectives").directive("stickyElement",["$mdSticky","$timeout","$compile",function(a,b,c){var d='<div ng-transclude layout-padding flex="none" class="md-primary jobs-subheader" layout = "row"></div>';return{restrict:"AE",replace:!0,transclude:!0,template:d,link:function(e,f,g,h,i){b(function(){a(e,f,c(d,i)(e))},500)}}}])}(window.angular),function(a){"use strict";a.module("appDirectives").directive("mapActions",function(){return{restrict:"E",replace:!0,templateUrl:"views/directives/map-actions.html",controller:"mapActionsCtrl"}})}(window.angular),function(a){"use strict";a.module("appDirectives").directive("gmapsAddress",["$timeout",function(a){return{restrict:"AE",transclude:!0,replace:!0,template:"<div ng-transclude></div>",scope:{inputId:"="},controller:"autocompleteCtrl",link:function(b,c){a(function(){var a=document.getElementsByClassName("pac-container");c.append(a)},0)}}}])}(window.angular),function(a){"use strict";a.module("appDirectives").directive("backToTop",function(){return{restrict:"E",transclude:!0,replace:!0,template:'<div id = "back-to-top" ng-transclude></div>',link:function(a,b){var c=b.parent();c.on("scroll",function(){this.scrollTop>=50?b.addClass("bring-to-screen"):b.removeClass("bring-to-screen")}),a.scrollToTop=function(){c.scrollTopAnimated(0,800)}}}})}(window.angular),function(a){"use strict";a.module("appDirectives").directive("mainMap",function(){return{controller:"mapCtrl",restrict:"E",templateUrl:"views/directives/map.html",replace:!0}})}(window.angular),function(a){"use strict";a.module("appDirectives").directive("scrollingButtons",function(){return{restrict:"A",transclude:!0,templateUrl:"views/directives/scrolling-buttons.html",link:function(b,c){function d(a,b){if(!h){var c,d,e,f,i=null,j=0,k=400,l=b-a,m=function(a){return.5>a?4*a*a*a:(a-1)*(2*a-2)*(2*a-2)+1},n=function(){i=g.scrollTop,e=g.scrollHeight,f=g.clientHeight+i,(d===b||i===b||f>=e)&&(clearInterval(p),h=!1)},o=function(){j+=16,c=j/k,c=c>1?1:c,d=a+l*m(c),g.scrollTop=d,n()},p=setInterval(o,16);h=!0}}var e=a.element(c.children().children()[0]),f=a.element(c.children().children()[2]),g=c.children().children()[1],h=!1;b.scrollup=function(){d(g.scrollTop,g.scrollTop-g.clientHeight)},b.scrolldown=function(){d(g.scrollTop,g.scrollTop+g.clientHeight)},a.element(g).bind("scroll",function(){this.scrollTop<=0&&e.removeClass("show-button"),this.scrollTop>=this.scrollHeight-this.clientHeight&&f.removeClass("show-button"),this.scrollTop>0&&this.scrollTop<this.scrollHeight-this.clientHeight&&(f.addClass("show-button"),e.addClass("show-button"))})}}})}(window.angular),function(a){"use strict";function b(a){return.5>a?4*a*a*a:(a-1)*(2*a-2)*(2*a-2)+1}a.module("parkJobs",["appServices","appFilters","appControllers","appDirectives","ngMaterial","uiGmapgoogle-maps","angular-tour","ngAnimate","ipCookie","duScroll","ngStorage"]).value("duScrollDuration",600).value("duScrollOffset",0).value("duScrollEasing",b).config(["uiGmapGoogleMapApiProvider",function(a){a.configure({signed_in:!0,v:"3.22",libraries:"places"})}]).config(["tourConfig",function(a){a.backDrop=!0}]).config(["$httpProvider",function(a){a.interceptors.push("httpInterceptor")}]).config(["$mdThemingProvider",function(a){a.theme("altTheme").primaryPalette("deep-purple").accentPalette("red").warnPalette("yellow")}]).config(["$mdIconProvider",function(a){a.defaultIconSet("img/icons/core-icons.9ac714bf.svg",48).iconSet("core2","img/icons/core-icons2.e659db8e.svg",24)}])}(window.angular),angular.module("parkJobs").run(["$templateCache",function(a){"use strict";a.put("views/directives/footer.html",'<footer class="footer"> <md-content layout-padding> <p> Copyright © 2015-2016 | <a href="https://www.raleighnc.gov/" target="_blank">raleighnc.gov</a> | All Rights Reserved </p> <p> Made by CORaleigh GIS team <span class="pull-right small-font"> <a href="https://icons8.com" target="_blank">Icon pack by Icons8</a> </span> </p> </md-content> </footer>'),a.put("views/directives/guided-tour.html",'<tour step="currentStep" post-step="stepComplete()"> <virtual-step tourtip="Jobs can be sorted by distance, salary, post date and title" tourtip-next-label="Next" tourtip-placement="left" tourtip-element="#jobs-list" use-source-scope="true" tourtip-step="0"> </virtual-step> <virtual-step tourtip="They can also be filtered for more relevant results" tourtip-next-label="Next" tourtip-placement="left" tourtip-element="#jobs-list" use-source-scope="true" tourtip-step="1"> </virtual-step> <virtual-step tourtip="You can click on a job marker to find that job on the list" tourtip-next-label="Next" tourtip-placement="right" tourtip-element=".angular-google-map-container" tourtip-container-element="#map-canvas" use-source-scope="true" tourtip-step="2"> </virtual-step> <virtual-step tourtip="You can manually modify your location to find jobs near you" tourtip-next-label="Next" tourtip-placement="left" tourtip-element="#map-actions" tourtip-container-element="#map-canvas" use-source-scope="true" tourtip-step="3"> </virtual-step> <virtual-step tourtip="Start applying for jobs!" tourtip-next-label="Thanks for the tips" tourtip-placement="left" tourtip-element=".apply-button" use-source-scope="true" tourtip-step="4"> </virtual-step> </tour>'),a.put("views/directives/jobs-list-sm.html",'<md-content id="jobs-list" layout="column" flex du-scroll-container> <back-to-top> <md-button class="md-accent md-raised md-fab md-mini" aria-label="Back to Top" ng-click="scrollToTop()"> <md-icon md-svg-icon="arrow-up"></md-icon> </md-button> </back-to-top> <sticky-element> <span flex layout="row"> <div flex="45" layout="row"> <md-icon md-svg-icon="core2:sort"></md-icon> <span class="text-before-dropdown md-primary">Sort by</span> <md-select ng-model="selectedFilters.selectedSort" aria-label="Select Sort" class="inline-dropdown md-primary" md-container-class="inline-dropdown" flex> <md-option ng-value="::option.model" ng-repeat="option in sortOptions">{{ ::option.view }}</md-option> </md-select> </div> <span flex="10"></span> <div flex="45" layout="row"> <span flex></span> <md-button class="capitalize md-primary md-raised filter-button" ng-click="openFilterSelection($event)"> <md-icon md-svg-icon="core2:filter"></md-icon> Filter </md-button> </div> </span> </sticky-element> <md-list> <md-list-item> <p>Showing <b>{{ selectedFilters.totalJobs }} {{ selectedFilters.searchText }}</b> jobs in <b>{{ currentPlace.name }}</b></p> </md-list-item> <md-list-item ng-repeat="job in jobs.list | applySelectedFilters | orderBy: selectedFilters.selectedSort"> <div data-job-id="{{ ::job.objectId }}" class="md-card" ng-class-odd="\'odd-card\'" flex> <div class="job-card-header md-card-header"> <div class="md-card-header-text layout-row"> <span class="md-subhead expiring-job" ng-if="::job.expiresSoon"> <md-icon md-svg-icon="expiring" aria-label="expiration alert icon"></md-icon> <b>Expires {{ ::job.endDate | date: \'EEEE, MMM d\' }}!</b> &nbsp; </span> <span flex></span> <span class="md-subhead new-job" ng-if="::job.isNew"><b>NEW!</b> &nbsp;</span> <span class="md-subhead">Posted {{ ::job.createdDate | date: \'mediumDate\' }}</span> <span class="md-subhead" ng-if="::!job.expiresSoon">&nbsp;|&nbsp;Expires {{ ::job.endDate | date: \'mediumDate\' }}</span> </div> </div> <div ng-click="::centerToJob(job)" class="job-card-title md-card-title"> <div class="md-card-title-text layout-column"> <span class="md-headline job-title limit-text">{{ ::job.title }}</span> <span class="md-subhead job-salary"> <md-icon aria-label="salary icon" md-svg-icon="core2:salary"> </md-icon> {{ ::job.jobType }}: {{ ::job.minSalary | currency }} - {{ ::job.maxSalary | currency }} {{ ::job.interval }} </span> <span class="md-subhead job-location" ng-show="job.distance"> <md-icon aria-label="distance icon" md-svg-icon="core2:location"> </md-icon> {{ job.distance | number: 2 }} Miles away </span> <span class="md-subhead job-category"> <md-icon aria-label="categories icon" md-svg-icon="categories"> </md-icon> Categories: {{ ::job.categories.join(\', \') }} </span> </div> </div> <div class="md-card-content"> <p ng-init="descriptionLimit = 135"> {{ job.description | limitTo: descriptionLimit }}<a ng-click="descriptionLimit = job.description.length" ng-show="descriptionLimit < job.description.length" class="color-indigo">... More</a> </p> </div> <div layout="row" layout-align="end center" class="card-actions md-card-actions"> <md-button target="_blank" ng-href="{{ ::job.detailsUrl }}" class="md-accent"> <md-icon aria-label="See Job Details" md-svg-icon="document"> </md-icon> Job Details </md-button> <md-button target="_blank" ng-href="{{ ::job.detailsUrl }}/apply" class="md-accent apply-button"> <md-icon aria-label="Apply now" md-svg-icon="briefcase"> </md-icon> Apply </md-button> </div> <div class="md-card-footer" ng-if="::jobs.otherLocations[job.objectId].length > 0"> <span class="footer-title"><b>Also available at:</b></span> <div class="md-chips chips-wrapper md-readonly"> <div class="md-chip background-default limit-text limit-width" ng-repeat="jobObj in jobs.otherLocations[job.objectId]"> <a class="footer-chip" ng-click="::centerToJob(jobObj)">{{ ::jobObj.location }}</a> </div> </div> </div> </div> </md-list-item> </md-list> </md-content>'),a.put("views/directives/map-actions.html",'<md-fab-speed-dial ng-hide="speedDial.hidden" md-direction="{{ ::speedDial.openDirection }}" md-open="speedDial.isOpen" class="md-scale md-fab-bottom-right" id="map-actions"> <md-fab-trigger> <md-button aria-label="Map Options" class="md-raised map-bottom-right md-fab"> <md-tooltip md-direction="left">Map Options</md-tooltip> <md-icon md-svg-icon="settings" aria-label="options"></md-icon> </md-button> </md-fab-trigger> <md-fab-actions> <div ng-repeat="item in speedDial.items"> <md-button aria-label="{{::item.name}}" class="md-fab md-raised md-mini" ng-click="item.action($event)"> <md-tooltip md-direction="{{::item.direction}}" md-visible="item.tooltipVisible" md-autohide="true" md-delay="100"> {{::item.name}} </md-tooltip> <md-icon md-svg-icon="{{::item.icon}}" ng-class="item.addIconClass" aria-label="{{::item.name}}"></md-icon> </md-button> </div> </md-fab-actions> </md-fab-speed-dial>'),a.put("views/directives/map.html",'<div id="map-canvas" layout="column" flex> <!-- Main Map Directive --> <ui-gmap-google-map center="map.location.coords" zoom="map.zoom" options="map.options" dragging="map.dragging" refresh="map.refresh" pan="map.pan" events="map.events" control="map.control" layout="column" flex> <!-- User Marker --> <ui-gmap-marker idkey="map.myLocationMarker.id" coords="map.myLocationMarker.coords" options="map.myLocationMarker.options"> </ui-gmap-marker> <!-- Job Markers --> <ui-gmap-markers models="jobs.mappable" idkey="\'objectId\'" coords="\'self\'" icon="\'icon\'" click="markerClick" type="jobMarkersConfig.type" typeoptions="jobMarkersConfig.typeOptions" typeevents="jobMarkersConfig.typeEvents" modelsbyref="jobMarkersConfig.shallowWatch" fit="jobMarkersConfig.fitToMap" options="\'options\'" events="jobMarkersConfig.markerEvents" dorebuildall="jobMarkersConfig.rebuild" control="jobMarkersConfig.control"> </ui-gmap-markers> <!-- Job Info Window --> <ui-gmap-window show="jobWindow.show" coords="jobWindow.coords" control="jobWindow.control" options="jobWindow.options" closeclick="jobWindow.closeclick" templateurl="jobWindow.templateUrl" templateparameter="jobWindow.templateParameter" ng-cloak> </ui-gmap-window> </ui-gmap-google-map> <map-actions></map-actions> </div>'),a.put("views/directives/navbar.html",'<md-toolbar layout="row" id="navbar" md-scroll-shrink class="md-medium-tall"> <div class="md-toolbar-tools" layout="row" layout-align="space-between stretch"> <md-button class="md-icon-button" aria-label="Settings" hide-gt-sm ng-click="toggleSidenav()"> <md-icon md-svg-icon="core2:menu" ng-cloak></md-icon> </md-button> <a flex alt="Parks and Recreation Logo" class="logo" href="https://parks.raleighnc.gov" target="_blank"></a> <h1 flex class="limit-text toolbar-title">{{ ::title }}</h1> <!-- Job Search filter input --> <div id="searchbox-container" class="hide-on-mobile"> <md-button class="search-icon-container md-icon-button"> <md-icon md-svg-icon="search" aria-label="Search Job"></md-icon> </md-button> <input id="search-box" ng-model="filters.searchText"> <md-progress-linear md-mode="determinate" value="{{ searchProgress }}"></md-progress-linear> </div> <!-- <md-autocomplete  md-selected-item="selectedJob"\n                      md-search-text="searchText"\n                      md-items="job in jobs.list"\n                      md-item-text="job.title"\n                      md-selected-item-change="selectedJobChange(job)"\n                      placeholder="Search">\n        \n      <span md-highlight-text="searchText" md-highlight-flags="^i">{{job.title}}</span>\n    </md-autocomplete> --> <md-progress-circular class="md-accent md-hue-2 progress-spinner" md-mode="{{ progress }}" md-diameter="50"></md-progress-circular> </div> </md-toolbar>'),a.put("views/directives/scrolling-buttons.html",'<div style="position: relative"> <div class="scroll-button-top"> <md-button ng-click="scrollup()" class="md-icon-button md-primary md-button-top" aria-label="Scroll up in panel"> <md-icon md-font-icon="fa-chevron-up" class="fa fa-lg"></md-icon> </md-button> </div> <div ng-transclude class="panel-scrollable"></div> <div class="scroll-button-bottom show-button"> <md-button class="md-icon-button md-primary md-button-bottom" aria-label="Scroll down in panel"> <md-icon ng-click="scrolldown()" md-font-icon="fa-chevron-down" class="fa fa-lg"></md-icon> </md-button> </div> </div>'),a.put("views/directives/sidenavs.html",'<div id="sidenavs"> <!-- Menu button -> Left Sidenav -> Opened from navbarCtrl --> <md-sidenav class="md-sidenav-left md-whiteframe-z2" md-component-id="left" md-is-open="leftSidenavOpen"> <md-toolbar> <h1 class="md-toolbar-tools">Menu</h1> </md-toolbar> <md-content layout-padding> <md-list> <md-list-item ng-click="hideJobsList()"> <md-icon md-svg-icon="core2:map-view" ng-cloak></md-icon> <p> Map View </p> </md-list-item> <md-list-item ng-click="showJobsList()"> <md-icon md-svg-icon="core2:list-view" ng-cloak></md-icon> <p> List View </p> </md-list-item> </md-list> <md-button ng-click="closeSidenav(\'left\')" class="md-primary capitalize"> Close </md-button> </md-content> </md-sidenav> <!-- Filter button -> Right Sidenav -> Opened from JobListSmCtrl --> <md-sidenav class="md-sidenav-right md-whiteframe-z2" md-component-id="filter" md-is-open="filterSidenavOpen"> <md-toolbar class="md-theme-light"> <h1 class="md-toolbar-tools">Filter</h1> </md-toolbar> <md-content layout-padding> <md-list> <md-list-item ng-hide="filters.totalJobs === undefined"> <p class="text-info">Total Results: <b>{{ filters.totalJobs }}</b> jobs</p> </md-list-item> <md-list-item ng-click="navigateTo(setting.extraScreen, $event)" ng-repeat="setting in settings"> <md-icon md-svg-icon="{{ ::setting.icon}}"></md-icon> <p> {{ ::setting.name }} </p> <md-icon md-svg-icon="{{setting.filtersOn}}"></md-icon> </md-list-item> </md-list> <div layout="row" layout-align="end stretch"> <md-button ng-click="clearFilter()" class="md-primary capitalize"> Clear all filters </md-button> <md-button ng-click="closeSidenav(\'filter\')" class="md-primary capitalize"> Close </md-button> </div> </md-content> </md-sidenav> <!-- Salary list item -> Right Sidenav -> Opened from sidenavs controller --> <md-sidenav class="md-sidenav-right md-whiteframe-z2" md-component-id="salary" md-is-open="salarySidenavOpen"> <md-toolbar class="md-theme-light"> <h1 class="md-toolbar-tools">Salary</h1> </md-toolbar> <md-content layout-padding> <md-list> <md-list-item ng-hide="filters.totalJobs === undefined"> <p class="text-info">Total Results: <b>{{ filters.totalJobs }}</b> jobs</p> </md-list-item> <md-radio-group ng-model="filters.salary" layout="column"> <md-list-item ng-click="applyFilter(\'salary\', filters.salary)" class="list-item-with-radio" md-ink-ripple="#FF0000" ng-repeat="salary in salaryOptions"> <md-radio-button flex value="{{::salary}}"> {{ ::salary | currency }}+ hourly </md-radio-button> </md-list-item> </md-radio-group> </md-list> <div layout="row" layout-align="end stretch"> <md-button ng-click="clearFilter(\'salary\', 0)" class="md-primary capitalize"> Clear Salary Filter </md-button> <md-button ng-click="closeSidenav(\'salary\')" class="md-primary capitalize"> &lt;&lt; Back </md-button> </div> </md-content> </md-sidenav> <!-- Distance list item -> Right Sidenav -> Opened from sidenavs controller --> <md-sidenav class="md-sidenav-right md-whiteframe-z2" md-component-id="distance" md-is-open="distanceSidenavOpen"> <md-toolbar class="md-theme-light"> <h1 class="md-toolbar-tools">Distance</h1> </md-toolbar> <md-content layout-padding> <md-list> <md-list-item ng-hide="filters.totalJobs === undefined"> <p class="text-info">Total Results: <b>{{ filters.totalJobs }}</b> jobs</p> </md-list-item> <md-radio-group ng-model="filters.distance" layout="column"> <md-list-item ng-repeat="distance in distanceOptions" ng-click="applyFilter(\'distance\', filters.distance)" class="list-item-with-radio" md-ink-ripple="#FF0000"> <md-radio-button flex value="{{ ::distance }}"> Within {{ ::distance }} miles </md-radio-button> </md-list-item> </md-radio-group> </md-list> <div layout="row" layout-align="end stretch"> <md-button ng-click="clearFilter(\'distance\', 9999)" class="md-primary capitalize"> Clear Distance Filter </md-button> <md-button ng-click="closeSidenav(\'distance\')" class="md-primary capitalize"> &lt;&lt; Back </md-button> </div> </md-content> </md-sidenav> <!-- Category list item -> Right Sidenav -> Opened from sidenavs controller --> <md-sidenav class="md-sidenav-right md-whiteframe-z2" md-component-id="categories" md-is-open="categorySidenavOpen"> <md-toolbar class="md-theme-light"> <h1 class="md-toolbar-tools">Category</h1> </md-toolbar> <md-content layout-padding> <md-list-item ng-hide="filters.totalJobs === undefined"> <p class="text-info">Total Results: <b>{{ filters.totalJobs }}</b> jobs</p> </md-list-item> <div ng-repeat="(catName, category) in categories"> <md-checkbox ng-checked="catExists(catName, filters.categories)" ng-click="catToggle(catName, filters.categories)" aria-label="{{ ::catName }}" ng-model="category.checked" ng-change="applyFilter(\'categories\', filters.categories)"> {{ ::catName }} ({{ category.jobCount }}) </md-checkbox> </div> <div layout="row" layout-align="end stretch"> <md-button ng-click="clearFilter(\'categories\', [])" class="md-primary capitalize"> Clear Categories Filter </md-button> <md-button ng-click="closeSidenav(\'categories\')" class="md-primary capitalize"> &lt;&lt; Back </md-button> </div> </md-content> </md-sidenav> </div>'),
a.put("views/main.html",'<div layout="row" flex> <div flex="100" flex-gt-sm="60" layout="column" ng-hide="showList()"> <main-map></main-map> </div> <div flex="100" flex-gt-sm="40" layout="column" ng-show="activeTab.list"> <jobs-list-sm></jobs-list-sm> </div> </div>'),a.put("views/partials/edit-location-dialog.html",'<md-dialog aria-label="Edit Location"> <form> <md-toolbar> <div class="md-toolbar-tools"> <h2>Edit my location</h2> <span flex></span> <md-button class="md-icon-button" ng-click="cancel()"> <md-icon md-font-icon="fa-times" class="fa fa-2x" aria-label="Close dialog"></md-icon> </md-button> </div> </md-toolbar> <md-dialog-content style="max-width: 800px; max-height: 810px; min-height: 100px; min-width: 400px"> <gmaps-address id="address-search-box" input-id="\'edit-my-location\'"> <md-input-container class="md-icon-float md-block" style="margin-top: 20px; padding-right: 10px"> <label>Address</label> <md-icon md-svg-icon="core2:person-pin"></md-icon> <input id="edit-my-location" type="text" placeholder="" class="md-primary" md-autofocus> </md-input-container> </gmaps-address> </md-dialog-content> <md-dialog-actions layout="row"> <md-button ng-click="hide()" style="margin-right:10px"> Close </md-button> </md-dialog-actions> </form> </md-dialog>'),a.put("views/partials/job-window.html",'<div id="job-window" layout="column"> <div class="title" layout="row"> <div class="title-text" flex layout="column"> <span flex class="md-headline">{{ parameter.title }}</span> <span flex class="md-subhead job-location"> <md-icon md-svg-icon="core2:location" aria-label="Location Icon"></md-icon> <span class="after-icon">{{ parameter.location || parameter.formattedAddress }}</span> </span> <span flex class="md-subhead job-salary"> <md-icon md-svg-icon="core2:salary" aria-label="Salary Icon"></md-icon> <span class="after-icon">{{ parameter.jobType }}: {{ parameter.minSalary | currency }}-{{ parameter.maxSalary | currency }} {{ parameter.interval }}</span> </span> </div> </div> <div class="card-actions" layout="row" layout-align="center center" md-theme="altTheme"> <md-button class="md-primary capitalize" ng-href="{{ parameter.detailsUrl }}/apply" target="_blank"> <md-icon md-svg-icon="external-link" aria-label="Apply Button External Link"></md-icon> Apply </md-button> </div> </div>'),a.put("views/partials/search-box.html",'<input type="text" class="form-control" id="search-box" placeholder="Position Map">')}]);