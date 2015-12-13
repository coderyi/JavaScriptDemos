'use strict';
var React = require('react-native');
var {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  NavigatorIOS
} = React;
var MyNewsList = require('./MyNewsList');
var NewsList = require('./NewsList');
var SettingView = require('./Setting');


var TabBarExample = React.createClass({
  statics: {
    title: '<TabBarIOS>',
    description: 'Tab-based navigation.'
  },
  getInitialState: function() {
    return {
      selectedTab: 'redTab',
      notifCount: 0,
      presses: 0,
    };
  },
  _renderContent: function(color: string, pageText: string) {
    return (
      <View style={[styles.tabContent, {backgroundColor: color}]}>
        <Text style={styles.tabText}>{pageText}</Text>
        <Text style={styles.tabText}>{this.state.presses} re-renders of the More tab</Text>
      </View>
    );
  },

  _renderContent1: function() {
    return (
      <MyNewsList >
        </MyNewsList>
    );
  },

   _renderContent2: function() {
    return (
      <SettingView >
        </SettingView>
    );
  },

  render: function() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="Blue Tab"
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
          }}>
          {this._renderContent1()}

        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="history"
          badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'redTab',
              notifCount: this.state.notifCount + 1,
            });
          }}>
<NavigatorIOS
                        style={{flex : 1, marginTop : 0}}
                        initialRoute={{
                            title: 'News List',
                            component: NewsList,
                        }} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="more"
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'greenTab',
              presses: this.state.presses + 1
            });
          }}>
          {this._renderContent('#21551C', 'Green Tab')}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="more"
          selected={this.state.selectedTab === 'grayTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'grayTab',
              presses: this.state.presses + 1
            });
          }}>
                    {this._renderContent2()}


        </TabBarIOS.Item>

      </TabBarIOS>
    );
  },
});
var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },

});
module.exports = TabBarExample;