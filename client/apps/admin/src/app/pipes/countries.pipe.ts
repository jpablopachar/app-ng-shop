import { Pipe, PipeTransform } from '@angular/core';
import { UsersService } from '@client/users';

@Pipe({
  name: 'countries'
})
export class CountriesPipe implements PipeTransform {
  constructor(private readonly _usersService: UsersService) { }

  transform(countryKey: string): string {
    return this._usersService.getCountry(countryKey);
  }
}
