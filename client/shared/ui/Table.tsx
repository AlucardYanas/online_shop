import { Table as MUITable, TableBody, TableCell, TableHead, TableRow, TableProps } from '@mui/material';

interface TableColumn {
  label: string;
  key: string;
}

interface TablePropsExtended extends TableProps {
  columns: TableColumn[];
  data: Record<string, any>[];
}

const Table = ({ columns, data, ...props }: TablePropsExtended) => {
  return (
    <MUITable {...props}>
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell key={column.key}>{column.label}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((column) => (
              <TableCell key={column.key}>{row[column.key]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </MUITable>
  );
};

export default Table;
