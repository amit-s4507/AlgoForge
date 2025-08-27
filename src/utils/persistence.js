export const persistence = {
  load(key, fallback) {
    try { 
      const raw = localStorage.getItem(key); 
      return raw ? JSON.parse(raw) : fallback; 
    } catch (error) { 
      console.warn(`Failed to load ${key} from localStorage:`, error);
      return fallback; 
    }
  },
  save(key, value) { 
    try {
      localStorage.setItem(key, JSON.stringify(value)); 
    } catch (error) {
      console.error(`Failed to save ${key} to localStorage:`, error);
    }
  },
};
