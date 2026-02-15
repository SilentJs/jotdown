import { ordersDashboardState } from "../../types";
import recordImageMain from '../../images/recordImageMain.png'
import a4ImageMain from '../../images/a4ImageMain.png'
import { schoolRecordImage } from "../../multiImage";
export const dashboardStateSR:ordersDashboardState={
    imageFunction:schoolRecordImage,
    imageSelected:0,
    image:recordImageMain,
    displayBillList:false,
    type:'Record Notebook',
    notebooktype1:'Thick Notebook',
    notebooktype2:'Thin Notebook',
    isType1Selected:true,
    selectedTypeCost:70,
    type1Cost:70,
    type2Cost:40,
    fullAddress:'',
    noteBookNumber:0,
    pageNumber:0,
    diagramNumber:0
}
export const dashboardStateA4:ordersDashboardState={
    imageFunction:schoolRecordImage,
    imageSelected:0,
    image:a4ImageMain,
    displayBillList:false,
    type:'A4 Assignment',
    notebooktype1:'Stick File',
    notebooktype2:'No Stick File',
    isType1Selected:true,
    selectedTypeCost:15,
    type1Cost:15,
    fullAddress:'',
    type2Cost:0,
    noteBookNumber:0,
    pageNumber:0,
    diagramNumber:0
}