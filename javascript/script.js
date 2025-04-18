let product = document.getElementById('product');
let price = document.getElementById('price');
let form = document.getElementById('form');
let showData = document.querySelector('#table tbody');
let update = document.getElementById('update');
let food = document.querySelectorAll("input[type='radio']");
let show=JSON.parse(localStorage.getItem("data"))||[];
let edit = -1;

product.focus();
form.addEventListener('submit',(event)=>{
    event.preventDefault();

    let foodValue = '';
    if(food[0].checked){
        foodValue=food[0].value;
        food[0].checked=false;
    }
    else{
        foodValue=food[1].value;
        food[1].checked=false;
    }

    let obj={
        product: product.value,
        price: price.value,
        food: foodValue
 
    }
   
    if(edit==-1){
        show.push(obj);
    }else{
        show[edit]=obj;
        edit=-1;
        update.innerHTML = "submit";
        update.classList.remove('btn-success');
        update.classList.add('btn-primary');
    }
    localStorage.setItem("data",JSON.stringify(show));
    
    product.value = '';
    price.value = '';
    food.value = '';
    product.focus();
    display();
})

const display = () =>{
    showData.innerHTML = '';
    show.map((shows,index)=>{
        let row = document.createElement('tr');
        row.innerHTML = 
        `
            <td>${index+1}</td>
            <td>${shows.product}</td>
            <td>${shows.price}</td>
            <td>${shows.food}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteData(${index})">Delete</button>
                <button class="btn btn-warning" onclick="editData(${index})">Edit</button>
            </td>
        `
          showData.append(row);

    });
}

let deleteData=(index)=>{
    show.splice(index,1);
    localStorage.setItem("data",JSON.stringify(show));
    display();
}

let editData=(index)=>{
    let newuser = show.filter((_,idx)=>idx==index)[0];

    product.value=newuser.product;
    price.value=newuser.price;
    food.value=newuser.food;


    update.innerHTML="Update";
    update.classList.remove('btn-primary');
    update.classList.add('btn-success');
    edit=index;
}
display();


