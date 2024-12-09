// container.innerText="???"; //defer 테스트

// project
// 1. 로그인 유저를 먼저 불러오기(로그인 유저 + 상품리스트,공휴일)
// 2. 그 유저와 관련된 데이터 불러오기(장바구니, 스케줄)

const userList=document.getElementById("userList");
const userInf=document.getElementById("userInf");
const productList=document.getElementById("productList");
const productEx=document.getElementById("productEx");
const userBasTable=document.getElementById("userBasTable");



const loadData=async function(){
    let resArr=await Promise.all([
        fetch("./loginUser.json"),
        fetch("./products.json")
    ]);
    // [res,res] => [res.json(),res.json()] 바꾸는 방법 : map
    // resArr.map((res)=>res.json());
    let objArr=await Promise.all(//resArr.map((res)=>res.json())
        [ // 배열로 object가 들어와 있음
        resArr[0].json(), // fetch("./loginUser.json")의 json
        resArr[1].json() // fetch("./products.json")의 json
    ]
    );
    // console.log((objArr));
    const loginUser=objArr[0];
    const products=objArr[1];


    // 로그인정보 불러오기
    for(let logKey in loginUser){
        let userId=userInf.cloneNode(true);
        userId.removeAttribute("id");
        // console.log(userId);  // html에서 들어가 위치
        //for(let item in loginUser){
            let userNode=userId.querySelector("."+logKey);
            // console.log(userNode); // html에서 들어갈 위치의 하나하나
            userNode.innerText=loginUser[logKey]
            //}
        // console.log(userInf.innerText);
        // console.log(logKey); //key 값
        userList.append(userNode)
        //userInf.append(userNode)
    }


    // 장바구니 불러오기
    // baskets?user_id=me;(정석) => meBaskets.json
    let res=await fetch(`./${loginUser["user_id"]}Baskets.json`); //user_id가 바뀐 폴더가 생성됨.
    console.log(res);
    
    let baskets=await res.json();
    console.log(baskets);
    for(let basKey in baskets){
        let basketEx=userBasketCont.cloneNode(true);
        basketEx.removeAttribute("id");
        console.log(userBasketCont);
        console.log(basketEx); // html에서 들어갈 위치
        let basNode=basketEx.querySelectorAll("tr")
        console.log(basNode[0]); // html에서 들어갈 위치의 하나하나
        console.log(basNode[1]); // html에서 들어갈 위치의 하나하나
        basNode.innerText=baskets[basKey];

    }

    
/*    
    for(let basKey in baskets){
        let basketEx=userBasketCont.cloneNode(true);
        basketEx.removeAttribute("id");
        console.log(basketEx);
        console.log(basKey);
        let basNode=basketEx.querySelector("#"+basKey)

        // basNode.innerText=userBasketCont;

        let basNod=basketEx.querySelector(basKey)
        console.log(baskets);
        console.log(basNod);
/*
        for(let basitem in baskets){
            let basketEx1=userBasketEx.cloneNode(true);
            basketEx1.removeAttribute("id");
            console.log(basketEx1);
            console.log(basitem);
            
            // let basNode=basketEx1.querySelector("."+basitem);
            // console.log(basNode);

        }
*/
        
        // console.log(basKey); // user_id, baskets
        // console.log(baskets); // user_id, baskets
        // basketEx.append(baskets)

        // let basitem=baskets.

        
        // for(let basitem in basKey){
        //     let ba
        // }
        //let basketNode=basketEx.querySelector("."+basKey);
        
    // }






    // 상품 목록 정리
    // console.log(products); // 배열
    products.forEach((p)=>{
        let ex=productEx.cloneNode(true);
        ex.removeAttribute("id");
        for(let proKey in p){
            let produNode=ex.querySelector("." + proKey);
            let form=ex.querySelector(".basketForm");
            if(proKey==="img[src]"){
                produNode.src=p[proKey];
            }else{
                produNode?.append(document.createTextNode(p[proKey]))
                form[proKey].value=p[proKey];
            }
            productList.append(ex);
        }
        // console.log(ex);

        
        
    });
    
    
    

    /*  
    let res=await fetch("./loginUser.json");
    let user=await res.json();
    let res2=await fetch("./products.json");
    let products=await res2.json();
    console.log(user,products); 
    // 동시에 일어나지 않음
    */
}
loadData();

/*
const login=()=>{
    const req=new XMLHttpRequest();
    req.open("GET","./loginUser.json");
    req.send();
    req.onload=()=>{
        if(req.status!==200){
            alert("데이터를 불러오는데 실패! 다시시도!");
            return; 
        } 
        logins=JSON.parse(req.responseText);
        Object.setPrototypeOf(logins,logins.prototype);
        console.log(logins);
        console.log(logins.prototype);

        
        printlogins();
    }
}
*/