const basketCont = document.querySelector("#basketCont");
const totalPriceB = document.querySelector("#totalPriceB");
const loadBasketsBtn = document.querySelector("#loadBasketsBtn");
const basketEx = document.querySelector("#basketEx")
let basketsObj; //화면이 로딩되면 ajax 불러오는 장바구니 리스트

//BasketsObj {999:{num:999,title:"버터",..},totla:11000}
// function BasketsObj(){
// }
// BasketsObj.prototype.setBasket=function(basket){ //this
//     this[basket.num]=basket;
//     this.total+=basket.total;
// }
class BasketsObj{
    setBasket(basket){        
        if(basket.num in this){
            alert("장바구니에 이미 존재합니다.")
        }else{
            this[basket.num]=basket;
            this.total+=basket.total;
        }
    }
    delBasket(num){
        if(num in this){
            this.total-=this[num].total;
            delete this[num];
        }else{
            alert("이미 삭제된 상품입니다.");
        }
    }
}
function Basket(form){
    this.num=Number(form.num.value);
    this.price=Number(form.price.value);
    this.cnt=Number(form.cnt.value);
    this.title=form.title.value;
    this.total=this.cnt*this.price;
}
//장바구니에 물건이 담길때 실행
const submitHandeler = function (e) {
    e.preventDefault();
    let basket=new Basket(this);
    basketsObj.setBasket(basket);
    printBasketsObj();
}
//장바구니를 출력하는 함수(화면이 로딩되면,장바구니에 물건이 담길 때, 장바구니가 삭제될 때 )
const printBasketsObj=()=>{
    basketCont.innerHTML = "";
    for (let num in basketsObj) {
        if(isNaN(num)) continue; 
        let basket = basketsObj[num];
        let tr = basketEx.cloneNode(true);
        tr.removeAttribute("id")
        for (let key in basket) {
            let td = tr.querySelector("." + key);
            td.append(document.createTextNode(basket[key]));
        }
        let delBtn=tr.querySelector(".delBtn");
        delBtn.dataset.num=basket.num; //data-num=3        
        delBtn.onclick=(e)=>{
            let delNum=e.target.dataset.num;
            basketsObj.delBasket(delNum);
            printBasketsObj();
        };
        basketCont.append(tr);
    }
    totalPriceB.innerText = basketsObj["total"];
}

//비동기식으로 장바구니 내역을 받아오는 함수
const loadBasketsFunc = () => {
    const req = new XMLHttpRequest();
    req.open("GET", "./l19baskets.json");
    req.send();
    req.onload = () => {
        if (req.status !== 200) {
            alert("장바구니 요청에 실패했습니다.");
            return;
        }
        basketsObj = JSON.parse(req.responseText); //{}Object의 프로토타입에 setBaset 함수를 정의
        //basketsObj.__proto__.setBasket=setBasket;//Object 프로토타입에 필드를 재정의하지 않는 것이 좋다. 
        //basketsObj.__proto__=BasketsObj.prototype;
        Object.setPrototypeOf(basketsObj,BasketsObj.prototype);
        
        for (let num in basketsObj) {
            //if(num==="total") continue;
            if(isNaN(num)) continue; //break : 반복문 전체를 멈추는 것, continue 반복문의 해당 구문만 넘기는 것
            let basket = basketsObj[num];
            delete basketsObj[num];
            num = Number(num);
            basketsObj[num] = basket;
            //정렬을 위해 key 를 수로 바꾸는 중
        }
        printBasketsObj();
    }
}
loadBasketsBtn.onclick = loadBasketsFunc;

const loadProductsBtn = document.getElementById("loadProductsBtn");
const productList = document.getElementById("productList");
const productEx = document.getElementById("productEx");
const loadProducts = () => {
    const req = new XMLHttpRequest();
    req.open("GET", "./l18products.json");
    req.send();
    req.onload = () => {
        if (req.status !== 200) {
            alert("데이터를 불러오는데 실패! 다시시도!");
            return;
        }
        let products = JSON.parse(req.responseText);
        products.forEach((p) => {
            let ex = productEx.cloneNode(true);
            ex.removeAttribute("id");
            for (let key in p) {
                let node = ex.querySelector("." + key);
                let form = ex.querySelector(".basketForm");
                if (key === "img[src]") {
                    node.src = p[key];
                } else {
                    node?.append(document.createTextNode(p[key]))
                    form[key].value = p[key];
                }
                form.onsubmit = submitHandeler;
            }
            productList.append(ex);
        });
    }

}
loadProductsBtn.onclick = loadProducts;

loadProducts();
loadBasketsFunc();

