function sortOnPriority(order) {
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
      let priority = [
        ["signal_cellular_0_bar", "No Priorty"],
        ["signal_cellular_0_bar", "Low"],
        ["signal_cellular_2_bar", "Medium"],
        ["signal_cellular_2_bar", "High"],
        ["warning", "Urgent"],
      ];
      priority.forEach((element) => {
        const box = document.createElement("div");
        box.className = "box";
        box.id = element[1];
        box.innerHTML = `<div class="title-container">
                            <div class="title">
                            <span class="material-symbols-outlined">
                            ${element[0]}
                            </span>
                                <span>${element[1]}</span>
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
        const card = document.createElement("div");
        card.className = "card";
        let status = task[element.status];
        if (element.status === "In progress") {
          status = "tonality";
        }
        users.forEach((username) => {
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
                                    <p id="online" style="background-color:green"></p>
                                    </div>
                              </div>
                              <div id="taskName">
                                    <span class="material-symbols-outlined">
                                        ${status}
                                    </span>
                                  <p class="Task-Name">${element.title}</p>
                              </div>
                              <div class="status-container">
                                  <div class="status">
                                      <div id="circle"> </div> <span>${
                                        element.tag[0]
                                      }</span>
                                  </div>
                              </div>`;
          }
        });
        let p = element.priority;
        const backLogContainer = document.getElementById(priority[p][1]);
        backLogContainer.appendChild(card);
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  fetchAuctionDetails();
}
