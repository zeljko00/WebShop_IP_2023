import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class MatPaginatorIntlSrb extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Proizvoda po stranici';
}
