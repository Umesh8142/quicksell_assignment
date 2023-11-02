function sortOnUser(order) {
  let result;
  async function fetchAuctionDetails() {
    try {
      const response = await fetch(endpoint);
      result = await response.json();
      const container = document.getElementById("main-container");
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      let { tickets, users } = result;
      if (order == "priority")
        tickets.sort((a, b) => {
          return b.priority - a.priority;
        });
      else if (order == "title") {
        tickets.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
      }
      users.forEach((element) => {
        const words = element.name.split(" ");
        let active;
        if (element.available) {
          active = "green";
        } else {
          active = "lightgray";
        }
        let nickName = words[0][0].toUpperCase();
        if (words.length > 1) {
          nickName += words[1][0].toUpperCase();
        }
        const box = document.createElement("div");
        box.className = "box";
        box.id = element.id;
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
          if (box.id == "COMPLETED") {
            activeDraggedEle.draggable = false;
            e.status = "COMPLETED";
          }
          //  let child=activeDraggedEle.children[2].children[1];
          //  child.innerText=box.children[0].children[0].innerText;
          box.appendChild(activeDraggedEle);
        });
        box.innerHTML = `<div class="title-container">
                            <div class="title">
                            <div id="name">
                            <p class="assignee" data-short-name="${nickName}" style="background-color:${
          color[element.id]
        }"></p>
                              <p id="online" style="background-color:${active}"></p>
                              </div>
                                <span>${element.name}</span>
                                <span>${box.children.length}</span>
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
        const box = document.getElementById(`${element.userId}`);
        const card = document.createElement("div");
        let status = task[element.status];
        if (element.status === "In progress") {
          status = "tonality";
        }
        card.className = "card";
        card.addEventListener("dragstart", () => {
          activeDraggedEle = card;
        });
        element.status !== "Done" && (card.draggable = "true");
        card.innerHTML = `<div class="head"><span>${element.id}</span>
        </div>
        <div id="taskName">
            <span class="material-symbols-outlined">
                ${status}
            </span>
            <p class="Task-Name">${element.title}</p>
        </div>
        <div class="status-container">

            <span class="material-symbols-outlined" id="dots">
                more_horiz
            </span>
            <div class="status">
                <div id="circle"> </div> <span>${element.tag[0]}</span>
            </div>

        </div>`;

        box.appendChild(card);
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  fetchAuctionDetails();
}
