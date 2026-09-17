import LZString from 'lz-string';
import { DEFAULT_SURPRISE_DATA } from './defaultData';

const LOCAL_STORAGE_KEY = '3d_birthday_surprise_data_v1';

/**
 * Saves surprise configuration to localStorage.
 */
export function saveLocalSurpriseData(data) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
    return false;
  }
}

/**
 * Loads surprise configuration from localStorage or returns default.
 */
export function loadLocalSurpriseData() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_SURPRISE_DATA, ...parsed };
    }
  } catch (err) {
    console.error('Failed to load from localStorage:', err);
  }
  return DEFAULT_SURPRISE_DATA;
}

/**
 * Encodes full surprise data into a shareable URL Hash string.
 */
export function encodeSurpriseToUrlHash(data) {
  try {
    const jsonStr = JSON.stringify(data);
    const compressed = LZString.compressToEncodedURIComponent(jsonStr);
    const origin = window.location.origin + window.location.pathname;
    return `${origin}#surprise=${compressed}`;
  } catch (err) {
    console.error('Encoding share link failed:', err);
    return window.location.href;
  }
}

/**
 * Decodes surprise data from current window location hash or URL parameter.
 */
export function decodeSurpriseFromUrlHash() {
  try {
    const hash = window.location.hash;
    if (hash && hash.includes('surprise=')) {
      const compressed = hash.split('surprise=')[1];
      if (compressed) {
        const jsonStr = LZString.decompressFromEncodedURIComponent(compressed);
        if (jsonStr) {
          const parsed = JSON.parse(jsonStr);
          return { ...DEFAULT_SURPRISE_DATA, ...parsed };
        }
      }
    }

    // Also check query param fallback ?surprise=
    const searchParams = new URLSearchParams(window.location.search);
    const queryCompressed = searchParams.get('surprise');
    if (queryCompressed) {
      const jsonStr = LZString.decompressFromEncodedURIComponent(queryCompressed);
      if (jsonStr) {
        return { ...DEFAULT_SURPRISE_DATA, ...JSON.parse(jsonStr) };
      }
    }
  } catch (err) {
    console.error('Failed to decode URL hash:', err);
  }
  return null;
}

/**
 * Triggers JSON download of surprise payload.
 */
export function exportSurpriseToJson(data) {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${(data.recipient.name || 'birthday').toLowerCase()}_3d_surprise.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Reads an uploaded JSON file.
 */
export function importSurpriseFromJsonFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        resolve({ ...DEFAULT_SURPRISE_DATA, ...parsed });
      } catch (err) {
        reject(new Error('Invalid JSON file format.'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsText(file);
  });
}
