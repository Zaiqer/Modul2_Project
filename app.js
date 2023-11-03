//#region Selectors
const toDoInput = document.getElementById("user-input");
const input = document.querySelector(".input");
const itemList = document.querySelector(".added-items");
const plusBtn = document.getElementById("plus-btn");
const addBtn = document.getElementById("add-btn");
const toDoList = document.getElementById("list");
const sortBtn = document.querySelector(".filter-icon");
const clearInputBtn = document.getElementById("delete-input-text");
const filterBtn = document.querySelector(".filter-icon");
//#endregion

let taskId = 1;

let isSorted = false;

//#region Filter Button
filterBtn.addEventListener("click", function () {
  const items = Array.from(toDoList.children);
  items.sort(function (a, b) {
    if (isSorted) {
      return b.textContent.localeCompare(a.textContent);
    } else {
      const descendingFilterBtnSrc = filterBtn.src;
      const ascendingFilterBtnSrc = "./icons/filter_icon_ascending.svg";
      filterBtn.src = ascendingFilterBtnSrc;
      return a.textContent.localeCompare(b.textContent);
    }
  });

  while (toDoList.firstChild) {
    toDoList.removeChild(toDoList.firstChild);
  }

  items.forEach(function (item) {
    toDoList.appendChild(item);
  });

  isSorted = !isSorted;
});
//#endregion

//#region Filter Buttons' Hover
if (!isSorted) {
  const originalSrcDescFilterBtn = filterBtn.src;
  const replacementSrcDescFilterBtn =
    "./icons/filter_icon_descending_hover.png";

  filterBtn.addEventListener("mouseenter", function () {
    filterBtn.src = replacementSrcDescFilterBtn;
  });

  filterBtn.addEventListener("mouseleave", function () {
    filterBtn.src = originalSrcDescFilterBtn;
  });
} else {
  const originalSrcAscFilterBtn = filterBtn.src;
  const replacementSrcAscFilterBtn = "./icons/filter_icon_ascending_hover.svg";

  filterBtn.addEventListener("mouseenter", function () {
    filterBtn.src = replacementSrcAscFilterBtn;
  });

  filterBtn.addEventListener("mouseleave", function () {
    filterBtn.src = originalSrcAscFilterBtn;
  });
}
//#endregion

//#region Remove Button Hover
const originalSrcClearBtn = clearInputBtn.src;
const replacementSrcClearBtn = "./icons/x_icon_hover.svg";

clearInputBtn.addEventListener("mouseenter", function () {
  clearInputBtn.src = replacementSrcClearBtn;
});

clearInputBtn.addEventListener("mouseleave", function () {
  clearInputBtn.src = originalSrcClearBtn;
});
//#endregion

//#region Add Button
addBtn.addEventListener("click", function () {
  const toDoText = toDoInput.value.trim();

  if (toDoText !== "") {
    const listItem = document.createElement("li");
    listItem.id = taskId;

    listItem.innerHTML = `${toDoText}
  <img class="delete-item" style="height: 20px; width: 20px; transform: translateY(10%); margin-left: 5px" 
  data-id="${taskId}" src="./icons/x_icon.svg" alt="remove_icon">
  `;
    toDoList.appendChild(listItem);
    toDoInput.value = "";
    taskId++;

    const inputClasses = input.classList;
    inputClasses.add("d-none");

    const itemClasses = itemList.classList;
    itemClasses.remove("d-none");

    const deleteBtns = document.querySelectorAll(".delete-item");
    deleteBtns.forEach((btn) => {
      const originalSrcClearBtn = btn.src;
      const replacementSrcClearBtn = "./icons/x_icon_hover.svg";

      btn.addEventListener("mouseenter", function () {
        btn.src = replacementSrcClearBtn;
      });

      btn.addEventListener("mouseleave", function () {
        btn.src = originalSrcClearBtn;
      });
      btn.addEventListener("click", function () {
        const taskId = btn.getAttribute("data-id");
        const listItem = document.getElementById(`${taskId}`);
        if (listItem) {
          listItem.remove();
        }
        if (toDoList.childElementCount == 0) {
          const itemClasses = itemList.classList;
          itemClasses.add("d-none");
        }
      });
    });
  }
});
//#endregion

plusBtn.addEventListener("click", function () {
  const elementClasses = input.classList;
  elementClasses.remove("d-none");
});

clearInputBtn.addEventListener("click", function () {
  toDoInput.value = "";
});
