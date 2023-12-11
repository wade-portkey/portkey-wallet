module.exports = function () {
  return {
    visitor: {
      ImportDeclaration(path) {
        if (path.node.source.value.endsWith('.json')) {
          path.replaceWithSourceString(
            `const ${path.node.specifiers[0].local.name} = require('${path.node.source.value}')`,
          );
        }
      },
    },
  };
};
