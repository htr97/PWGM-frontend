import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface MaintenanceOrdersItem {
  equipo: string;
  departamento: string;
  tipoMantenimiento: string;
  fecha: string;
  prioridad: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: MaintenanceOrdersItem[] = [
  {equipo:'LAPTOP-52GSH3F',departamento:'IT',tipoMantenimiento:'Correctivo',fecha:'2021-02-04',prioridad:'Alta'},
  {equipo:'LAPTOP-34GHK83',departamento:'IT',tipoMantenimiento:'Correctivo',fecha:'2021-02-05',prioridad:'Media'},
  {equipo:'LAPTOP-ABC123',departamento:'Administracion',tipoMantenimiento:'Correctivo',fecha:'2021-02-21',prioridad:'Alta'}
];

/**
 * Data source for the MaintenanceOrders view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class MaintenanceOrdersDataSource extends DataSource<MaintenanceOrdersItem> {
  data: MaintenanceOrdersItem[] = EXAMPLE_DATA;
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
  connect(): Observable<MaintenanceOrdersItem[]> {
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
  private getPagedData(data: MaintenanceOrdersItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: MaintenanceOrdersItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'equipo': return compare(a.equipo, b.equipo, isAsc);
        case 'prioridad': return compare(+a.prioridad, +b.prioridad, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
