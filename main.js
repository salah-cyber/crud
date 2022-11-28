let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let search = document.getElementById('search');
let mood = 'add';
let ProductUpdateIndex; 


function getTotal(params) {
    if (price.value) {
        let result = (+price.value + +taxes.value + +ads.value)
         - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }else{
        total.innerHTML = '';
        total.style.background = 'rgb(218, 0, 0)';
    }
}


let dataPro;
if (localStorage.product) {
    dataPro = JSON.parse(localStorage.product)   
}else{
    dataPro = [];
}



submit.onclick = function () {
    let newPro = {
        title : title.value.toLowerCase(),
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value.toLowerCase()
    }
    if (title.value 
        && price.value 
        && category.value
        && count.value < 100) {
        if (mood === 'add'){
            if(newPro.count > 1){
                for (let i = 0; i < newPro.count; i++) {
                dataPro.push(newPro); 
                }
            }else { 
                dataPro.push(newPro); 
            }
        }else{
            dataPro[ProductUpdateIndex] = newPro;
            mood = 'add'
            submit.innerHTML = 'add'
            count.style.display = 'block';
        }
        clearInputs();
    }
    localStorage.setItem('product', JSON.stringify(dataPro) )
    showData();
}





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








function showData() 
{
    getTotal();
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table +=  ` <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updatePro(${i})" id="update">update</button></td>
                        <td><button onclick="deletePro(${i})" id="delete">delete</button></td>
                    </tr> `
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







function deletePro(i)
{
    dataPro.splice(i,1)
    localStorage.product = JSON.stringify(dataPro);
    showData()
}


 function deleteAll()
 {
    localStorage.clear();
    dataPro.splice(0);
    showData()
 }



function updatePro (i){
   title.value = dataPro[i].title;
   price.value = dataPro[i].price;
   taxes.value = dataPro[i].taxes;
   ads.value = dataPro[i].ads;
   discount.value = dataPro[i].discount;
   category.value = dataPro[i].category;
   getTotal();
   count.style.display = 'none';
   submit.innerHTML = 'Update';
   mood = 'update';
   ProductUpdateIndex = i;
    scroll({
        top:0,
        behavior:"smooth"
    })



}





let searchMood = 'title';
function getSearchMood(id){
    if (id === 'searchTitle') {
        searchMood = 'title';
    }else{
        searchMood = 'category';
    };
    search.placeholder = 'search by '+ searchMood;
    search.focus();
    search.value = "";
    showData();
}





function searchData(value) {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
    if (searchMood == 'title') {
        if(dataPro[i].title.includes(value.toLowerCase())){
        table +=   `<tr>
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
                    </tr>`
        }
    }else{     
        if(dataPro[i].category.includes(value.toLowerCase())){
           table += `<tr>
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
                    </tr>`
        }
    }
    document.getElementById('tbody').innerHTML = table;
    }
}

