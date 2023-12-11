// eslint-disable-next-line @typescript-eslint/no-var-requires
const { existsSync, writeFileSync } = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { resolve } = require('path');

// 获取 native-dependencies.js 文件的路径
const nativeDependenciesPath = resolve(__dirname, '../native-dependencies.js');

// 获取 react-native.config.js 文件的路径
const configPath = resolve(process.cwd(), 'react-native.config.js');

// 导入 native-dependencies.js 文件
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nativeDependencies = require(nativeDependenciesPath);
console.log('process.cwd()', process.cwd());
// 检查 react-native.config.js 文件是否存在
if (!existsSync(configPath)) {
  console.log('react-native.config.js 不存在');
  // 如果文件不存在，创建一个新的文件，并将 native-dependencies.js 中的 dependencies 写入到新文件中
  writeFileSync(configPath, `module.exports = ${JSON.stringify(nativeDependencies, null, 2)};`);
} else {
  console.log('react-native.config.js 存在');
  // 如果文件存在，读取文件内容，并将 native-dependencies.js 中的 dependencies 合并到文件内容中
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const config = require(configPath);

  // 遍历 nativeDependencies.dependencies，将不存在于 config.dependencies 中的依赖添加到 config.dependencies 中
  for (const [key, value] of Object.entries(nativeDependencies.dependencies)) {
    // eslint-disable-next-line no-prototype-builtins
    if (!config.dependencies.hasOwnProperty(key)) {
      config.dependencies[key] = value;
    }
  }

  // 保存 react-native.config.js 文件
  writeFileSync(configPath, `module.exports = ${JSON.stringify(config, null, 2)};`);
}
