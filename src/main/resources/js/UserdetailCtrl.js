UseradminApp.controller('UserdetailCtrl', function($scope, Users) {

  $scope.roles = {
    selected: false
  }

  $scope.userProperties = [
    {value: 'firstName',    minLength: 2, maxLength: 64, required: true, type: 'text', validationMsg:'Must be between 2-64 characters long.'},
    {value: 'lastName',     minLength: 2, maxLength: 64, required: true, type: 'text', validationMsg:'Must be between 2-64 characters long.'},
    {value: 'email',        minLength: 4, maxLength: 64, required: true, type: 'email', validationMsg:'Please enter a valid e-mail address.'},
    {value: 'cellPhone',    required: false, type: 'text'},
    {value: 'personRef',    required: false, type: 'text'}
  ];

  $scope.getValidationClass = function(formPart) {
    // console.log('Get validation for: ', formPart);
    var classes = [];
    if(formPart.$dirty && formPart.$valid) classes.push('has-success');
    if(formPart.$dirty && formPart.$invalid) classes.push('has-error');
    return classes.join(' ');
  }

  $scope.visibleRoleProperties = [
    {name: 'applicationName',       label: 'Application',   editable: false},
    {name: 'organizationName',      label: 'Organization',  editable: false},
    {name: 'applicationRoleName',   label: 'Role',          editable: false},
    {name: 'applicationRoleValue',  label: 'Value',         editable: true}
  ];

  $scope.dict = {
    en: {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'E-mail',
      cellPhone: 'Cellphone',
      personRef: 'Reference',
      applicationName: 'Application',
      organizationName: 'Organization',
      roleName: 'Role',
      roleValue: 'Value'
    }
  } 

  var noRolesSelectedMessage = 'Please select a role first!';
  $scope.rolesRequiredMessage = noRolesSelectedMessage;

  $scope.$watch('roles.selected', function(){
    $scope.rolesRequiredMessage = ($scope.roles.selected) ? '' : noRolesSelectedMessage;
  });

  $scope.save = function() {
    // Make sure these $scope-values are properly connected to the view
    if($scope.form.userDetail.$valid){
        if(Users.user.isNew) {
            var newUser = angular.copy(Users.user);
            delete newUser.isNew;
            Users.add(newUser, function(){
                delete Users.user.isNew;
                $scope.form.userDetail.$setPristine();
            });
        } else {
            Users.save(Users.user, function(){
                $scope.form.userDetail.$setPristine();
            });
        }
    } else {
        console.log('Tried to save an invalid form.');
    }
  }

  $scope.saveRoleForCurrentUser = function(role) {
    delete role.isEditing;
    Users.saveRoleForCurrentUser(role);
  }

  $scope.deleteRolesForUser = function() {
    if(window.confirm('Are you sure you want to delete these roles?')) {
        console.log('Deleting roles');
        for(var i=0; i<Users.userRoles.length; i++) {
            var role = Users.userRoles[i];
            console.log(role);
            if(role.isSelected) {
                console.log(role);
                Users.deleteRoleForCurrentUser(role);
            }
        }
    } else {
        console.log('Cancelled deletion of roles');
    }
  }

  $scope.delete = function() {
    if(window.confirm('Are you sure you want to delete?')) {
        console.log('Deleting user', Users.user.username);
        Users.delete(Users.user);
    } else {
        console.log('Cancelled deletion of user', Users.user.username);
    }
  }

});