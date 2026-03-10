'use client';

import DashboardHeaderPage from '@/components/shared/dashboard/dashboard-header';
import DashboardSearchInput from '@/components/shared/dashboard/dashboard-search-input';
import AppPagination from '@/components/shared/app-pagination';
import { DashboardTable } from '@/components/shared/dashboard/dashboard-tabel';

const mockCategories = [
  {
    _id: '1',
    name: 'Electronics',
    productsCount: 124,
    description: 'Gadgets and devices',
    createdAt: '2024-01-12',
    status: 'Active',
  },
  {
    _id: '2',
    name: 'Clothing',
    productsCount: 87,
    description: 'Apparel and accessories',
    createdAt: '2024-02-05',
    status: 'Active',
  },
  {
    _id: '3',
    name: 'Home & Garden',
    productsCount: 56,
    description: 'Furniture and plants',
    createdAt: '2024-03-18',
    status: 'Inactive',
  },
  {
    _id: '4',
    name: 'Sports',
    productsCount: 43,
    description: 'Equipment and gear',
    createdAt: '2024-04-22',
    status: 'Active',
  },
  {
    _id: '5',
    name: 'Books',
    productsCount: 201,
    description: 'Fiction and non-fiction',
    createdAt: '2024-05-09',
    status: 'Active',
  },
  {
    _id: '6',
    name: 'Toys',
    productsCount: 38,
    description: 'Games and collectibles',
    createdAt: '2024-06-30',
    status: 'Inactive',
  },
  {
    _id: '6',
    name: 'Toys',
    productsCount: 38,
    description: 'Games and collectibles',
    createdAt: '2024-06-30',
    status: 'Inactive',
  },
  {
    _id: '6',
    name: 'Toys',
    productsCount: 38,
    description: 'Games and collectibles',
    createdAt: '2024-06-30',
    status: 'Inactive',
  },
];

export default function DashboardAllProducts() {
  return (
    <section className="space-y-4 rounded-md bg-white p-3 dark:bg-gray-800">
      {/* Header */}
      <DashboardHeaderPage
        btnText="Add a new category"
        title="All Categories"
        path="categories/create"
      />

      {/* Search */}
      <DashboardSearchInput />

      {/* Table */}
      <DashboardTable
        rows={mockCategories}
        columns={[
          {
            label: 'Name',
            render: (row) => (
              <span className="font-medium capitalize">{row.name}</span>
            ),
          },
          {
            label: 'Products Count',
            render: (row) => `${row.productsCount} products`,
          },
          {
            label: 'Description',
            render: (row) => (
              <span className="text-gray-500 dark:text-gray-400">
                {row.description}
              </span>
            ),
          },
          {
            label: 'Created At',
            render: (row) => (
              <span className="text-gray-500 dark:text-gray-400">
                {row.createdAt}
              </span>
            ),
          },
          {
            label: 'Status',
            render: (row) => (
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  row.status === 'Active'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                }`}
              >
                {row.status}
              </span>
            ),
          },
        ]}
        onEdit={(row) => {}}
        onDelete={(row, onSettled) => {}}
      />

      {/* Pagination */}
      <AppPagination
        currentPage={1}
        locale="en"
        totalPages={3}
        show={true}
        pathname="/dashboard/products"
        searchParams={{}}
      />
    </section>
  );
}
