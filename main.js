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



// وائف متعلقة باول عملية في ال crud وهي ال create
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
    //console.log(newPro);
    // احفظ كائنات المستخدم في مصفوفة علشان متضعش
    dataPro.push(newPro);
    //console.log(dataPro);
    //لو عملت ريفرش للصفحة الداتا هتروح
    // كمان عايز احفظ البيانات في الاكرة المحلية علشان متضعش
    localStorage.setItem('product', JSON.stringify(dataPro) )
    // الذاكرة مبتاخدش غير نص مش مصفوفة 
    //let dataPro = [];
    //الجافا اسكربت بتقرا من فوق لتحت فلو خزنت حجات في الاكرة وعملت رفرش هتفضل الحجات بس ملف الجافا هيتقرامن الاول 
    // فلما ادخل منتج جديد كله هيتمسح وهيعمل مصفوفة جديدة فاضية 
    // علشان كده لازم الاول اتاكد ان الذاكرة مش فاضية وده خطا منطقي


}




//3rd function 
//save localstorage


//4th function 
// لما بدخل منتج وادو عمل المدخلات اللي دخلها المستخدم بتدنها في الصفحة انا عايز اشيلها علشان يعرف يدخل تاني بدل مايقعد يمسح 
//clear inputs


// وظائف متعلقة باول عملية في ال crud وهي ال read
//first function
//اني بعد ماعمل منتج واخزنه عايز اعرضه في الجدول في الصفحة بتاعتي 
//read


//وظيفة لو فيه عدد يعملهم 
//count


//delete

//update

//search


// مش عايز يكن فيه مدخل فاضي او بيانات مش عايزها تدخل
//claen data


