import React, { Component } from 'react';
import Terminal from 'terminal-in-react';
// connect:
// just make work with this: https://github.com/trufflesuite/truffle-hdwallet-provider
// will hdwalletprovider work in a browser though...?
import HDWalletProvider from 'truffle-hdwallet-provider';
import EthJs from 'ethjs';

class InteractiveShell extends Component {
  showMsg = () => 'Hello World';

  // todo: move to client/api library injected into this component
  networkUrl() {
    return `https://testnet.cupel.io/${this.props.networkName}`;
  }

  componentDidMount() {
    var mnemonic = 'opinion destroy betray ...'; // 12 word mnemonic
    var provider = new HDWalletProvider(
      mnemonic,
      `${this.networkUrl()}?auth=${this.props.auth.getIdToken()}`
    );
    // prevent polling
    provider.engine.stop();
    window.eth = new EthJs(provider);
    /*eth.getBlockByNumber(0, true, (err, block) => {
      console.log(err, block)
    });*/
  }

  runCommand(cmd, print) {
    print(eval(cmd));
  }

  render() {
    console.log(this.props);
    return (
      <Terminal
        color="green"
        startState="maximised"
        allowTabs={false}
        backgroundColor="black"
        barColor="black"
        style={{ fontWeight: 'bold', fontSize: '1em' }}
        actionHandlers={{
          handleClose: this.props.handleShellClose,
          handleMaximise: toggleMaximise => {},
          handleMinimise: toggleMaximise => {}
        }}
        commandPassThrough={this.runCommand.bind(this)}
        commands={{
          'open-google': () => window.open('https://www.google.com/', '_blank'),
          showmsg: this.showMsg,
          popup: () => alert('Terminal in React')
        }}
        descriptions={{
          'open-google': 'opens google.com',
          showmsg: 'shows a message',
          alert: 'alert',
          popup: 'alert'
        }}
        msg={`Connected to ethereum network: ${this.networkUrl()}\n\nYou can also directly attach to this node using geth:\ngeth attach ${this.networkUrl()}?auth=[your auth token]`}
      />
    );
  }
}

export default InteractiveShell;
