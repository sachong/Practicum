import { Pipe, PipeTransform } from '@angular/core';
import { UserRoles } from '@models/user-roles';
import { RoleService } from '@services/role.service';

@Pipe({
    name: 'hasRoleAccess'
})
export class HasRoleAccess implements PipeTransform {
    constructor(private roleService: RoleService) {}

    transform(requiredRoles: UserRoles[], args?: any) {
        return this.roleService.hasAccess(requiredRoles)
    }
}
