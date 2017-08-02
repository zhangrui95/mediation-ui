/**
 * Created by Administrator on 2017/8/1 0001.
 */
import React, { Component, PropTypes } from 'react'
const printLength = 50;
const printPageKey = '@@page';
class PageProContent extends Component {

    static getProCont(content,num){
        const ps = (content||'').split('\n');
        let rowNumLen =1;
        let rowProNum = '';
        const rowsPro = ps.map((i,k)=>{
            let line = '';
            let count = 0;
            let row = 0;
            let inRows = [];
            let chr = '';
            for(let c in i){
                chr = i[c];
                line += chr;
                count += 1;
                if(count >= (row===0?(printLength-2):printLength)){
                    inRows.push(line);
                    line  = '';
                    count = 0;
                    row += 1;
                    rowNumLen+=1;
                    rowProNum = rowNumLen + k;
                    if(rowProNum <= num){
                        if(rowProNum % num === 0) {
                            inRows.push(printPageKey);
                        }
                    }else{
                        if((rowProNum - num)% 44 === 0){
                            inRows.push(printPageKey);
                        }
                    }
                }
            }
            if(line !== ''){
                inRows.push(line);
            }
            return inRows;
        });
        return {rowsPro,rowProNum};
    }

    render() {
        const {rowsPro,content,isPrint} = this.props;
        if(isPrint){
            const cont = (rowsPro||[]).map((i,k)=>
                <div className="content-indent" key={k}>
                    {i.map((r,j)=>
                        (r===printPageKey ?<div key={j}><div className="page-next"></div><div className="page-fixed-height"></div></div>:<p className={j===0?'first-line':''} key={j}>{r}</p>)
                    )}
                </div>
            );
            return <div className="formArch content-indent hidden print-show">{cont}</div>;
        }else{
            const ps = (content||'').split('\n');
            const cont = ps.map((i,k)=><div key={k}>{i}</div>);
            return <div className="no-print">{cont}</div>;
        }
    }
}

PageProContent.propTypes = {
    rowsPro: PropTypes.array,
    content: PropTypes.string,
    isPrint: PropTypes.bool.isRequired
};


export default PageProContent;