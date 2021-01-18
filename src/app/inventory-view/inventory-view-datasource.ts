import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface InventoryViewItem {
  codigo: number;
  descripcion: string;
  ubicacion: string;
  estado: string;
}
//'codigo', 'descripcion','ubicacion','estado'

// TODO: replace this with real data from your application
const EXAMPLE_DATA: InventoryViewItem[] = [
  {codigo: 101, descripcion:'Computadora',ubicacion:'IT',estado:'Nueva'},
  {codigo: 102, descripcion:'Laptop',ubicacion:'IT',estado:'Nueva'},
  {codigo: 103, descripcion:'Computadora',ubicacion:'IT',estado:'Nueva'},
  {codigo: 104, descripcion:'Laptop',ubicacion:'IT',estado:'Nueva'},
  {codigo: 105, descripcion:'Computadora',ubicacion:'IT',estado:'Nueva'},
  {codigo: 106, descripcion:'Laptop',ubicacion:'IT',estado:'Nueva'},
  {codigo: 107, descripcion:'Computadora',ubicacion:'IT',estado:'Nueva'},
  {codigo: 108, descripcion:'Laptop',ubicacion:'IT',estado:'Nueva'},
  {codigo: 109, descripcion:'Computadora',ubicacion:'IT',estado:'Nueva'},
  {codigo: 110, descripcion:'Laptop',ubicacion:'IT',estado:'Nueva'}
];



/**
 * Data source for the InventoryView view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class InventoryViewDataSource extends DataSource<InventoryViewItem> {
  data: InventoryViewItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<InventoryViewItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: InventoryViewItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: InventoryViewItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'descripcion': return compare(a.descripcion, b.descripcion, isAsc);
        case 'codigo': return compare(+a.codigo, +b.codigo, isAsc);
        case 'ubicacion': return compare(a.ubicacion, b.ubicacion, isAsc);
        case 'estado': return compare(a.estado, b.estado, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
