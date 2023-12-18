function arraySlice(arr:Array<any>, chunkSize:number) {
    let slicedArr:Array<any> = [];
    for(let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        slicedArr = [...chunk]
    }
    return slicedArr;
}

export default arraySlice;