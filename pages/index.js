import React from 'react';
import withRedux from 'next-redux-wrapper';
import 'isomorphic-unfetch';

import {
	connect
} from 'react-redux';

import {
	Flex,
	WhiteSpace,
	Menu,
	ActivityIndicator,
	NavBar,
	Drawer,
	List,
	Icon
} from 'antd-mobile';

import {
	bindActionCreators
} from 'redux';

// import 'antd-mobile/dist/antd-mobile.css';
import NProgress from 'nprogress';

import Head from 'next/head'; // 引入内置组件
import Link from 'next/link';
import {
	withRouter
} from 'next/router';

const cookieParser = require("cookie-parser");

import initializeStore from '../store/initializeStore';
import * as actionCreators from './actions';
//获取高度
// import Dimensions from 'dimensions';

// const {
// 	width,
// 	height
// } = Dimensions.get('window');

class Index extends React.Component {
	static async getInitialProps({
		query,
		store,
		isServer
	}) {

		if (isServer == false) {
			NProgress.start();

		}
		// console.log(11);


		// let data = store.getState();

		// let params = {
		// 	limit: data.limit,
		// 	offset: 1
		// }
		// await store.dispatch(actionCreators.getTables(params));

	}

	constructor(props) {
		super(props);

		this.state = {
			open: false,
			minHeight: "300px"
		}
	}


	componentWillMount() {



	}

	componentDidMount() {
		if (document != undefined) {
			NProgress.done();
		}

	}


	onOpenChange(e) {

		let isOpen = !this.state.open;

		document.documentElement.clientHeight;

		this.setState({
			open: isOpen,
			minHeight: document.documentElement.clientHeight
		});
	}

	addKey(data, str) {
		var arr = [];

		data.map((v, k) => {
			v.key = str + k;
			arr.push(v);
		});

		return arr;
	}

	handleTableChange(pagination, filters, sorter) {
		let params = {

			offset: pagination.current,
			limit: pagination.pageSize
		}

		this.props.getTables(params);
	}

	render() {


		const sidebar = (<List>
      {[0, 1, 2, 3, 4, 5, 3, 14, 15].map((i, index) => {
        if (index === 0) {
          return (<List.Item key={index}
            thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
            multipleLine
          >Category</List.Item>);
        }
        return (<List.Item key={index}
          thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
        >Category{index}</List.Item>);
      })}
    </List>);

		return (
			<div>
			    <Head>
					<title>m站demo</title>
					<meta name="viewport" content="initial-scale=1.0, width=device-width"/>
					<link rel="stylesheet" href="/static/antd-mobile.css" />
					<link rel="stylesheet" href="/static/index.css" />
				</Head>
				<div>
      				<NavBar icon={<Icon type="ellipsis" />} onLeftClick={this.onOpenChange.bind(this)}>Basic</NavBar>
					<Drawer
						className="my-drawer"
						style={{ minHeight: this.state.minHeight }}
						enableDragHandle={false}
						contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
						sidebar={sidebar}
						open={this.state.open}
						onOpenChange={this.onOpenChange.bind(this)}
					>
						Click upper-left corner
					</Drawer>
    			</div>
	          				
				
			</div>
		)
	}
}

//将state.counter绑定到props的counter
const mapStateToProps = (state) => {
	return {
		index: state.About
	}
};

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
	//全量
	return bindActionCreators(actionCreators, dispatch);
};

Index = connect(mapStateToProps, mapDispatchToProps)(Index);

Index = withRedux(initializeStore)(Index);

export default withRouter(Index);