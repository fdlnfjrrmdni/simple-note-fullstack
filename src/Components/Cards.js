import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { getCategories } from '../Publics/redux/actions/categories';
import { connect } from 'react-redux';

class Cards extends Component {
    componentDidMount = () => {
        this.getData()
    }

    getColor = () => {
        this.state = {
            color: this.props.category == 'Works' ? '#2FC2DF' : 
                this.props.category == 'Books' ? '#FAD06C' : 
                this.props.category == 'Movies' ? '#C0EC68' :
                this.props.category == 'Links' ? '#C592FF' :
                this.props.category == 'To-do' ? '#FF92A9' : '#B4B5B4',
        };
    }

    getData = () => {
        this.props.dispatch(getCategories());
    }

    constructor(props) {
        super(props);
        this.Categories = this.props.categories.data;
        this.getColor();
    }

    dateFormat = (d) => {
        let date = new Date(d);

        if (isNaN(date.getTime())) {
            return d;
        }
        else{
            let month = new Array();
            month[0] = "Jan";
            month[1] = "Feb";
            month[2] = "Mar";
            month[3] = "Apr";
            month[4] = "May";
            month[5] = "Jun";
            month[6] = "Jul";
            month[7] = "Aug";
            month[8] = "Sept";
            month[9] = "Oct";
            month[10] = "Nov";
            month[11] = "Dec";

            day = date.getDate();
            
            if(day < 10){
                day = "0"+day;
            }
            
            return day+" "+month[date.getMonth()];
        }
    }

    render() {
        this.getColor();
        return(
            <View style={{ marginRight: 30 }}>
                <TouchableOpacity style={[styles.card, { backgroundColor: this.state.color }]} onPress={this.props.press} onLongPress={this.props.longPress}>
                    <Text style={styles.cardDate}>{this.dateFormat(this.props.date)}</Text>
                    <Text numberOfLines={1} style={styles.cardTitle}>{this.props.title}</Text>
                    <Text numberOfLines={1} style={styles.cardCategory}>{this.props.category}</Text>
                    <Text numberOfLines={4} style={styles.cardContent}>{this.props.content}</Text>
                </TouchableOpacity>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    card: {
        width: 138,
        height: 138,
        borderRadius: 7,
        elevation: 5,
        padding: 12,
        marginBottom: 27
    },
    cardDate: {
        color: '#fff',
        textAlign: 'right',
        fontSize: 12,
        fontWeight: '800',
        marginBottom: 5
    },
    cardCategory: {
        color: '#fff',
        fontSize: 13
    },
    cardTitle: {
        color: '#fff',
        fontWeight: '900',
        fontSize: 18
    },
    cardContent: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '500'
    }
});

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}

export default connect(mapStateToProps)(Cards)