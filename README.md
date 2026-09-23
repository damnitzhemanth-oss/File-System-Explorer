# File System Explorer

A simple VS Code extension that adds two commands to the Command Palette:

1.  **File Structure**: Generates a tree view of your workspace files.
2.  **Entire File System**: Displays the content of all files in your workspace, respecting `.gitignore` and excluding `node_modules`.

## Features

-   **File Structure**: Quickly view the directory layout of your project.
-   **Entire File System**: Get a single document with the contents of every non-ignored file, perfect for code reviews or context gathering.
-   **.gitignore Support**: Automatically skips files and folders listed in your `.gitignore` file.
-   **Node Modules Exclusion**: `node_modules` is always excluded to keep the output clean.

## Usage

1.  Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac) to open the Command Palette.
2.  Type `File Structure` or `Entire File System` to run the respective command.

The output will open in a new editor tab.

## Requirements

-   VS Code version 1.74.0 or higher.

## Extension Settings

This extension does not add any settings yet.

## Known Issues

-   Very large projects may take a moment to process.

## Release Notes

### 0.0.1

Initial release of File System Explorer.