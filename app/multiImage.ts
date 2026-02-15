import schoolRecordImg1 from './images/recordImageMain.png'
import schoolRecordImg2 from './images/image1.png'
import schoolRecordImg3 from './images/image2.png'
import schoolRecordImg4 from './images/image3.png'

export function schoolRecordImage(number:number){
    const imageCollection = [schoolRecordImg1,schoolRecordImg2,schoolRecordImg3,schoolRecordImg4]
    return imageCollection[number]
}