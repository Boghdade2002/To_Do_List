// اختيار العناصر من DOM
const input = document.querySelector('.form__input');
const ul = document.querySelector('.toDoList');
const removedList = document.getElementById('removedList');

// استرجاع العناصر من localStorage عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  loadToDoItems(); // تحميل قائمة الـ ToDo
  loadRemovedItems(); // تحميل قائمة العناصر المحذوفة
});

// إضافة حدث النقر على زر الإضافة
document.querySelector('.button').addEventListener('click', addItem);

// إضافة حدث النقر على قائمة الـ ToDo
ul.addEventListener('click', e => {
  let li = e.target; // العنصر الذي تم النقر عليه
  let toDoItem = li.innerText; // نص العنصر

  removeItemFromDOM(li); // حذف من واجهة المستخدم
  removeItemFromArray(toDoItem); // حذف من المصفوفة
  removeItemFromStorage(toDoItem); // حذف من localStorage
  addToRemovedList(toDoItem); // إضافة إلى قائمة العناصر المحذوفة
});

// دالة لإضافة عنصر جديد
function addItem() {
  const toDoItem = input.value.trim();
  if (toDoItem) {
    // إضافة العنصر إلى الـ DOM
    const li = document.createElement('li');
    li.innerText = toDoItem;
    ul.appendChild(li);
    
    // تخزين العنصر في localStorage
    storeItemInStorage(toDoItem);

    // مسح حقل الإدخال
    input.value = '';
  }
}

// دالة لتخزين العنصر في localStorage
function storeItemInStorage(item) {
  let items = JSON.parse(localStorage.getItem('toDoItems')) || [];
  items.push(item);
  localStorage.setItem('toDoItems', JSON.stringify(items));
}

// دالة لتحميل العناصر من localStorage
function loadToDoItems() {
  const items = JSON.parse(localStorage.getItem('toDoItems')) || [];
  items.forEach(item => {
    const li = document.createElement('li');
    li.innerText = item;
    ul.appendChild(li);
  });
}

// دالة لتحميل العناصر المحذوفة من localStorage
function loadRemovedItems() {
  const removedItems = JSON.parse(localStorage.getItem('removedItems')) || [];
  removedItems.forEach(item => {
    addToRemovedList(item);
  });
}

// دالة لإزالة العنصر من واجهة المستخدم
function removeItemFromDOM(li) {
  li.remove();
}

// دالة لإضافة العنصر المحذوف إلى قائمة منفصلة
function addToRemovedList(item) {
  const li = document.createElement('li');
  li.innerText = item;
  removedList.appendChild(li);

  // تخزين العنصر المحذوف في localStorage
  storeRemovedItemInStorage(item);

  // إضافة حدث لحذف العنصر من القائمة المحذوفة عند النقر عليه
  li.addEventListener('click', () => {
    li.remove();
    removeItemFromStorage(item); // حذف من localStorage
  });
}

// دالة لتخزين العناصر المحذوفة في localStorage
function storeRemovedItemInStorage(item) {
  let removedItems = JSON.parse(localStorage.getItem('removedItems')) || [];
  removedItems.push(item);
  localStorage.setItem('removedItems', JSON.stringify(removedItems));
}

// دالة لإزالة العنصر من المصفوفة
function removeItemFromArray(toDoItem) {
  let items = JSON.parse(localStorage.getItem('toDoItems')) || [];
  items = items.filter(item => item !== toDoItem);
  localStorage.setItem('toDoItems', JSON.stringify(items));
}

// دالة لحذف العنصر من localStorage
function removeItemFromStorage(item) {
  let items = JSON.parse(localStorage.getItem('removedItems')) || [];
  items = items.filter(i => i !== item);
  localStorage.setItem('removedItems', JSON.stringify(items));
}
