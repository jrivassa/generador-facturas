import { CatalogItem } from "../data/interfaces";

export const PRODUCTS: CatalogItem[] = [
  {
    id: 'p1',
    name: 'Laptop Pro X1',
    description: 'Laptop de alta gama para profesionales',
    price: 1299.99,
    type: 'producto'
  },
  {
    id: 'p2',
    name: 'Monitor UltraWide 34"',
    description: 'Monitor curvo para productividad',
    price: 499.99,
    type: 'producto'
  },
  {
    id: 'p3',
    name: 'Teclado Mecánico RGB',
    description: 'Teclado mecánico con switches Cherry MX',
    price: 129.99,
    type: 'producto'
  },
  {
    id: 'p4',
    name: 'Mouse Inalámbrico MX Master',
    description: 'Mouse ergonómico para productividad',
    price: 89.99,
    type: 'producto'
  },
  {
    id: 'p5',
    name: 'SSD NVMe 1TB',
    description: 'Unidad de estado sólido de alta velocidad',
    price: 159.99,
    type: 'producto'
  }
];

export const SERVICES: CatalogItem[] = [
  {
    id: 's1',
    name: 'Consultoría Técnica',
    description: 'Asesoramiento especializado en arquitectura de software',
    price: 150.00,
    type: 'servicio'
  },
  {
    id: 's2',
    name: 'Desarrollo Web',
    description: 'Desarrollo de aplicaciones web personalizadas',
    price: 250.00,
    type: 'servicio'
  },
  {
    id: 's3',
    name: 'Soporte Técnico',
    description: 'Soporte técnico prioritario 24/7',
    price: 80.00,
    type: 'servicio'
  },
  {
    id: 's4',
    name: 'Capacitación en Equipo',
    description: 'Entrenamiento personalizado para equipos',
    price: 400.00,
    type: 'servicio'
  },
  {
    id: 's5',
    name: 'Mantenimiento Mensual',
    description: 'Mantenimiento preventivo y correctivo',
    price: 120.00,
    type: 'servicio'
  }
];

export const ALL_CATALOG: CatalogItem[] = [...PRODUCTS, ...SERVICES];