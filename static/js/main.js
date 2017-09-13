// 
// 生成常见疾病列表
var diseaseArray = ['耳聋','癫痫','白内障','视网膜炎','并指','多指','肌无力','腓骨肌萎缩症','免疫缺陷','贫血','糖尿病','心肌病','鱼鳞癣','痴呆','智力障碍','精神发育迟滞','自闭症'];
var diseaseList = document.getElementById('diseaseList');
for ( var i=0; i<diseaseArray.length; i++ ) {
  diseaseName = diseaseArray[i];
  var a = document.createElement('a');
  a.innerHTML = diseaseName;
  diseaseList.appendChild(a);
  diseaseList.append(', ');
}
// 监听鼠标点击事件
$('#diseaseList a').click(function(){
  // console.log($(this).text());
  $('#disease').val($(this).text());
  $('#search-btn').click();
});

// 添加疾病名映射
var map_disease = {
    "epilepsy":"癫痫",
    "羊角风":"癫痫",
    "羊癫疯":"癫痫",
    "deafness":"耳聋",
    "遗传性耳聋":"耳聋",
    "cataract":"白内障",
    "retinitis":"视网膜炎",
    "syndactyly":"并指",
    "polydactyly":"多指",
    "六指症":"多指",
    "myasthenia":"肌无力",
    "Charcot-Marie-Tooth":"腓骨肌萎缩症",
    "CMT":"腓骨肌萎缩症",
    "immunodeficiency":"免疫缺陷",
    "anemia":"贫血",
    "diabetes mellitus":"糖尿病",
    "DM":"糖尿病",
    "myocardiopathy":"心肌病",
    "cardiomyopathy":"心肌病",
    "ichthyosis":"鱼鳞癣",
    "dementia":"痴呆",
    "mental retardation":"智力障碍",
    "MR":"智力障碍",
    "智力缺陷":"智力障碍",
    "智能障碍":"智力障碍",
    "傻":"智力障碍",
    "mental retardation":"精神发育迟滞",
    "autistic disorder":"自闭症",
    "autism":"自闭症"
};

for (var key in map_disease) {
  diseaseArray.push(key);
}  

// 疾病名称自动补全
var autoComplete = new AutoComplete("disease","auto",diseaseArray);
document.getElementById("disease").onkeyup = function(event){
  autoComplete.start(event);
}