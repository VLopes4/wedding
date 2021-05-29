import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export function ExportExcel(data: any[], fileName: string){
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(excelData, fileName + fileExtension);
}