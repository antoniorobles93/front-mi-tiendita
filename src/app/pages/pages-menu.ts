import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'INICIO',
    group: true,
  },
  {
    title: 'Nueva Venta',
    icon: 'shopping-cart-outline',
    link: '/pages/sales',
    home: true,
  },
  {
    title: 'Listado De Ventas',
    icon: 'list-outline',
    link: '/pages/sales-list',
    home: true,
  },
  {
    title: 'Catalogos',
    icon: 'layout-outline',
    children: [
      {
        title: 'Clientes',
        link: '/pages/catalogs/customers',
        icon: 'people-outline',

      },
      {
        title: 'Articulos',
        link: '/pages/catalogs/articles',
        icon: 'archive-outline',

      },
      {
        title: 'Marcas',
        link: '/pages/catalogs/branded-articles',
        icon: 'award-outline',

      },
      {
        title: 'Iva',
        link: '/pages/catalogs/percentage',
        icon: 'percent-outline',
      }
    ],
  },
];
