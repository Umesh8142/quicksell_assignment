function sortOnStatus(order) {
  let result;
  async function fetchAuctionDetails() {
    try {
      const response = await fetch(endpoint);
      result = await response.json();
      let { tickets, users } = result;
      console.log(tickets,users)
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
        box.id = element[0];
        console.log(element)
        box.innerHTML = `<div class="title-container">
                            <div class="title"><span class="material-symbols-outlined" style="color: ${element[3]};">
                                    ${element[1]}
                                </span> <span>${element[2]} </span>
                                <span>1</span>
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
        const backLogContainer = document.getElementById(status);
        backLogContainer.appendChild(card);
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  fetchAuctionDetails();
}
