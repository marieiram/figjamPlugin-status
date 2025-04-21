# FigJam Status Management Plugin

A plugin for FigJam that automatically detects specific keywords in section titles and visually represents the corresponding status through color coding and Sui-chan illustrations.

## Features

- **Automatic Status Detection**: Detects keywords (`fix`, `wip`, `ぼつ`, `見なくていい`) in section titles
- **Visual Feedback**:
  - Applies appropriate background colors based on status
  - Displays Sui-chan character illustrations
- **Real-time Updates**: Monitors changes to section titles and updates status immediately
- **Responsive Design**: Adjusts character size based on section dimensions

## Status Types

| Status | Keyword | Background Color | Meaning |
|--------|---------|-----------------|---------|
| Fix | `fix` | Green (#A6E9B3) | Confirmed |
| WIP | `wip` | Yellow (#FFDE82) | Work in Progress |
| Rejected | `ぼつ` | Red (#FFAFAF) | Not Adopted |
| Can be ignored | `見なくていい` | Gray (#E0E0E0) | Can Be Ignored |

## Usage

1. Install the plugin in Figma/FigJam
2. Create or edit a section in FigJam
3. Include one of the status keywords in the section title
4. The plugin will automatically apply the appropriate background color and display the Sui-chan character

## Development

### Prerequisites

- Node.js and npm
- Figma Desktop app for testing

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Build the plugin: `npm run build`
4. Load the plugin in Figma: Plugins > Development > Import plugin from manifest...

## License

This project is licensed under the MIT License - see the LICENSE file for details.