import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { valid } from 'semver';

export function IsSemver(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isSemver',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(version: any, _args: ValidationArguments) {
          // Everything else is class-validator boilerplate, this is the real logic
          return valid(version) !== null;
        },
      },
    });
  };
}
