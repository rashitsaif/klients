import type { ReactNode } from 'react';

export interface TableColumn<T extends object> {
  key: keyof T;
  label: string;
}

export interface TableProps<T extends object> {
  columns: TableColumn<T>[];
  emptyMessage?: string;
  rows: T[];
}

function Table<T extends object>({ columns, emptyMessage = 'Данных пока нет.', rows }: TableProps<T>) {
  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-700 p-6 text-center text-sm text-slate-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800">
      <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
        <thead className="bg-slate-900 text-slate-400">
          <tr>
            {columns.map((column) => (
              <th className="px-4 py-3 font-semibold" key={String(column.key)}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 bg-slate-950 text-slate-200">
          {rows.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td className="px-4 py-3" key={String(column.key)}>
                  {row[column.key] as ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
