# jquery.fixed-header.js

> jQuery script to add fixed header functionality

*Requires [Node.js](https://nodejs.org) 4+

## Usage

Include the script in your page.

```html
<script src="node_modules/jquery.fixed-header/jquery.fixed-header.js"></script>
```

Now you can activate the script by simply add the call to your header.

```javascript
$('.header').fixed();
```

### Options

There are also some options that can be set. Simply add an object to the function call.

```javascript
$('.header').fixed({
  toAnchor: 'scroll',
  onLoadAnchor: 'jump',
  onChangeAnchor: 'jump',
  offset: 50,
  class: 'header--fixed',
  objects: {}
});
```

<table>
  <th>
    <td>type</td>
    <td>default</td>
    <td>possible</td>
    <td>description</td>
  </th>
  <tr>
    <td>toAnchor</td>
    <td>string</td>
    <td>scroll</td>
    <td>scroll, jump, ''</td>
    <td>Define action on anchor click. For example `scroll` scrolls to the new anchor position with the fixed header.</td>
  </tr>
  <tr>
    <td>onLoadAnchor</td>
    <td>string</td>
    <td>jump</td>
    <td>scroll, jump, ''</td>
    <td>Define action on page load with anchor in url. For example `jump` jumps immediately to the anchor.</td>
  </tr>
  <tr>
    <td>onChangeAnchor</td>
    <td>string</td>
    <td>jump</td>
    <td>scroll, jump, ''</td>
    <td>Define action url change with anchor. For example `jump` jumps immediately to the anchor.</td>
  </tr>
  <tr>
    <td>offset</td>
    <td>number</td>
    <td>50</td>
    <td>Any number from zero</td>
    <td>Set the offset from when the fixed header should be triggert.</td>
  </tr>
  <tr>
    <td>class</td>
    <td>string</td>
    <td>header--fixed</td>
    <td>All strings with css convention</td>
    <td>Set the offset from when the fixed header should be triggert.</td>
  </tr>
  <tr>
    <td>objects</td>
    <td>objects</td>
    <td>{}</td>
    <td></td>
    <td>
      Add additional elements to set classes if header is fixed<br>
      Example:
      ```javascript
        objects: [
            {
              object: $('.logo'),
              class: 'logo--fixed'
            }
        ]
      ```
    </td>
  </tr>
</table>



