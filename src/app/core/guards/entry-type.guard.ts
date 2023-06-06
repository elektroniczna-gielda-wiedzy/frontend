import { CanActivateFn, Router } from '@angular/router';
import { stringToEntryType } from '../enums/entry-type';
import { inject } from '@angular/core';

export const entryTypeGuard: CanActivateFn = (
  route,
  state,
  router = inject(Router)
) => {
  const entryType = route.paramMap.get('entryType');
  if (!entryType) {
    return false;
  }
  try {
    stringToEntryType(entryType);
  } catch (error) {
    router.navigate(['/entries/announcement']);
    return false;
  }
  return true;
};
