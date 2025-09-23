import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from './pokemon';

@Pipe({
  name: 'filterPokemonPipe',
  standalone: false
})
export class FilterPokemonPipePipe implements PipeTransform {

   transform(pokes: any[], property?: string, searchString?: string): any {
    if(typeof searchString == 'undefined'){
      return pokes;
    }
    else if (typeof pokes !== 'undefined' && typeof property !== 'undefined') {
      return pokes.filter((poke) => {
        return poke[property].toLowerCase().indexOf(searchString.toLowerCase()) !== -1;
      });
    } else {
      return [];
    }
  }
}
