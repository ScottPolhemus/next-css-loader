# next-css-loader

Enables the use of css modules in a next.js app, similar to the usage of `style-loader?singleton`.

This package has two exports: a webpack loader (intended to be used with `postcss-loader` and `postcss-modules`), and a stylesheet component which adds an inline style tag to Next's `<Head>`.

In next.config.js:
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

In postcss.config.js:
```
module.exports = {
  plugins: [
    require('postcss-modules')()
  ]
}

```

In your app component or page layout, add the style tag (only needs to be rendered once per page):

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