# Dynamic Tab Title Chrome Extension

This Chrome extension dynamically updates the title of each tab based on the website's domain or a custom prefix set by the user. It enhances tab navigation and management by providing a clear, at-a-glance indication of the tab's content source or category.

**It is designed to work in combination with [Switcheroo](https://github.com/kvakulo/Switcheroo)  
https://github.com/kvakulo/Switcheroo**  

Switcheroo is a productivity tool that enhances the ability to switch between open applications and windows efficiently. Switcheroo allows for quick and easy navigation through open windows by typing parts of the window title, making it an essential tool for users who manage multiple tasks simultaneously.


## Features

- Automatically prefixes the tab title with the website's domain or a user-defined custom prefix.
- Compatible with single-page applications (SPAs)
- Supports single-page applications (SPAs) and dynamic content loading.
- Utilizes `localStorage` for storing and retrieving the user's custom prefix.


## Privacy

This extension `does not collect, store, or transmit any personal data or browsing history`. It operates entirely locally within your browser, ensuring your privacy and security.


## Installation

To install the extension, follow these steps:

1. Download or clone the extension repository to your local machine.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" at the top right corner.
4. Click "Load unpacked" and select the extension directory you have downloaded or cloned.
5. The extension is now installed and will automatically start working.


## Usage

### Viewing with Default or Domain Prefix
- Simply browse the internet as usual. The extension automatically prefixes the tab title with the domain name for easy identification.

### Setting a Custom Prefix
- Activate the custom prefix setting by pressing `Ctrl+Shift+Y`. This will prompt you to enter a custom prefix.
- Enter your desired prefix and press `Enter` to apply it across your tabs, replacing the domain name in the tab title with your custom prefix.

### Deleting the Custom Prefix
- To remove your custom prefix, press `Ctrl+Shift+Y` again and type `delete` when prompted.
- Press `Enter` to confirm. The extension will revert to using the domain name as the prefix for tab titles.

## Author
**Carlos Febres**

## Contributing

Contributions to improve the extension or add new features are welcome. Please follow the standard fork-branch-pull request workflow.

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Submit a pull request with a clear description of the changes.


## License

This extension is open-sourced software licensed under the MIT license. See the LICENSE file for more details.
