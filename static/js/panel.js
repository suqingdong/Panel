// bind enter key on input filed
var bindEnter = function() {
        var searchButton = document.getElementById('search-btn');
        if( event.keyCode === 13 ) {
            searchButton.click();
        }
    };


// var map_disease = {
//     "羊角风":"癫痫",
//     "羊癫疯":"癫痫",
//     "epilepsy":"癫痫",
//     "遗传性耳聋":"耳聋",
//     "傻":"智力障碍"
// };


// 获取输入值，调用搜索函数
var search = function () {
    var disease = document.getElementById('disease').value;
    disease = map_disease[disease] || disease;
    data.search(disease);
}


// 从data.js中搜索疾病名
data.search = function(name) {
    var geneItem = document.getElementById('gene-item');
    var geneDetail = document.getElementById('gene-detail');
    var diseaseName = document.getElementById('disease-name');
    var diseaseDetail = document.getElementById('disease-detail');
    clearHTML([diseaseName,diseaseDetail,geneItem,geneDetail]);
    var foundDisease = false;
    
    for ( var disease in this ) {
        if ( disease === name ) {
            foundDisease = true;
            diseaseName.innerHTML = disease;
            diseaseDetail.innerHTML = this[disease]['描述'];

            var item = document.createElement('th');
            item.innerHTML = 'Gene';
            geneItem.appendChild(item);

            var addedHeader = false
            for ( var gene in this[disease]['基因'] ) {
                // 表头只添加一次
                if ( ! addedHeader ) {
                    for ( var item in this[disease]['基因'][gene] ) {
                        var th = document.createElement('th');
                        th.innerHTML = item;
                        geneItem.appendChild(th);
                        addedHeader = true;
                    };
                };
                // 新建tr, td元素， 每次appendChild都需要新建
                // 保留Phenotype列不为空的行
                if ( this[disease]['基因'][gene]['Phenotype'] ) {
                // if ( true ) {
                    var tr = document.createElement('tr');
                    var td = document.createElement('td');
                    td.innerHTML = gene;
                    tr.appendChild(td);
                    
                    for ( var item in this[disease]['基因'][gene] ) {
                        var td = document.createElement('td');

                        if ( ["NCBI","OMIM","PMID"].indexOf(item) != -1 ) {
                            id = this[disease]['基因'][gene][item];
                            addLink(item, id, td);

                        } else {                    
                            td.innerHTML = this[disease]['基因'][gene][item];
                        };
                        tr.appendChild(td);
                    };
                    geneDetail.appendChild(tr);
                };
            };
        };
    };
    if ( ! foundDisease ) {
        clearHTML([diseaseName,diseaseDetail,geneItem,geneDetail]);
        diseaseName.innerHTML = '没有发现该疾病名: '+name;
    };
};


var map_web = {
    "NCBI":"https://www.ncbi.nlm.nih.gov/gene/",
    "OMIM":"https://omim.org/entry/",
    "PMID":"https://www.ncbi.nlm.nih.gov/pubmed/"
};

// 增加NCBI，OMIM链接, href=map_web[web]+value
var addLink = function (web, id, element) {
    var idList = id.split('；');
    for ( var i=0; i<idList.length; i++ ) {
        var a = document.createElement('a');
        if ( i < idList.length-1 ) {
            a.innerHTML = idList[i]+" ";
        } else {
            a.innerHTML = idList[i];
        };
        a.href = map_web[web]+idList[i];
        a.target = "_blank";
        element.appendChild(a);
    };

};


// 清空内容
var clearHTML = function (nodes) {
    for ( var i=0; i<nodes.length; i++ ) {
        nodes[i].innerHTML = '';
    };
};