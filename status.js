function sortOnStatus(order) {
  let result;
  async function fetchAuctionDetails() {
    try {
      const response = await fetch(endpoint);
      result = await response.json();
      let { tickets, users } = result;
      const container = document.getElementById("main-container");
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      if (order == "priority")
        tickets.sort((a, b) => {
          return b.priority - a.priority;
        });
      else if (order == "title") {
        tickets.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
      }

      statusObj.forEach((element) => {
        const box = document.createElement("div");
        box.className = "box";
        box.id = element[0].replace(" ","");
        box.addEventListener("dragenter", () => {
          box.classList.add("active-box");
        });
        box.addEventListener("dragleave", () => {
          box.classList.remove("active-box");
        });
        box.addEventListener("dragover", (e) => {
          e.preventDefault();
        });
        box.addEventListener("drop", (e) => {
          e.preventDefault();
          if (box.id == "Done") {
            activeDraggedEle.draggable = false;
            e.status = "Done";
          }
          //  let child=activeDraggedEle.children[2].children[1];
          //  child.innerText=box.children[0].children[0].innerText;
          box.appendChild(activeDraggedEle);
        });
        box.innerHTML = `<div class="title-container">
                            <div class="title">
                                  <span class="material-symbols-outlined" style="color: ${element[3]};">
                                    ${element[1]}
                                  </span> 
                                  <span>${element[2]} </span>
                                <span id="count">0</span>
                            </div>
                            <div id="addIcon">
                                <button id="create-issue">
                                    <span class="material-symbols-outlined">
                                        add
                                    </span>
                                </button>
                                <span class="material-symbols-outlined icon">
                                    more_horiz
                                </span>
                            </div>
                        </div>`;
        container.append(box);
      });
      tickets.forEach((element) => {
        const card = document.createElement("div");
        card.className = "card";
        card.addEventListener("dragstart", () => {
          activeDraggedEle = card;
        });
        element.status !== "Done" && (card.draggable = "true");
        users.forEach((username) => {
          let active;
          if (username.available) {
            active = "green";
          } else {
            active = "lightgray";
          }
          const words = username.name.split(" ");
          let nickName = words[0][0].toUpperCase();
          if (words.length > 1) {
            nickName += words[1][0].toUpperCase();
          }
          if (username.id === element.userId) {
            card.innerHTML = `<div class="head">
                                <span>${element.id}</span>
                                <div id="name">
                                <p class="assignee" data-short-name="${nickName}" style="background-color:${
              color[username.id]
            }"></p>
                                  <p id="online" style="background-color:${active}"></p>
                                  </div>
                            </div>
                            <div>
                                <p class="Task-Name">${element.title}</p>
                            </div>
                            <div class="status-container">
                        
                                <span class="material-symbols-outlined" id="dots">
                                    more_horiz
                                </span>
                                <div class="status">
                                    <div id="circle"> </div> <span>${
                                      element.tag[0]
                                    }</span>
                                </div>
                        
                            </div>`;
          }
        });
        let status = `${element.status}`;
        const Container = document.getElementById(status.replace(" ",""));
        Container.appendChild(card);
        const count=document.querySelector(`#${Container.id} #count`);
        count.innerText=Container.children.length-1;
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  fetchAuctionDetails();
}
