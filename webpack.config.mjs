import path from "path";
import { fileURLToPath } from 'url';
import { buildWebpackConfig } from './config/build/buildWebpackConfig.js';

// Получаем текущий файл пути в формате ESM
const __filename = fileURLToPath(import.meta.url);
// Получаем директорию текущего файла в формате ESM
const __dirname = path.dirname(__filename);

function getApiUrl(mode, apiUrl) {
    if (apiUrl) {
        return apiUrl;
    }
    if (mode === 'production') {
        return '/api';
    }

    return 'http://localhost:8000';
}
// Переменные webpack.config

export default(env)=>{
    const mode = env?.mode || 'development';
    const PORT = env?.port || 3000;
    const apiUrl = getApiUrl(mode, env?.apiUrl);

    const isDev = mode === 'development';

    const configVar = {
        mode: mode,
        entryPath : path.resolve(__dirname, 'src', 'index.jsx'),
        buildPath : path.resolve(__dirname, 'build'),
        htmlPath : path.resolve(__dirname, 'public', 'index.html'),
        pathSrc: path.resolve(__dirname, 'src'),
        port: PORT,
        isDev: isDev,
        apiUrl: apiUrl,
        project: 'frontend'
    }
    return buildWebpackConfig(configVar);
}

