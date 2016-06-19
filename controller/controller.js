// var myApp = angular.module('myApp', []);

myApp.controller('MainCtrl', ['$scope', function($scope) {
	
	// $scope.name = "Task";
	// var vm = this;

	$scope.counter = 0;
	$scope.tasks = {};
	$scope.taskName = '';

	$scope.addTask = function(){
		var newTask = {
			id: 'task' + $scope.counter,
			name: $scope.taskName
		};

		$scope.tasks[newTask.id] = newTask;
		$scope.taskName = '';
		$scope.counter++;
	};

	$scope.removeTask = function(task){
		delete $scope.tasks[task.id]
	};
}]);

myApp.directive('dirTimer', function($interval){

	return {
		restrict: 'E',
		templateUrl: 'views/partial.html',
		link: function($scope, element){
			// var vm = this;

			$scope.taskObject.milliseconds = 0;

			var updateTime = null;
			$scope.startTiming = function(){
				updateTime = $interval(function(){
					$scope.taskObject.milliseconds = $scope.taskObject.milliseconds + 1000;

				}, 1000);
			}

			$scope.pauseTiming = function() {
                $scope.cancelInterval();
            }

            $scope.stopTiming = function() {
                $scope.cancelInterval();
                $scope.taskObject.totalTime = $scope.taskObject.milliseconds;
                $scope.resetTimer();
            }

            $scope.cancelInterval = function() {
                $interval.cancel(updateTime);
            }

            $scope.resetTimer = function() {
                $scope.taskObject.milliseconds = 0;
            }

            element.on('$destroy', function() {
                $scope.cancelInterval();
            });
		},

		scope: {
			taskObject: '=timerTask'
		}
	}
});
