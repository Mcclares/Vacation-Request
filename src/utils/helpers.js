export function getCursorStyle(column, row) {
    if(!row || !column.dataKey || !(column.dataKey in row)) {
        return "default";
    }
    const cellValue = row[column.dataKey];
    if (column.dataKey === 'comment' && cellValue && cellValue.trim() !== '') {
        return 'pointer';
    }
    return 'default';
}