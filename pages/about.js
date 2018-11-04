/**
 * 引入公共文件开始
 */
import React, {
	Component
} from 'react';


import {
	Layout,
	Table,
	Card,
	Menu,
	notification
} from 'antd';
const {
	Header,
	Footer,
	Sider,
	Content
} = Layout;


import Head from 'next/head'; // 引入内置组件
import Link from 'next/link';



import NProgress from 'nprogress';

import {
	withRouter
} from 'next/router';

import withRedux from 'next-redux-wrapper';

import {
	connect
} from 'react-redux';

import {
	bindActionCreators
} from 'redux';


import initializeStore from '../store/initializeStore';
import * as actionCreators from './actions';

/**
 * 引入公共文件结束
 */

class About extends Component {
	static async getInitialProps({
		query,
		store,
		isServer
	}) {

		if (isServer == false) {
			NProgress.start();
		}
		let data = store.getState();

		let params = {
			limit: data.limit,
			offset: 1
		}
		await store.dispatch(actionCreators.getTablesNoData(params));

	}

	constructor(props) {
		super(props);
	}

	componentWillMount() {

		
	}

	componentDidMount() {

		// NProgress.done();

		if (document !== undefined) {
			NProgress.done();
		}

		notification['success']({
			message: 'SSR 秒开（无数据变化的）',
			description: '用户刷新无感知性能体验',
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

		this.props.getTablesNoData(params);
	}

	render() {

		var pagination = {
			current: this.props.about.offset,
			pageSize: this.props.about.limit,
			total: this.props.about.total
		}

		this.addKey(this.props.about.tableData, 'about' + new Date().getTime());

		return (
			<div>
				<Head>
	         		<title>不变化的数据</title>
	         		<meta name="viewport" content="initial-scale=1.0, width=device-width"/>
	      			<link rel="stylesheet" href="/static/antd.css" />
	      		</Head>
	      		<Layout>
	      			<Header style={{color:"white"}}>
						<div className="logo" >SSR+PWA DEMO</div>
				      <Menu
				        theme="dark"
				        mode="horizontal"
				        selectedKeys={['2']}
				        style={{ lineHeight: '64px' }}
				      >
				        <Menu.Item key="1"><Link href='/'><a>变化的数据</a></Link></Menu.Item>
				        <Menu.Item key="2">不变化的数据</Menu.Item>
				      </Menu>
					</Header>
					<Content>
						<div style={{ background: '#f2f2f2', padding: '30px' }}>
					    	<Card title="SSR刷新后用户无感知的性能体验、PWA其中被访问过后的页面断网后依然能访问(用chrome或firefox打开)" bordered={false}>
								<Table 
									columns={this.props.about.columns} 
									dataSource={this.props.about.tableData} 
									hoverable={true} 
									loading={this.props.about.loading} 
									pagination={pagination}
									onChange={this.handleTableChange.bind(this)}
								/>
	  						</Card>
	  					</div>
			        </Content>
	      		</Layout>
	        </div>
		)
	}
}

//将state.counter绑定到props的counter
const mapStateToProps = (state) => {
	return {
		about: state.About
	}
};

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
	//全量
	return bindActionCreators(actionCreators, dispatch);
};

About = connect(mapStateToProps, mapDispatchToProps)(About);

About = withRedux(initializeStore)(About);

export default withRouter(About);