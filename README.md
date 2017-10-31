# next-css-loader

Enables the use of css modules in a next.js app, similar to the usage of `style-loader?singleton`.

This package has two exports: the `next-css-loader` webpack loader (intended to be used with `postcss-loader` and `postcss-modules`), and a `<Stylesheet />` component which will add an inline style tag to Next's `<Head>`.

In an existing next.js app, add the loader (and postcss dependencies):
```
npm install --save-dev next-css-loader postcss-loader postcss-modules
```

In next.config.js, add the loader rules:
```
module.exports = {
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.css$/,
        use: [
          {
            loader: 'emit-file-loader',
            options: {
              name: 'dist/[path][name].[ext]'
            }
          },
          'next-css-loader',
          'postcss-loader'
        ]
      }
    );
    
    return config;
  }
};
```

In postcss.config.js, add configuration for postcss and postcss-modules:
```
module.exports = {
  plugins: [
    require('postcss-modules')()
  ]
}

```

In your app container or page layout component, add the stylesheet component (only needs to be rendered once):

```
impot React from 'react';
import Stylesheet from 'next-css-loader/stylesheet';

export default class App extends React.Component {
  render() {
    <div>
      <Stylesheet />
      {this.props.children}
    </div>
  }
}
```