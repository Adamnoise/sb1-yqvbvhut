import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  createColumnHelper,
  flexRender
} from '@tanstack/react-table';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Checkbox,
  Input,
  Chip,
  Pagination,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

interface Campaign {
  id: string;
  title: string;
  image: string;
  likes: number;
  views: number;
  conversionRate: number;
  isPositive: boolean;
  status: 'active' | 'paused' | 'draft';
  platforms: string[];
  createdAt: string;
}

const campaignData: Campaign[] = [
  // [Same sample data as before...]
];

const columnHelper = createColumnHelper<Campaign>();

export const AdvancedCampaignTable = () => {
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [rowSelection, setRowSelection] = React.useState({});
  const [statusFilter, setStatusFilter] = React.useState('all');

  const filteredData = React.useMemo(() => {
    if (statusFilter === 'all') return campaignData;
    return campaignData.filter(c => c.status === statusFilter);
  }, [statusFilter]);

  const columns = React.useMemo(() => [
    columnHelper.display({
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          isSelected={table.getIsAllRowsSelected()}
          onValueChange={table.getToggleAllRowsSelectedHandler()}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          isSelected={row.getIsSelected()}
          onValueChange={row.getToggleSelectedHandler()}
          aria-label={`Select row ${row.id}`}
        />
      ),
      enableSorting: false,
    }),
    columnHelper.accessor('title', {
      header: 'Campaign',
      cell: info => (
        <div className="flex items-center gap-3">
          <img src={info.row.original.image} alt={info.getValue()} className="h-10 w-10 rounded-lg object-cover" />
          <div>
            <div className="font-medium">{info.getValue()}</div>
            <div className="flex gap-2 text-default-400 mt-1">
              {info.row.original.platforms.map(platform => (
                <div key={platform} className="w-5 h-5 rounded-full bg-default-100 flex items-center justify-center">
                  <Icon icon={`logos:${platform}`} className="w-3 h-3" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('likes', {
      header: 'Likes',
      cell: info => <div className="text-center font-medium">{info.getValue().toLocaleString()}</div>,
    }),
    columnHelper.accessor('views', {
      header: 'Views',
      cell: info => <div className="text-center font-medium">{info.getValue().toLocaleString()}</div>,
    }),
    columnHelper.accessor('conversionRate', {
      header: 'Conversion',
      cell: info => {
        const isPositive = info.row.original.isPositive;
        return (
          <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs ${
            isPositive ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
          }`}>
            <Icon icon={isPositive ? "lucide:arrow-up" : "lucide:arrow-down"} className="w-3 h-3" />
            <span>{info.getValue()}%</span>
          </div>
        );
      }
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => {
        const status = info.getValue();
        const colorMap = {
          active: 'success',
          paused: 'warning',
          draft: 'default'
        };
        return (
          <div className="text-center">
            <Chip color={colorMap[status]} size="sm" variant="flat">
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Chip>
          </div>
        );
      }
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex justify-center gap-2">
          <Button isIconOnly size="sm" variant="flat" color="primary"><Icon icon="lucide:eye" className="w-4 h-4" /></Button>
          <Button isIconOnly size="sm" variant="flat"><Icon icon="lucide:edit-2" className="w-4 h-4" /></Button>
          <Button isIconOnly size="sm" variant="flat" color="danger"><Icon icon="lucide:trash-2" className="w-4 h-4" /></Button>
        </div>
      ),
    }),
  ], []);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      globalFilter,
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;

  return (
    <Card className="border-none shadow-card">
      <CardHeader className="flex flex-col gap-4 px-6 pt-6 pb-0">
        <div className="flex justify-between items-center w-full">
          <div>
            <h3 className="text-xl font-semibold">Campaigns</h3>
            <p className="text-sm text-default-500">Marketing performance</p>
          </div>
          <Button color="primary" radius="full" size="sm" startContent={<Icon icon="lucide:plus" className="w-4 h-4" />}>New Campaign</Button>
        </div>

        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            {Object.keys(rowSelection).length > 0 && (
              <>
                <Chip color="primary" variant="flat" size="sm">{Object.keys(rowSelection).length} selected</Chip>
                <Button size="sm" color="danger" variant="flat" startContent={<Icon icon="lucide:trash-2" className="w-3.5 h-3.5" />}>Delete</Button>
                <Button size="sm" color="primary" variant="flat" startContent={<Icon icon="lucide:archive" className="w-3.5 h-3.5" />}>Archive</Button>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Input
              placeholder="Search campaigns..."
              value={globalFilter ?? ''}
              onValueChange={setGlobalFilter}
              startContent={<Icon icon="lucide:search" className="text-default-400 w-4 h-4" />}
              size="sm"
              radius="full"
              className="w-64"
              clearable
            />
            <Dropdown>
              <DropdownTrigger>
                <Button size="sm" variant="flat" radius="full" startContent={<Icon icon="lucide:filter" className="w-3.5 h-3.5" />}>Filter</Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Filter options"
                onAction={(key) => setStatusFilter(String(key))}
                selectedKeys={new Set([statusFilter])}
              >
                <DropdownItem key="all">All campaigns</DropdownItem>
                <DropdownItem key="active">Active campaigns</DropdownItem>
                <DropdownItem key="paused">Paused campaigns</DropdownItem>
                <DropdownItem key="draft">Draft campaigns</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </CardHeader>

      <CardBody className="px-6 overflow-hidden">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="overflow-x-auto">
          <table className="w-full min-w-full table-fixed">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="border-b border-default-100">
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className={`py-3 px-4 text-sm font-medium text-default-600 text-left ${['likes', 'views', 'conversionRate', 'status'].includes(header.id) ? 'text-center' : ''}`}
                      style={{ width: header.id === 'select' ? '40px' : header.id === 'actions' ? '120px' : 'auto' }}
                    >
                      {header.isPlaceholder ? null : (
                        <div className={`flex items-center ${header.column.getCanSort() ? 'cursor-pointer select-none' : ''} ${['likes', 'views', 'conversionRate', 'status'].includes(header.id) ? 'justify-center' : ''}`}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: <Icon icon="lucide:chevron-up" className="ml-1 w-4 h-4" />,
                            desc: <Icon icon="lucide:chevron-down" className="ml-1 w-4 h-4" />
                          }[header.column.getIsSorted() as string] ?? (header.column.getCanSort() ? <Icon icon="lucide:chevron-up-down" className="ml-1 w-4 h-4 text-default-300" /> : null)}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr><td colSpan={columns.length} className="text-center py-10 text-default-500">No campaigns found matching your filter.</td></tr>
              ) : (
                table.getRowModel().rows.map(row => (
                  <tr key={row.id} className="border-b border-default-100 hover:bg-content2/50 transition-colors">
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="py-4 px-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </motion.div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-default-500">
            Showing {pageIndex * pageSize + 1} to {Math.min((pageIndex + 1) * pageSize, table.getPrePaginationRowModel().rows.length)} of {table.getPrePaginationRowModel().rows.length} entries
          </div>
          <Pagination
            total={Math.ceil(table.getFilteredRowModel().rows.length / pageSize)}
            initialPage={1}
            page={pageIndex + 1}
            onChange={(page) => table.setPageIndex(page - 1)}
            showControls
            size="sm"
          />
        </div>
      </CardBody>
    </Card>
  );
};
