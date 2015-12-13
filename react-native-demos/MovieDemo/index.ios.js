/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 参考链接
 *http://wiki.jikexueyuan.com/project/react-native/tutorial.html
 *http://wiki.jikexueyuan.com/project/react-native/list-view.html 
 */
'use strict';//ECMAScript 5的语法，就是较为严格的JS语法

var React = require('react-native');//引入react-native模块
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;//分别把React的各个组件赋给分组的各个变量

var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var PAGE_SIZE = 25;
var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
var REQUEST_URL = API_URL + PARAMS;//请求的URL

var MovieDemo = React.createClass({
  // getInitialState 方法用于定义初始状态，也就是一个对象，这个对象可以通过 this.state 属性读取
  getInitialState: function() {
    alert("getInitialState")//first

    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,//!==为===(类型和值都相等)的非运算
      }),
      loaded: false,
    };
  },

//已插入真实 DOM
  componentDidMount: function() {
    alert("componentDidMount")//third

    this.fetchData();
  },
//react-native内置了第三方库https://github.com/github/fetch[The global fetch function is an easier way to make web requests and handle responses]
  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      });
  },

//ReactDOM.render 是 React 的最基本方法，用于将模板转为 HTML 语言，并插入指定的 DOM 节点。
  render: function() {
    alert("render")//second forth

    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
      />
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  },

  renderMovie: function(movie) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  },
});

//CSS样式
var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderWidth:1,
    borderColor:'red'
  },
  rightContainer: {
    flex: 1,
    backgroundColor: '#F5F3FF',

  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',

  },
});

AppRegistry.registerComponent('MovieDemo', () => MovieDemo);