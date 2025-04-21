/**
 * Status detection utility for FigJam Status Management Plugin
 */

// Define status keywords
export const STATUS_KEYWORDS = {
  FIX: "fix",
  WIP: "wip",
  REJECTED: "ぼつ",
  IGNORE: "見なくていい"
};

// Define status colors (RGB values for Figma API)
export const STATUS_COLORS = {
  FIX: { r: 166/255, g: 233/255, b: 179/255 },
  WIP: { r: 255/255, g: 222/255, b: 130/255 },
  REJECTED: { r: 255/255, g: 175/255, b: 175/255 },
  IGNORE: { r: 224/255, g: 224/255, b: 224/255 }
};

// Define hex colors for UI components
export const STATUS_HEX_COLORS = {
  FIX: "#A6E9B3",
  WIP: "#FFDE82",
  REJECTED: "#FFAFAF",
  IGNORE: "#E0E0E0"
};

/**
 * Detects status from a section title
 * @param sectionTitle - The title of the section to check
 * @returns The detected status or null if no status is detected
 */
export function detectStatus(sectionTitle: string): 'FIX' | 'WIP' | 'REJECTED' | 'IGNORE' | null {
  const title = sectionTitle.toLowerCase();
  
  if (title.includes(STATUS_KEYWORDS.FIX)) {
    return 'FIX';
  } else if (title.includes(STATUS_KEYWORDS.WIP)) {
    return 'WIP';
  } else if (title.includes(STATUS_KEYWORDS.REJECTED)) {
    return 'REJECTED';
  } else if (title.includes(STATUS_KEYWORDS.IGNORE)) {
    return 'IGNORE';
  }
  
  return null;
}

/**
 * Maps a status to its properties
 * @param status - The status to map
 * @returns An object containing the status properties
 */
export function getStatusProperties(status: 'FIX' | 'WIP' | 'REJECTED' | 'IGNORE' | null) {
  if (!status) return null;
  
  const statusMap = {
    FIX: {
      color: STATUS_HEX_COLORS.FIX,
      label: 'Confirmed',
      keyword: STATUS_KEYWORDS.FIX
    },
    WIP: {
      color: STATUS_HEX_COLORS.WIP,
      label: 'Work in Progress',
      keyword: STATUS_KEYWORDS.WIP
    },
    REJECTED: {
      color: STATUS_HEX_COLORS.REJECTED,
      label: 'Not Adopted',
      keyword: STATUS_KEYWORDS.REJECTED
    },
    IGNORE: {
      color: STATUS_HEX_COLORS.IGNORE,
      label: 'Can Be Ignored',
      keyword: STATUS_KEYWORDS.IGNORE
    }
  };
  
  return statusMap[status];
}