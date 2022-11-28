//1-عايز انادي على المدخلات 
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
//2-لازم تختبر ا انت جايبهم صح
//console.log(title,price,taxes,ads,discount,total,count,category,submit);


// عندي زرار اضافة منتج هو نفسه تعديل منتج 
let mood = 'make';
// متغير عام بياخد قيمة رقم المنتج اللي هعدله من دالة التحديث
let ProductUpdateIndex; 



// وائف متعلقة باول عملية في ال crud وهي ال make
// first function
//هتاخد السعر والاعلان والضاريب وتحسب التوتال
// name -> get total 
function getTotal(params) {
    // انا عايز الناتج يخرج لو دخلت اي رقم يعني مش لازم ادخل كل الارقام
    // onkeyup="getTotal()" لما تكتب الرقم وتشيل ايدك من على الكيبورد احسب التوتال
    //console.log('done');

    // عايزه يحسسب لما يكون فيه رقم ولابد في السعر ومش مهم الباقي
    if (price.value) {
        //input value is string 
        // ضيف زائد قبل المتير 
        let result = (+price.value + +taxes.value + +ads.value)
         - +discount.value;
        total.innerHTML = result;
        // انا عايز لو فيه ناتج يبقى لونه اخضر لو مفيش يبقى احمر
        total.style.background = '#040';
    }else{
        total.innerHTML = '';
        total.style.background = 'rgb(218, 0, 0)';
    }
    
}





//second function
// بتعملي منتج جديد
// make product 
// لما بتتعامل م داتا اول حاجة تفكر فيها انت هتحفها فين 
// اسهل حاجة تحف فيها داتا المصفوفة لانها بسمحك تعمل حجات كتتير 
//let dataPro = []; //فيه داتا المشروع كله
// حل الخط المنطقي للسطر اللي فوق
let dataPro;
if (localStorage.product) {
    dataPro = JSON.parse(localStorage.product)   
}else{
    dataPro = [];
}


// عايز احفظ الداتا لما اضغط لى زرار make
//  الدالة الرئيسية للمشروع
submit.onclick = function () {
    //هجمع ملعومات المنتج الواحد في كائن
    let newPro = {
        title : title.value,
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value
    }

    if (mood === 'make'){
        if(newPro.count > 1){
            for (let i = 0; i < newPro.count; i++) {
            dataPro.push(newPro); // اضافة منتجات 
            }
        }else { // واحد ظريف كتبلك سالب او صفر 
            dataPro.push(newPro); // اضافة منتج
        }
    }else{
        dataPro[ProductUpdateIndex] = newPro;
        mood = 'make'
        submit.innerHTML = 'make'
        count.style.display = 'block';
    }
    


    //console.log(newPro);
    // احفظ كائنات المستخدم في مصفوفة علشان متضعش
    //dataPro.push(newPro);
    //console.log(dataPro);




    //3rd function 
    //save localstorage
    //لو عملت ريفرش للصفحة الداتا هتروح
    // كمان عايز احفظ البيانات في الاكرة المحلية علشان متضعش
    localStorage.setItem('product', JSON.stringify(dataPro) )
    // الذاكرة مبتاخدش غير نص مش مصفوفة 
    //let dataPro = [];
    //الجافا اسكربت بتقرا من فوق لتحت فلو خزنت حجات في الاكرة وعملت رفرش هتفضل الحجات بس ملف الجافا هيتقرامن الاول 
    // فلما ادخل منتج جديد كله هيتمسح وهيعمل مصفوفة جديدة فاضية 
    // علشان كده لازم الاول اتاكد ان الذاكرة مش فاضية وده خطا منطقي

    clearInputs();
    showData();
}






//4th function 
// اسهل دالة
// لما بدخل منتج وادو عمل المدخلات اللي دخلها المستخدم بتدنها في الصفحة انا عايز اشيلها علشان يعرف يدخل تاني بدل مايقعد يمسح 
//clear inputs
function clearInputs() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    total.innerHTML = '';
    discount.value = '';
    count.value = '';
    category.value = '';
}







// وظائف متعلقة بثاني عملية في ال crud وهي ال read
//اني بعد ماعمل منتج واخزنه عايز اقرأه او اعرضه في الجدول في الصفحة بتاعتي 
//امتع دالة
//read
function showData() 
{
    getTotal();
    // لان الدالة هتشتغل اول مادوس على عمل منتج يبقى خدها وروح نادي عليها من هناك
    let table = '';
    // لو عندك مصفوفة فيها داتا لازم تعمل لووووب
    for (let i = 0; i < dataPro.length; i++) {
        
        //product = dataPro[i]; 
        table += 
        `
                            <tr>
                                <td>${i}</td>
                                <td>${dataPro[i].title}</td>
                                <td>${dataPro[i].price}</td>
                                <td>${dataPro[i].taxes}</td>
                                <td>${dataPro[i].ads}</td>
                                <td>${dataPro[i].discount}</td>
                                <td>${dataPro[i].total}</td>
                                <td>${dataPro[i].category}</td>
                                <td><button onclick="updatePro(${i})" id="update">update</button></td>
                                <td><button onclick="deletePro(${i})" id="delete">delete</button></td>
                            </tr>
        
        `
    }
    document.getElementById('tbody').innerHTML = table;
    
    
    
    // دي الوظيفة اللي شغالة على طول 
    // هخليها تعرض زرار حذف الكل لو فيه بيانات
    let deleteAll = document.getElementById('deleteAll');
    if (dataPro.length > 0) {
        deleteAll.innerHTML = `<button onclick="deleteAll()">delete All (${dataPro.length})</button>`;
    }
    else
    {
        deleteAll.innerHTML = ''
    }

}
showData(); 
//عايز اشغل الدالة دي على طول سواء بد مااعمل عمل او لما اعيد الصفحة 
// المنتجات ظاهرة على طول حتى لو حصل ريفرش







//delete only on product
// لازم تمرر لدالة الحف المنتج اللي انت عايز تمسحه
function deletePro(i)
{
    //console.log(i);
    dataPro.splice(i,1) // امسح من مكان اي عنصر واحد
    // كده هيمسح من المصفوفة بس 
    // عايز امسحها من الذاكرة كمان 
    // باني اعمل تحديث للذاكرة بالمصفوفة الجديدة 
    localStorage.product = JSON.stringify(dataPro);
    // delete from html 
    // fn that responsible for html is showData
    showData()
}


//deleta all
 function deleteAll()
 {
    // الزار مش موجود لو فيه بيانات 
    // هعمله فوق الجدول بحجز دف له واضيف الزرار بالجافا 
    // لازم تاخد بالك ان الذاكرة والقراية بتاخد من المصفوفة 
    // وبالتالي لو حذفت العناصر من الذاكرة هتفضل معروضة على لموقع 
    localStorage.clear();
    dataPro.splice(0);
    // يبقى هحذف الاكرة والمصفوفة واحدث القراية
    showData()
 }



//وظيفة لو فيه عدد يعملهم 
//count




//update
// عايز ارفع منتجات المنتج عشان اعدلهم وبعدين اعمل تحديث فيحدث
function updatePro (i){
   // console.log(i);
   title.value = dataPro[i].title;
   price.value = dataPro[i].price;
   taxes.value = dataPro[i].taxes;
   ads.value = dataPro[i].ads;
   discount.value = dataPro[i].discount;
   category.value = dataPro[i].category;
   //بشغل الدالة دي برده علشان اعرف الكلي علشان متبقاش فاضية 
   getTotal();
   // مش محتاج مكان العداد
   count.style.display = 'none';
   // هنغير الزرار make -> update
   submit.innerHTML = 'Update';
   // لما ادوس على زرار التحديث اغير الموود واخليه تحديث
   mood = 'update';
   ProductUpdateIndex = i;
    scroll({
        top:0,
        behavior:"smooth"
    })



}






//search


// مش عايز يكن فيه مدخل فاضي او بيانات مش عايزها تدخل
//claen data


