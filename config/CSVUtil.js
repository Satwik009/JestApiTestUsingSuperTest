var fs = require('fs');
var csv = require('fast-csv');
var csvData = new Array();

class CSVUtil {

    async ReadCSVData(){
        var fileContent;
        return new Promise(function(resolve) {
            fileContent = fs.readFileSync('Data//TestData.csv', {encoding: 'utf8'});            
            resolve(fileContent);
        })
    }

    async testData() {
        var fileContent = await this.ReadCSVData()         
        var dataNew = [];
        var data = fileContent.split("\r\n"); 
        console.log("after split \n "+data)     
        for(var i=0; i<data.length; i++)  {  
            var array = [];     
            var data1 = data[i].split(",")
            dataNew.push(data1)
        }    
        return dataNew;
    }

    async returnDataArray() {
        csvData = await this.testData();
        var dataFound = csvData[0];
        let pets = new Array();

        //Read only first record from Double Dimensional Array
        for(var i=0;i<1;i++)
        {
            pets = dataFound[1].split("|");
            console.log("Pets Are:"+pets);
        }

        return pets;
    }

    async readStatusCode() {
        // var dataNew = await this.testData();
        var dataFound = csvData[0];
        let petStatus;

        //Read only first record from Double Dimensional Array
        for(var i=0;i<1;i++)
        {
            petStatus = dataFound[3];
        }

        return petStatus;
    }

    async readRequestType() {
        // var dataNew = await this.testData();
        var dataFound = csvData[0];
        let requestType;

        //Read only first record from Double Dimensional Array
        for(var i=0;i<1;i++)
        {
            requestType = dataFound[0];
        }

        return requestType;
    }

    async readExcelRowData() {
        // var rowSet = await this.readExcelFile();
        //Remove Header Row and return row array
        var rowSet = excelReader('Data/TestData.Get.xlsx');
        rowSet.splice(0,1);
        return rowSet;
    }

    async readExcelFile() {
        var rows;
        return new Promise(function(resolve) {
            rows=excelReader('Data/TestData_Get.xlsx');
            resolve(rows);
        })
        
    }

    async getOneRowData(rowSet, index) {
        var oneRow = rowSet[index];
        return oneRow;
    }
}  
module.exports=CSVUtil;