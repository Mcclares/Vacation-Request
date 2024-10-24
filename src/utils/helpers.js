export function getCursorStyle(column, row) {
    const cellValue = row[column.dataKey];
    if (column.dataKey === 'comment' && cellValue && cellValue.trim() !== '') {
        return 'pointer';
    }
    return 'default';
}