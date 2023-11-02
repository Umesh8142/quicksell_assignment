function sortOnStatus(order) {
  let result;
  async function fetchAuctionDetails() {
    try {
      const response = await fetch(endpoint);
      result = await response.json();
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
      const card=document.querySelectorAll(".card");
      card.forEach(function(div) {
        if(div)
          div.parentNode.removeChild(div);
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
