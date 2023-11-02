const displayBtn =document.getElementById("display-btn");
const sortingCard=document.getElementsByClassName("sorting-card")[0];
displayBtn.addEventListener("click",()=>{ 
    if(sortingCard.style.display==="flex"){
        sortingCard.style.display="none";
    }else{
        sortingCard.style.display="flex"
    }
})

const sortBtn =document.getElementById('sort-btn');
sortBtn.addEventListener("click",()=>{
    sortingCard.style.display="none";
    let group=document.getElementById('groupingOn');
    let order=document.getElementById('orderingOn');

    if(group.value==='status'){
        sortOnStatus(order.value);
    }
    else if(group.value==='user'){
        sortOnUser(order.value)
    }
    else{
        sortOnPriority(order.value)
    }
})


let color = {
    "usr-1": "red",
    "usr-2": "dodgerblue",
    "usr-3": "skyblue",
    "usr-4": "orange",
    "usr-5": "brown",
  };

 let task = {
    Backlog: "pending",
    Todo: "circle",
    Inprogress: "tonality",
    Done: "check_circle",
    Cancelled: "cancel",
  };
const endpoint = "https://api.quicksell.co/v1/internal/frontend-assignment";