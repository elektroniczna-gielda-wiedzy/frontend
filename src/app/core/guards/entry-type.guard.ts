import { CanActivateFn, Router } from '@angular/router';
import { stringToEntryType } from '../enums/entry-type';
import { inject } from '@angular/core';

export const entryTypeGuard: CanActivateFn = (
  route,
  state,
  router = inject(Router)
) => {
  const entryType = route.paramMap.get('entryType');
  if (entryType && stringToEntryType(entryType) !== null) {
    return true;
  } else {
    router.navigate(['/entries/announcement']);
    return false;
  }
};
