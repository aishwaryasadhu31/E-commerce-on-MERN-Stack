
class ApiFilter{
    constructor(query,queryStr){
        this.queryStr=queryStr
        this.query=query
    }

    search(){
        let keyword=this.queryStr.keyword
       ? {
            name:{
                $regex:this.queryStr.keyword,
                $options:"i",

            }
        }
        :{};

        this.query=this.query.find({...keyword})
        return this;
    }

    filters()
    {
        const queryCopy={...this.queryStr}

        const fieldsToRemove = ["keyword", "page"];
        fieldsToRemove.forEach((el) => delete queryCopy[el]);

        let queryStr=JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
      
        this.query=this.query.find(JSON.parse(queryStr))
      
        return this;


    }

    pagination(prodPerPage)
    {
        const curPage=Number(this.queryStr.page) || 1;
        const prodToSkip=prodPerPage*(curPage-1)
        this.query=this.query.limit(prodPerPage).skip(prodToSkip)
        return this;
    }
}


export default ApiFilter;
