import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { BallIndicator } from 'react-native-indicators';
import TextInputBox from './TextInputBox';
import config from '../common/config';
import baseUrl from '../common/baseUrl';
import { parseIdFromObjectArray } from '../utils/parseIdFromObjectArray';

export default class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            lastComments: [],
            parent: this.props.navigator.state.props.parent,
            post: this.props.navigator.state.props.post,
            creator: this.props.navigator.state.props.creator,
            refreshing: false,
            loadidng: false,
            loadingMore: false,
            hasMore: true
        }
    }

    componentDidMount() {
        this.setState({
            loading: true
        }, () => {
            this.fetchComment();
        });
    }

    fetchComment = () => {
        const url = `${baseUrl.api}/post/comment`;
        console.log(`feching data from ${url}`);
        fetch(url, {

            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lastComments: this.state.lastComments,
                postId: this.state.post,
                creatorId: this.state.creator,
                limit: config.commentReturnLimit
            })
        })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    // data only appended when loading more, else refresh data
                    comment: this.state.loadingMore === true ? [...this.state.comments, ...res.data] : res.data,
                    lastComments: this.state.loadingMore === true ? [...this.state.lastComments, ...parseIdFromObjectArray(res.data)] : parseIdFromObjectArray(res.data),
                    error: res.status === 200 ? null : res.msg,
                    hasMore: res.data.length < config.commentReturnLimit ? false : true,
                    loading: false,
                    refreshing: false,
                    loadingMore: false,
                });
            })
            .catch(error => {
                this.setState({ error: "Network request failed", loading: false, refreshing: false, loadingMore: false });
            });
    };

    handleRefresh = () => {
        if (!this.state.refreshing && !this.state.loadingMore && !this.state.loading) {
            this.setState({
                refreshing: true,
                lastComments: []
            }, () => {
                console.log("refreshing");
                this.fetchComment();
            })
        }
    };

    handleLoadMore = () => {
        if (this.state.hasMore && !this.state.refreshing && !this.state.loadingMore && !this.state.loading) {
            this.setState(
                {
                    loadingMore: true
                },
                () => {
                    console.log("loading more");
                    this.fetchComment();
                }
            );
        }
    };

    renderFooter = () => {
        return (
            <View style={styles.listFooter}>
                {this.state.hasMore ? <BallIndicator size={20} /> : <Text style={{ color: 'grey' }}>No more posts</Text>}
            </View>
        );
    };


    render() {
        const { navigator } = this.props;
        return (
            <View style={styles.container}>
                {/* <View style={{ marginTop: 0, width: window.width, height: "100%", backgroundColor: 'lightgrey' }}>
                    <FlatList
                        data={this.state.comments}
                        renderItem={({ item }) => (
                            <View>This is comment</View>
                            // <CommentList dataSource={item} navigation={this.props.navigation} />
                        )}
                        keyExtractor={item => item._id}
                        onRefresh={this.handleRefresh}
                        refreshing={this.state.refreshing}
                        ListFooterComponent={this.renderFooter}
                        onEndReached={this.handleLoadMore}
                        onEndReachedThreshold={0.1}
                    />
                </View> */}
                <View style={{ height: 20, marginTop: 0 }}>
                    <Text onPress={() => {
                        navigator.goTo("CommentDetail");
                    }}>more comment</Text>
                </View>
                <TextInputBox />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    }
});

