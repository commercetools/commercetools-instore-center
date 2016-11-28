angular.module('core')
  .directive('submitValidate', function () {
    return {
      require: 'form',
      restrict: 'A',
      link: function( scope , element , attributes ){
        var $element = angular.element(element);
        $element.on('submit', function(e) {
          $element.find('.ng-pristine').removeClass('ng-pristine').addClass('ng-dirty');
          var form = scope[ attributes.name ];
          angular.forEach( form , function ( formElement , fieldName ) {
            if ( fieldName[0] === '$' ) {return;}
            formElement.$pristine = false;
            formElement.$dirty = true;
          },this);
          form.$setDirty();
          scope.$apply();
        });
      }
    };
  });
