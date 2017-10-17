const React = require('react');
const Head = require('next/head').default;

let attachedStyles = {}, update;

class Stylesheet extends React.Component {
  constructor() {
    super();
    
    this.state = {
      attached: attachedStyles
    };  
  }
  
  componentWillMount() {
    update = (attached) => {
      this.setState({ attached });
    }
    
    update(attachedStyles);
  }
  
  componentWillUnmount() {
    update = null;
  }
  
  getStylesheet() {
    if (Object.keys(this.state.attached).length) {
      let ss = ``;
      let filename;
      
      for (filename in this.state.attached) {
        if (typeof filename !== `undefined`) {
          ss += `\n${this.state.attached[filename]}\n`
        }
      }
      
      return ss;
    }
  }
  
  render() {
    return React.createElement(Head, {},
      React.createElement('style', {
        dangerouslySetInnerHTML: {
          __html: this.getStylesheet(),
        },
      }),
    );
  }
}

module.exports = Stylesheet;

module.exports.addStyles = (filename, content) => {
  attachedStyles[filename] = content;
  
  if (typeof update === `function`) {
    update(attachedStyles);
  }
}

module.exports.flush = () => {
  attachedStyles = {};
  
  if (typeof update === `function`) {
    update(attachedStyles);
  }
}