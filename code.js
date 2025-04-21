// 既存のキーワードに新しいキーワードを追加
const STATUS_KEYWORDS = {
  FIX: ["fix", "確定"], // 新しいキーワード "done" を追加
  WIP: ["wip", "作業中", "progress"], // 新しいキーワード "progress" を追加
  REJECTED: ["ぼつ", "ボツ", "やめました"], // 新しいキーワード "discarded" を追加
  IGNORE: ["見なくていい", "ignore", "アーカイブ"] // 新しいキーワード "skip" を追加
};

const STATUS_COLORS = {
  FIX: { r: 166/255, g: 233/255, b: 179/255 },
  WIP: { r: 255/255, g: 222/255, b: 130/255 },
  REJECTED: { r: 255/255, g: 175/255, b: 175/255 },
  IGNORE: { r: 224/255, g: 224/255, b: 224/255 },
  DEFAULT: { r: 248/255, g: 248/255, b: 248/255 }
};

// Main function to run the plugin
figma.showUI(__html__, { visible: true});

// Initialize the plugin
function initializePlugin() {
  // Check all sections when the plugin starts
  checkAllSections();
  
  // Listen for document changes
  figma.on('documentchange', handleDocumentChange);
}

// Function to check all sections in the document
async function checkAllSections() {
  const nodes = figma.currentPage.findAll(node => node.type === 'SECTION');
  
  for (const node of nodes) {
    await processSection(node);
  }
}

// Handle document changes
function handleDocumentChange(event) {
  const nodeChanges = event.documentChanges.filter(change => 
    change.type === 'PROPERTY_CHANGE' && 
    change.node.type === 'SECTION' && 
    change.properties.some(prop => prop.property === 'name')
  );
  
  for (const change of nodeChanges) {
    processSection(change.node);
  }
  
  // Also handle newly created sections
  const nodeCreations = event.documentChanges.filter(change => 
    change.type === 'CREATE' && 
    change.node.type === 'SECTION'
  );
  
  for (const change of nodeCreations) {
    processSection(change.node);
  }
}

// Process a section to detect status and apply visual feedback
async function processSection(section) {
  if (!section || section.type !== 'SECTION') return;
  
  const sectionName = section.name.toLowerCase();
  const status = detectStatus(sectionName);
  
  // Remove any existing status indicators
  removeExistingStatusIndicators(section);
  
  // Apply status if one was detected
  if (status) {
    await applyStatus(section, status);
  }else {
    await applyStatus(section, 'DEFAULT'); // デフォルトのステータスを適用
  }
}

// detectStatus関数を修正して複数のキーワードを検出
function detectStatus(sectionName) {
  const lowerCaseName = sectionName.toLowerCase();

  for (const [status, keywords] of Object.entries(STATUS_KEYWORDS)) {
    if (keywords.some(keyword => lowerCaseName.includes(keyword))) {
      return status;
    }
  }

  return null;
}

// Remove existing status indicators
function removeExistingStatusIndicators(section) {
  const children = section.children;
  for (let i = children.length - 1; i >= 0; i--) {
    const child = children[i];
    if (child.name === 'status-indicator' || child.name === 'sui-chan-character') {
      child.remove();
    }
  }
  
  // Reset the section background color
  section.fillStyleId = '';
  section.fills = [];
}

// Apply the status to a section
async function applyStatus(section, status) {
  // Apply background color
  applyBackgroundColor(section, status);
  
  // Add character
  await addSuiChanCharacter(section, status);
}

// Apply the appropriate background color
function applyBackgroundColor(section, status) {
  const color = STATUS_COLORS[status] || STATUS_COLORS.DEFAULT; // 該当しない場合はDEFAULTを使用
  if (!color) return;

  section.fills = [{
    type: 'SOLID',
    color: color,
  }];
}


// Add the Sui-chan character in the appropriate state
async function addSuiChanCharacter(section, status) {
  // Determine which character to use based on status
  const characterData = await getSuiChanSvgData(status);
  
  if (!characterData) return;
  
  // Calculate position (bottom-right corner)
  const sectionWidth = section.width;
  const sectionHeight = section.height;
  
  // Make character size approximately 20% of the section size
  const charSize = Math.min(sectionWidth, sectionHeight) * 0.2;
  
  // Create node for character
  const characterNode = figma.createNodeFromSvg(characterData);
  characterNode.name = 'sui-chan-character';
  
  // Resize character
  const scale = charSize / Math.max(characterNode.width, characterNode.height);
  characterNode.resize(characterNode.width * scale, characterNode.height * scale);
  
  // Position in bottom-right corner with a small margin
  const margin = 8;
  characterNode.x = section.x + sectionWidth - characterNode.width - margin;
  characterNode.y = section.y + sectionHeight - characterNode.height - margin;
  
  // Add to section
  section.appendChild(characterNode);
}

// Get the SVG data for Sui-chan in the appropriate state
async function getSuiChanSvgData(status) {
  // Placeholder SVG data for characters
  // In a real implementation, these would be actual SVG data for the character in different states
  const svgData = {
    FIX: '<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="#A6E9B3"/><path d="M30 50 L45 65 L70 40" stroke="white" stroke-width="8" fill="none"/></svg>',
    WIP: '<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="#FFDE82"/><path d="M40 60 L60 40 M40 40 L60 60" stroke="white" stroke-width="8" fill="none"/></svg>',
    REJECTED: '<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="#FFAFAF"/><path d="M35 35 L65 65 M35 65 L65 35" stroke="white" stroke-width="8" fill="none"/></svg>',
    IGNORE: '<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="#E0E0E0"/><path d="M30 50 L70 50" stroke="white" stroke-width="8" fill="none"/></svg>'
  };
  
  return svgData[status] || null;
}

// Initialize the plugin
initializePlugin();

// Let the plugin continue to run
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'cancel') {
    figma.closePlugin();
  } else if (msg.type === 'check-sections') {
    await checkAllSections(); // ボタンが押されたときに実行
  }
};
