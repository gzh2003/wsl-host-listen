import { existsSync, unlinkSync } from 'node:fs';

const cleanupFiles = (files) => {
  for (const file of files) {
    try {
      if (existsSync(file)) unlinkSync(file);
    } catch (error) {
      console.warn(`Unable to delete ${file}: ${error.message}`);
    }
  }
};

export default cleanupFiles;
