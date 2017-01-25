(function() {
    'use strict';

    angular
        .module('bpm_app')
        .controller('TaskController', TaskController);

    TaskController.$inject = ['$scope', '$state', 'AuthService', '$rootScope', 'TaskService', '$stateParams'];

    function TaskController($scope, $state, AuthService, $rootScope, TaskService, $stateParams) {


        $scope.tasks = [];
        $scope.currentForm = [];
        $scope.currentTaskId;

        $scope.type = $stateParams.type;

        if($scope.type==='my'){
            TaskService.my(
                function(res){
                    $scope.tasks = res.data;
                },
                function(res){
                }
            );
        }else
        if($scope.type==='involved'){
            alert("todo");
        }

        $scope.showTaskDetail = function(taskId){
            $scope.currentTaskId = taskId;
            if($scope.type==='my'){
                TaskService.getTaskForm(
                                taskId,
                                function(res){
                                    $scope.currentForm = res.data;
                                },
                                function(res){

                                }
                 );
             }else
             if($scope.type==='involved'){
                alert("todo");
             }
        }

        $scope.complete = function(){
            var o = transform();
            console.log(o);
            TaskService.completeTask(
                o,
                function(res){

                },
                function(res){

                });
        }


        $scope.claim = function(){
            alert('todo');
        }

        //util function
        var transform = function(){
            var obj = {}
            obj.taskId=$scope.currentTaskId+"";
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