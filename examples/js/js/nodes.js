'use strict';

// closest
const button = document.querySelector('button');

const form = button.closest('form#form');

// matches
const list = document.querySelector('#list');
const listItem = list.lastElementChild;

const isEqual = listItem.matches('.list-item#li-item123');

// contains
const heading = document.querySelector('h1');
const containsListItem = list.contains(listItem);
const containsHeading = list.contains(heading);

// properties
// EventTarget -> Node -> Comment, Text, Element -> HTMLElement -> HTMLHeadingElement (HTMLParagraphElement)
// nodeType
// console.log('[heading.nodeType]', heading.nodeType);

// nodeName
// console.log('[heading.nodeName]', heading.nodeName);

// tagName
// for (const element of form.elements) {
//     if (element.tagName === 'BUTTON') continue;

//     console.log('[element]', element);
// }

// innerHTML
// console.log('[list.innerHTML]', list.innerHTML);

// const text = 'Hello World';

// list.innerHTML += `
//     <li class="new-li-item">
//         <span>${text}</span>
//     </li>
// `;

// textContent
// console.log('[heading.textContent]', heading.textContent);

// heading.textContent = '<h2>Hello Wroclaw!</h2>';
// console.log('[list.textContent]', list.textContent);

// innerText
// heading.innerText = 'Something else...';
// console.log('[list.innerText]', list.innerText);

// value, href, name, type, placeholder etc
const input = document.querySelector('input[name="login"]'); // HTMLInputElement

// console.log('[input.value]', input.value);
// console.log('[input.placeholder]', input.placeholder);
// console.log('[input.name]', input.name);
// console.log('[input.type]', input.type);

const link = document.querySelector('#link'); // HTMLAnchorElement

// console.log('[link.href]', link.href);

// hidden
// setTimeout(() => {
//     link.hidden = false;
// }, 2000);

// attributes
const lastLink = document.querySelector('#last-link');

// getAttribute
// const href = lastLink.getAttribute('href');
// console.log('[href]', href);
// console.log('[lastLink.href]', lastLink.href);

// console.log('[lastLink.getAttribute("hello")]', lastLink.getAttribute("hello"));

// setAttribute
lastLink.setAttribute('target', '_blank');

// hasAttribute
const hasAttr = lastLink.hasAttribute('target');

// removeAttribute
lastLink.removeAttribute('target');

// attributes
// console.log('[lastLink.attributes]', lastLink.attributes);
// const world = listItem.getAttribute('data-hello');

// console.log('[listItem.dataset.hello]', listItem.dataset.hello);

// checked
const checkbox = document.querySelector('input[type="checkbox"]');

// setTimeout(() => {
//     checkbox.checked = true;
// }, 2000);

// creating elements
const paragraph = document.createElement('p');

paragraph.textContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero veritatis voluptate eveniet mollitia quas modi at porro laudantium, maiores ex omnis maxime soluta cupiditate consectetur sint hic rem labore, obcaecati, expedita doloremque? Natus ut culpa omnis rerum nesciunt, consequuntur tempore perferendis nulla? Sed corrupti, consequatur neque, consequuntur sunt iure obcaecati quia saepe numquam atque recusandae vitae voluptatum doloremque culpa odit sit possimus commodi, ad illo debitis ullam. Consequatur, repellendus fugit fuga tempore aperiam, a iste nobis facilis aliquid et suscipit consequuntur dignissimos? Ipsum quae, iure maxime ab at repudiandae eius harum unde molestiae eum assumenda totam aliquam, iste eveniet distinctio possimus vitae doloremque porro. Inventore deleniti amet accusamus commodi aspernatur quisquam! Numquam neque id incidunt. Expedita ducimus dolorem pariatur dignissimos. Voluptas fuga officiis rerum fugiat porro rem atque deserunt ipsum nesciunt possimus neque esse vitae, iure, sapiente obcaecati minima ex fugit cum nisi eaque. Aspernatur quidem sed recusandae eveniet similique.';

// inserting elements
// appendChild
// list.appendChild(paragraph);
// list.appendChild(paragraph);
// list.appendChild(paragraph);
// list.appendChild(paragraph);

// append
const nodes = ['Hello World', paragraph];

// list.append(...nodes);

// prepend
// list.prepend(...nodes);

// before
// list.before(...nodes);

// after
// list.after(...nodes);

// replaceWith
const h2 = document.createElement('h2');
h2.textContent = 'Hello World';

// heading.replaceWith(h2);

// remove
checkbox.remove();

// insertAdjacentHTML
const container = document.querySelector('#container');

const html = `
    <div class="wrapper">
        <p>Lorem Ipsum</p>
    </div>
`;

// container.insertAdjacentHTML('beforeend', html); // append

// cloneNode
const clonedParagraph = paragraph.cloneNode(true);

// fragment
const li1 = document.createElement('li');
const li2 = document.createElement('li');
const li3 = document.createElement('li');
// const wrapper = document.createElement('div');
// const fragment = document.createDocumentFragment();
const fragment = new DocumentFragment();

li1.textContent = 'List-item 1';
li2.textContent = 'List-item 2';
li3.textContent = 'List-item 3';

// list.append(li1, li2, li3);
fragment.appendChild(li1);
fragment.appendChild(li2);
fragment.appendChild(li3);

// list.append(fragment);

// list.appendChild(li1);
// list.appendChild(li2);
// list.appendChild(li3);

// const image = document.createElement('img');
// const image = new Image();
// image.src = '/images/picture.jpeg';

// styling
// className
heading.className = 'heading';

const searchClass = 'text-center';
// const classes = listItem.className.split(' ');

// const newClasses = classes.filter(c => c !== searchClass);
// listItem.className = newClasses.join(' ');

// const classIndex = classes.indexOf(searchClass); // text-center
// classes.splice(classIndex, 1);

// listItem.className = classes.join(' ');

// classList
// contains
const hasClass = listItem.classList.contains(searchClass);

// add
listItem.classList.add('hello-world');

// remove
listItem.classList.remove('hello-world');

// toggle
listItem.classList.toggle('green-color'); // remove
listItem.classList.toggle('green-color'); // add

// style
// listItem.style.color = '#888';
// listItem.style.backgroundColor = 'teal';
// listItem.style.borderRadius = '8px';
// listItem.style.padding = '6px 15px';

listItem.style.cssText = `
    color: #888;
    background-color: teal;
    border-radius: 8px;
    padding: 6px 15px;
`;

// getComputedStyle
const styles = getComputedStyle(heading);
