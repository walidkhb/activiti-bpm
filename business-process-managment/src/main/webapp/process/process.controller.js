(function() {
    'use strict';

    angular
        .module('bpm_app')
        .controller('ProcessController', ProcessController);

    ProcessController.$inject = ['$scope', '$state', 'AuthService', '$rootScope', 'ProcessService', '$stateParams'];

    function ProcessController($scope, $state, AuthService, $rootScope, ProcessService, $stateParams) {

        $scope.type = $stateParams.type; // my or instances

        $scope.processes = [];      // list of process def that user can start
        $scope.currentForm = [];    // start form for current selected process def
        $scope.currentProcessKey;   // current selected process def
        $scope.processInstances=[]; // process instances for current selected process


        var getProcesses = function(){

            //get process def that user can start
            ProcessService.my(
                function(res){
                    $scope.processes = res.data;
                },
                function(res){
                }
            );

            //reset
            $scope.currentForm = [];
            $scope.currentProcessKey = undefined;

        }

        getProcesses();

        $scope.showProcessDetail = function(processId){

            //set currnet process id
            $scope.currentProcessKey = processId;

            //get start form
            ProcessService.getStartForm(
                processId,
                function(res){
                    $scope.currentForm = res.data;

                    if($scope.currentForm.length!=0){
                        for(var i=0; i<$scope.currentForm.length; i++){
                            var id = $scope.currentForm[i].id
                            if(id.includes("_groups_list_")){
                                var idx = i;
                                //$scope.currentForm[i].groupId = id.split("_group_member_")[0];
                                var searchFor = id.split("_groups_list_")[0];
                                $scope.currentForm[i].listId = id.split("_groups_list_")[0];
                                //TODO - get list for id = '$scope.currentForm[i].listId'
                                $scope.currentForm[idx].list = [];
                            }
                        }
                    }

                },
                function(res){

                }
             );

        }

        $scope.showProcessInstances = function(processId){

                //set currnet process
                $scope.currentProcessKey = processId;

                //get process instances
                ProcessService.instances(
                    processId,
                    function(res){
                        $scope.processInstances = res.data;
                    },
                    function(res){

                    }
                 );

        }


        $scope.start = function(){
            //transform form params
            var o = transform();
            console.log(o);
            ProcessService.startProcess(
                o,
                function(res){

                },
                function(res){

                });
        }


        //util
        var transform = function(){
            var obj = {}
            obj.id=$scope.currentProcessKey+"";
            obj.formProperties=[];
            for(var i=0; i<$scope.currentForm.length; i++){
                var tmp={};
                tmp.id=$scope.currentForm[i].id;
                tmp.value=$scope.currentForm[i].value;
                obj.formProperties.push(tmp);
            }
            return obj;
        }


        //////////////////////////////////////////////////
        //          formProperties example              //
        //////////////////////////////////////////////////
       /*
        [
          {
            "id": "text",
            "name": "TEXT",
            "type": {
              "name": "string",
              "mimeType": "text/plain"
            },
            "value": null,
            "readable": true,
            "required": false,
            "writable": true
          },
          {
            "id": "new_property_1",
            "name": "DA NE",
            "type": {
              "name": "boolean",
              "mimeType": "plain/text"
            },
            "value": "true",
            "readable": true,
            "required": false,
            "writable": true
          }
        ]
        */

        //////////////////////////////////////////////////

    }
})();
